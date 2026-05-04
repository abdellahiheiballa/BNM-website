import { Router } from "express";
import { SimulateClassicBody, SimulateMurabahaBody } from "@workspace/api-zod";

const router = Router();

router.post("/simulate/classic", (req, res) => {
  const parsed = SimulateClassicBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Données invalides", details: parsed.error.issues });
  }

  const { montant, dureeAns, taux = 5.5 } = parsed.data;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;

  let mensualite: number;
  if (r === 0) {
    mensualite = montant / n;
  } else {
    mensualite = (montant * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const coutTotal = mensualite * n;
  const interetsTotal = coutTotal - montant;

  return res.json({
    mensualite: Math.round(mensualite * 100) / 100,
    coutTotal: Math.round(coutTotal * 100) / 100,
    interetsTotal: Math.round(interetsTotal * 100) / 100,
    montant,
    dureeAns,
    taux,
  });
});

router.post("/simulate/murabaha", (req, res) => {
  const parsed = SimulateMurabahaBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Données invalides", details: parsed.error.issues });
  }

  const { prixBien, apportPersonnel, marge = 5, dureeAns } = parsed.data;
  const montantFinance = prixBien - apportPersonnel;
  const margeAmount = (montantFinance * marge) / 100;
  const coutTotal = montantFinance + margeAmount;
  const n = dureeAns * 12;
  const mensualite = coutTotal / n;

  return res.json({
    mensualite: Math.round(mensualite * 100) / 100,
    montantFinance: Math.round(montantFinance * 100) / 100,
    coutTotal: Math.round(coutTotal * 100) / 100,
    marge,
    dureeAns,
  });
});

export default router;
