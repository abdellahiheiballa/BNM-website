import { Router } from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { db, adminsTable, actualitesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin, seedDefaultAdmin } from "../lib/admin-auth";
import { CreateActualiteBody } from "@workspace/api-zod";

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

  res.cookie(SESSION_COOKIE_NAME, String(admin.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
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
      slug: body.slug,
      contenu: body.contenu,
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

  const { titre, slug, contenu, image, categorie, datePublication } = req.body;

  try {
    await db
      .update(actualitesTable)
      .set({
        titre,
        slug,
        contenu,
        image,
        categorie,
        datePublication: datePublication ? new Date(datePublication) : undefined,
      })
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

export default router;