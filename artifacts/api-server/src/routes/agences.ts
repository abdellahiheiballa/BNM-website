import { Router } from "express";
import { db, agencesTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/agences", async (_req, res) => {
  const rows = await db.select().from(agencesTable).orderBy(asc(agencesTable.ville), asc(agencesTable.nom));

  return res.json(rows.map((r) => ({
    id: r.id,
    nom: r.nom,
    adresse: r.adresse ?? null,
    ville: r.ville ?? null,
    telephone: r.telephone ?? null,
    latitude: r.latitude ? Number(r.latitude) : null,
    longitude: r.longitude ? Number(r.longitude) : null,
    horaires: r.horaires ?? null,
  })));
});

export default router;
