import { Router } from "express";
import { db, offresTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { ListOffresQueryParams } from "@workspace/api-zod";
import { normalizeLang, localizedTitle, localizedDescription } from "../lib/localize";

const router = Router();

router.get("/offres", async (req, res) => {
  const parsed = ListOffresQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(422).json({ error: "Invalid query parameters" });
  }

  const { categorie, lang = "fr" } = parsed.data;
  const resolvedLang = normalizeLang(lang);
  const where = categorie ? eq(offresTable.categorie, categorie) : undefined;

  const rows = await db.select().from(offresTable)
    .where(where)
    .orderBy(asc(offresTable.ordre));

  return res.json(rows.map((r) => ({
    id: r.id,
    titre: localizedTitle(resolvedLang, r),
    titre_fr: r.titre_fr ?? null,
    titre_ar: r.titre_ar ?? null,
    titre_en: r.titre_en ?? null,
    slug: r.slug,
    description: localizedDescription(resolvedLang, r),
    description_fr: r.description_fr ?? null,
    description_ar: r.description_ar ?? null,
    description_en: r.description_en ?? null,
    image: r.image ?? null,
    icone: r.icone ?? null,
    clickByBnm: r.clickByBnm,
    categorie: r.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: r.ordre,
  })));
});

router.get("/offres/:slug", async (req, res) => {
  const lang = normalizeLang(req.query.lang);
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
    titre: localizedTitle(lang, row),
    titre_fr: row.titre_fr ?? null,
    titre_ar: row.titre_ar ?? null,
    titre_en: row.titre_en ?? null,
    slug: row.slug,
    description: localizedDescription(lang, row),
    description_fr: row.description_fr ?? null,
    description_ar: row.description_ar ?? null,
    description_en: row.description_en ?? null,
    image: row.image ?? null,
    icone: row.icone ?? null,
    clickByBnm: row.clickByBnm,
    categorie: row.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: row.ordre,
  });
});

export default router;
