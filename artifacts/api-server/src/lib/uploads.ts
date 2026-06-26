import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { Request, RequestHandler, Response } from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import { db, devenirClientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf"]);

function resolveUploadDir() {
  if (process.env.UPLOAD_DIR) {
    return path.resolve(process.env.UPLOAD_DIR);
  }

  const workspaceCandidate = path.resolve(process.cwd(), "artifacts/bnm-site/public/assets/uploads");
  if (fs.existsSync(path.resolve(process.cwd(), "artifacts/bnm-site"))) {
    return workspaceCandidate;
  }

  return path.resolve(process.cwd(), "../bnm-site/public/assets/uploads");
}

function toPublicUrl(filePath: string) {
  const uploadDir = resolveUploadDir();
  const relative = path.relative(uploadDir, filePath).replaceAll(path.sep, "/");
  const baseUrl = process.env.PUBLIC_UPLOAD_BASE_URL ?? "/assets/uploads/";
  return `${baseUrl.replace(/\/$/, "")}/${relative}`;
}

function safeFileName(originalName: string) {
  const ext = path.extname(originalName).toLowerCase();
  if (!allowedExtensions.has(ext)) {
    throw new Error("Type de fichier non autorisé");
  }

  const stem = path.basename(originalName, ext)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${crypto.randomBytes(8).toString("hex")}-${stem || "file"}${ext}`;
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadDir = resolveUploadDir();
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      try {
        cb(null, safeFileName(file.originalname));
      } catch (err) {
        cb(err as Error, "");
      }
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error("Type de fichier non autorisé"));
      return;
    }

    cb(null, true);
  },
});

export function handleUploadError(err: unknown, res: Response) {
  const message = err instanceof Error ? err.message : "Erreur lors de l'upload";
  if (message === "Unexpected end of form") {
    return res.status(400).json({ error: "Formulaire incomplet" });
  }

  if (message.includes("File too large")) {
    return res.status(400).json({ error: "Le fichier dépasse 5 Mo" });
  }

  return res.status(400).json({ error: message });
}

export async function uploadFile(req: Request, res: Response) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      handleUploadError(err, res);
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "Fichier requis" });
      return;
    }

    res.json({ url: toPublicUrl(file.path) });
  });
}

export async function sendOnboardingEmail(row: {
  id: number;
  nomComplet: string;
  cinPasseport: string;
  telephone: string;
  adresse: string;
  secteurActivite: string;
  cinPasseportPath: string;
  justificatifPath: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    logger.warn({ rowId: row.id }, "SMTP non configuré, email devenir-client non envoyé");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const to = process.env.ONBOARDING_EMAIL ?? "abdellahi.heiballa@gmail.com";
  const from = process.env.SMTP_FROM ?? smtpUser;

  await transporter.sendMail({
    from,
    to,
    subject: `Nouvelle demande devenir client - ${row.nomComplet}`,
    text: [
      `Nom complet : ${row.nomComplet}`,
      `CIN/Passeport : ${row.cinPasseport}`,
      `Téléphone : ${row.telephone}`,
      `Adresse : ${row.adresse}`,
      `Secteur d'activité : ${row.secteurActivite}`,
      "",
      "Pièces jointes :",
      `- CIN/Passeport : ${row.cinPasseportPath}`,
      `- Justificatif de domicile : ${row.justificatifPath}`,
    ].join("\n"),
    attachments: [
      {
        filename: path.basename(row.cinPasseportPath),
        path: row.cinPasseportPath,
      },
      {
        filename: path.basename(row.justificatifPath),
        path: row.justificatifPath,
      },
    ],
  });

  return true;
}

export const submitDevenirClient: RequestHandler = async (req, res) => {
  upload.fields([
    { name: "cinPasseportFile", maxCount: 1 },
    { name: "justificatifFile", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      handleUploadError(err, res);
      return;
    }

    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    const cinFile = files?.cinPasseportFile?.[0];
    const justificatifFile = files?.justificatifFile?.[0];

    if (!cinFile || !justificatifFile) {
      res.status(400).json({ error: "Les deux pièces justificatives sont requises" });
      return;
    }

    const { nomComplet, cinPasseport, telephone, adresse, secteurActivite } = req.body;
    if (!nomComplet || !cinPasseport || !telephone || !adresse || !secteurActivite) {
      res.status(400).json({ error: "Tous les champs sont requis" });
      return;
    }

    try {
      const [row] = await db.insert(devenirClientsTable).values({
        nomComplet: String(nomComplet),
        cinPasseport: String(cinPasseport),
        telephone: String(telephone),
        adresse: String(adresse),
        secteurActivite: String(secteurActivite),
        cinPasseportPath: toPublicUrl(cinFile.path),
        justificatifPath: toPublicUrl(justificatifFile.path),
      }).returning();

      if (!row) {
        res.status(500).json({ error: "Erreur lors de l'enregistrement" });
        return;
      }

      const emailEnvoye = await sendOnboardingEmail({
        ...row,
        cinPasseportPath: cinFile.path,
        justificatifPath: justificatifFile.path,
      });
      if (emailEnvoye) {
        await db.update(devenirClientsTable).set({ emailEnvoye: true }).where(eq(devenirClientsTable.id, row.id));
      }

      res.status(201).json({
        success: true,
        message: "Votre demande a été envoyée avec succès.",
      });
    } catch (error) {
      logger.error({ err: error }, "Erreur devenir-client");
      res.status(500).json({ error: "Erreur interne" });
    }
  });
};
