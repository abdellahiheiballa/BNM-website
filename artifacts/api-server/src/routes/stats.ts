import { Router } from "express";
import { db, actualitesTable, agencesTable, offresTable } from "@workspace/db";
import { count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res) => {
  const [[{ value: totalActualites }], [{ value: totalAgences }], [{ value: totalOffres }]] = await Promise.all([
    db.select({ value: count() }).from(actualitesTable),
    db.select({ value: count() }).from(agencesTable),
    db.select({ value: count() }).from(offresTable),
  ]);

  return res.json({
    totalClients: 850000,
    totalAgences: Number(totalAgences),
    anneesExperience: 44,
    totalActualites: Number(totalActualites),
    totalOffres: Number(totalOffres),
  });
});

export default router;
