import { Router } from "express";
import { db, offresTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { ListOffresQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/offres", async (req, res) => {
  const parsed = ListOffresQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid query parameters" });
  }

  const { categorie, lang = "fr" } = parsed.data;
  const where = categorie ? eq(offresTable.categorie, categorie) : undefined;

  const rows = await db.select().from(offresTable)
    .where(where)
    .orderBy(asc(offresTable.ordre));

  return res.json(rows.map((r) => ({
    id: r.id,
    titre: lang === "ar" ? r.titre_ar || r.titre : r.titre_fr || r.titre,
    titre_fr: r.titre_fr ?? null,
    titre_ar: r.titre_ar ?? null,
    slug: r.slug,
    description: lang === "ar" ? r.description_ar || r.description : r.description_fr || r.description,
    description_fr: r.description_fr ?? null,
    description_ar: r.description_ar ?? null,
    image: r.image ?? null,
    icone: r.icone ?? null,
    clickByBnm: r.clickByBnm,
    categorie: r.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: r.ordre,
  })));
});

router.get("/offres/:slug", async (req, res) => {
  const lang = req.query.lang === "ar" ? "ar" : "fr";
  const slug = req.params.slug;

  const [row] = await db
    .select()
    .from(offresTable)
    .where(eq(offresTable.slug, slug));
  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json({
    id: row.id,
    titre: lang === "ar" ? row.titre_ar || row.titre : row.titre_fr || row.titre,
    titre_fr: row.titre_fr ?? null,
    titre_ar: row.titre_ar ?? null,
    slug: row.slug,
    description: lang === "ar" ? row.description_ar || row.description : row.description_fr || row.description,
    description_fr: row.description_fr ?? null,
    description_ar: row.description_ar ?? null,
    image: row.image ?? null,
    icone: row.icone ?? null,
    clickByBnm: row.clickByBnm,
    categorie: row.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: row.ordre,
  });
});

export default router;
