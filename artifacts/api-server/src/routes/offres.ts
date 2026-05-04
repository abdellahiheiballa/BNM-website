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

  const { categorie } = parsed.data;
  const where = categorie ? eq(offresTable.categorie, categorie) : undefined;

  const rows = await db.select().from(offresTable)
    .where(where)
    .orderBy(asc(offresTable.ordre));

  return res.json(rows.map((r) => ({
    id: r.id,
    titre: r.titre,
    slug: r.slug,
    description: r.description ?? null,
    icone: r.icone ?? null,
    categorie: r.categorie as "particuliers" | "professionnels" | "entreprises" | "islamique",
    ordre: r.ordre,
  })));
});

export default router;
