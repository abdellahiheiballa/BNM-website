import { Router } from "express";
import { db, actualitesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { ListActualitesQueryParams, GetActualiteParams, CreateActualiteBody, } from "@workspace/api-zod";


const router = Router();

router.get("/actualites", async (req, res) => {
  const parsed = ListActualitesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid query parameters" });
  }
  const { categorie, limit = 10, offset = 0, lang = "fr" } = parsed.data;

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
      titre: lang === "ar" ? r.titre_ar || r.titre : lang === "fr" ? r.titre_fr || r.titre : r.titre,
      titre_fr: r.titre_fr ?? null,
      titre_ar: r.titre_ar ?? null,
      slug: r.slug,
      contenu: lang === "ar" ? r.contenu_ar || r.contenu : lang === "fr" ? r.contenu_fr || r.contenu : r.contenu,
      contenu_fr: r.contenu_fr ?? null,
      contenu_ar: r.contenu_ar ?? null,
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
  const lang = req.query.lang === "ar" ? "ar" : req.query.lang === "en" ? "en" : "fr";
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
    titre: lang === "ar" ? row.titre_ar || row.titre : row.titre_fr || row.titre,
    titre_fr: row.titre_fr ?? null,
    titre_ar: row.titre_ar ?? null,
    slug: row.slug,
    contenu: lang === "ar" ? row.contenu_ar || row.contenu : row.contenu_fr || row.contenu,
    contenu_fr: row.contenu_fr ?? null,
    contenu_ar: row.contenu_ar ?? null,
    image: row.image ?? null,
    categorie: row.categorie ?? null,
    datePublication: row.datePublication.toISOString(),
    createdAt: row.createdAt.toISOString(),
  });
});

router.post("/actualites", async (req, res) => {
  const parsed = CreateActualiteBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(422).json({
      error: "Invalid body",
      details: parsed.error.issues,
    });
  }

  const body = parsed.data;

  try {
    await db
      .insert(actualitesTable)
      .values({
        titre: body.titre,
        titre_fr: body.titre_fr ?? null,
        titre_ar: body.titre_ar ?? null,
        slug: body.slug,
        contenu: body.contenu,
        contenu_fr: body.contenu_fr ?? null,
        contenu_ar: body.contenu_ar ?? null,
        image: body.image ?? null,
        categorie: body.categorie ?? null,
        // CreateActualiteBody coerces to Date, but keep a defensive conversion.
        datePublication:
          body.datePublication instanceof Date
            ? body.datePublication
            : new Date(body.datePublication ?? new Date()),

      })
      .execute();

    return res.status(201).json({ success: true, message: "Actualité créée" });
  } catch (err: any) {
    // Best-effort conflict handling (slug unique)
    if (
      typeof err?.message === "string" &&
      err.message.toLowerCase().includes("unique")
    ) {
      return res
        .status(409)
        .json({ success: false, message: "Slug already exists" });
    }

    return res.status(500).json({ success: false, message: "Internal error" });
  }
});


export default router;

