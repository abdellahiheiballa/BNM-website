import { Router } from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { db, adminsTable, actualitesTable, offresTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin, seedDefaultAdmin } from "../lib/admin-auth";
import { CreateActualiteBody, AdminCreateOffreBody, AdminUpdateOffreBody } from "@workspace/api-zod";
import { uploadFile } from "../lib/uploads";

const SESSION_COOKIE_NAME = "admin_session";

seedDefaultAdmin().catch((err) => {
  console.error("[admin] Failed to seed admin:", err);
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const [admin] = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.username, username));

  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";

  res.cookie(SESSION_COOKIE_NAME, String(admin.id), {
    httpOnly: true,
    secure: isSecure,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ success: true, message: "Logged in" });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME);
  return res.json({ success: true, message: "Logged out" });
});

router.use(requireAdmin());

router.post("/upload", uploadFile);

router.get("/actualites/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const [row] = await db.select().from(actualitesTable).where(eq(actualitesTable.id, id));
  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(row);
});

router.get("/actualites", async (_req, res) => {
  const rows = await db.select().from(actualitesTable);
  return res.json(rows);
});

router.post("/actualites", async (req, res) => {
  const parsed = CreateActualiteBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const body = parsed.data;
  try {
    await db.insert(actualitesTable).values({
      titre: body.titre,
      titre_fr: body.titre_fr ?? null,
      titre_ar: body.titre_ar ?? null,
      titre_en: body.titre_en ?? null,
      slug: body.slug,
      contenu: body.contenu,
      contenu_fr: body.contenu_fr ?? null,
      contenu_ar: body.contenu_ar ?? null,
      contenu_en: body.contenu_en ?? null,
      image: body.image ?? null,
      categorie: body.categorie ?? null,
      datePublication: body.datePublication instanceof Date ? body.datePublication : new Date(body.datePublication ?? new Date()),
    });
    return res.status(201).json({ success: true, message: "Actualité créée" });
  } catch (err: any) {
    if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

router.put("/actualites/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const { titre, titre_fr, titre_ar, titre_en, slug, contenu, contenu_fr, contenu_ar, contenu_en, image, categorie, datePublication } = req.body;

  const updateFields: Record<string, unknown> = {
    titre,
    slug,
    contenu,
    image,
    categorie,
  };
  if (titre_fr !== undefined) updateFields.titre_fr = titre_fr;
  if (titre_ar !== undefined) updateFields.titre_ar = titre_ar;
  if (titre_en !== undefined) updateFields.titre_en = titre_en;
  if (contenu_fr !== undefined) updateFields.contenu_fr = contenu_fr;
  if (contenu_ar !== undefined) updateFields.contenu_ar = contenu_ar;
  if (contenu_en !== undefined) updateFields.contenu_en = contenu_en;
  if (datePublication) updateFields.datePublication = new Date(datePublication);

  try {
    await db
      .update(actualitesTable)
      .set(updateFields)
      .where(eq(actualitesTable.id, id));
    return res.json({ success: true, message: "Actualité mise à jour" });
  } catch (err: any) {
    if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

router.delete("/actualites/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  await db.delete(actualitesTable).where(eq(actualitesTable.id, id));
  return res.json({ success: true, message: "Actualité supprimée" });
});

function mapOffre(r: typeof offresTable.$inferSelect) {
  return {
    id: r.id,
    titre: r.titre,
    titre_fr: r.titre_fr ?? null,
    titre_ar: r.titre_ar ?? null,
    titre_en: r.titre_en ?? null,
    slug: r.slug,
    description: r.description ?? null,
    description_fr: r.description_fr ?? null,
    description_ar: r.description_ar ?? null,
    description_en: r.description_en ?? null,
    image: r.image ?? null,
    icone: r.icone ?? null,
    clickByBnm: r.clickByBnm,
    categorie: r.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: r.ordre,
  };
}

router.get("/offres", async (_req, res) => {
  const rows = await db.select().from(offresTable).orderBy(offresTable.ordre);
  return res.json(rows.map(mapOffre));
});

router.post("/offres", async (req, res) => {
  const parsed = AdminCreateOffreBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const body = parsed.data;
  try {
    await db.insert(offresTable).values({
      titre: body.titre,
      titre_fr: body.titre_fr ?? null,
      titre_ar: body.titre_ar ?? null,
      titre_en: body.titre_en ?? null,
      slug: body.slug,
      description: body.description ?? null,
      description_fr: body.description_fr ?? null,
      description_ar: body.description_ar ?? null,
      description_en: body.description_en ?? null,
      image: body.image ?? null,
      icone: body.icone ?? null,
      clickByBnm: body.clickByBnm,
      categorie: body.categorie,
      ordre: body.ordre,
    });
    return res.status(201).json({ success: true, message: "Offre créée" });
  } catch (err: any) {
    if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

router.get("/offres/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const [row] = await db.select().from(offresTable).where(eq(offresTable.id, id));
  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(mapOffre(row));
});

router.put("/offres/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const parsed = AdminUpdateOffreBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const body = parsed.data;
  const update: Partial<typeof offresTable.$inferInsert> = {};

  if ("titre" in body) update.titre = body.titre;
  if ("titre_fr" in body) update.titre_fr = body.titre_fr ?? null;
  if ("titre_ar" in body) update.titre_ar = body.titre_ar ?? null;
  if ("titre_en" in body) update.titre_en = body.titre_en ?? null;
  if ("slug" in body) update.slug = body.slug;
  if ("description" in body) update.description = body.description;
  if ("description_fr" in body) update.description_fr = body.description_fr;
  if ("description_ar" in body) update.description_ar = body.description_ar;
  if ("description_en" in body) update.description_en = body.description_en;
  if ("image" in body) update.image = body.image;
  if ("icone" in body) update.icone = body.icone;
  if ("clickByBnm" in body) update.clickByBnm = body.clickByBnm;
  if ("categorie" in body) update.categorie = body.categorie;
  if ("ordre" in body) update.ordre = body.ordre;

  try {
    await db
      .update(offresTable)
      .set(update)
      .where(eq(offresTable.id, id));
    return res.json({ success: true, message: "Offre mise à jour" });
  } catch (err: any) {
    if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

router.delete("/offres/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  await db.delete(offresTable).where(eq(offresTable.id, id));
  return res.json({ success: true, message: "Offre supprimée" });
});

export default router;