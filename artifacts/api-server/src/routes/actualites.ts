import { Router } from "express";
import { db, actualitesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import {
  ListActualitesQueryParams,
  GetActualiteParams,
  CreateActualiteInput,
} from "@workspace/api-zod";
import { insertActualiteSchema } from "@workspace/db";

const router = Router();

router.get("/actualites", async (req, res) => {
  const parsed = ListActualitesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid query parameters" });
  }
  const { categorie, limit = 10, offset = 0 } = parsed.data;

  const where = categorie ? eq(actualitesTable.categorie, categorie) : undefined;

  const [rows, [{ value: total }]] = await Promise.all([
    db.select().from(actualitesTable)
      .where(where)
      .orderBy(desc(actualitesTable.datePublication))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(actualitesTable).where(where),
  ]);

  return res.json({
    data: rows.map((r) => ({
      id: r.id,
      titre: r.titre,
      slug: r.slug,
      contenu: r.contenu,
      image: r.image ?? null,
      categorie: r.categorie ?? null,
      datePublication: r.datePublication.toISOString(),
      createdAt: r.createdAt.toISOString(),
    })),
    total: Number(total),
  });
});

router.get("/actualites/:id", async (req, res) => {
  const parsed = GetActualiteParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid id" });
  }

  const [row] = await db
    .select()
    .from(actualitesTable)
    .where(eq(actualitesTable.id, parsed.data.id));
  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json({
    id: row.id,
    titre: row.titre,
    slug: row.slug,
    contenu: row.contenu,
    image: row.image ?? null,
    categorie: row.categorie ?? null,
    datePublication: row.datePublication.toISOString(),
    createdAt: row.createdAt.toISOString(),
  });
});

router.post("/actualites", async (req, res) => {
  const parsed = insertActualiteSchema.safeParse(req.body);




  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid body" });
  }

  const body = parsed.data;

  // Validate against DB insert schema for additional safety
  const insertParsed = insertActualiteSchema.safeParse({
    titre: body.titre,
    slug: body.slug,
    contenu: body.contenu,
    image: body.image ?? null,
    categorie: body.categorie ?? null,
    datePublication: body.datePublication ? new Date(body.datePublication) : undefined,
  });

  if (!insertParsed.success) {
    return res.status(422).json({ error: "Invalid body" });
  }

  try {
    await db.insert(actualitesTable).values(insertParsed.data).execute();
    return res.status(201).json({ success: true, message: "Actualité créée" });
  } catch (err: any) {
    // Best-effort conflict handling (slug unique)
    if (typeof err?.message === "string" && err.message.toLowerCase().includes("unique")) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }

    return res.status(500).json({ success: false, message: "Internal error" });
  }
});

export default router;

