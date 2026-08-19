import { Router } from "express";
import { SimulateClassicBody, SimulateMurabahaBody } from "@workspace/api-zod";

interface AmortizationRow {
  date: string;
  tax: number;
  amountTTC: number;
  interest: number;
  principal: number;
  balance: number;
  num: number;
  days: number;
}

function getDaysInPeriod(startDate: Date, endDate: Date): number {
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function simulateClassicSchedule(
  montant: number,
  taux: number,
  taxRate: number,
  dureeMois: number,
  firstDueDate: Date,
  loanStartDate?: Date
): { mensualiteHT: number; mensualiteTTC: number; schedule: AmortizationRow[]; taxTotal: number } {
  const rt = taux / 100 / 360;

  const dueDates: Date[] = [];
  for (let i = 0; i < dureeMois; i++) {
    dueDates.push(addMonths(firstDueDate, i));
  }

  function simulate(P: number): { finalBalance: number; schedule: AmortizationRow[]; taxTotal: number } {
    let balance = montant;
    const schedule: AmortizationRow[] = [];
    let taxTotal = 0;

    for (let i = 0; i < dureeMois; i++) {
      const prevDue = i === 0 ? (loanStartDate || firstDueDate) : dueDates[i - 1];
      const currDue = dueDates[i];
      const days = getDaysInPeriod(prevDue, currDue);

      const interest = balance * rt * days;
      const tax = interest * taxRate;
      const principal = P - interest - tax;
      balance = Math.max(0, balance - principal);
      taxTotal += tax;

      schedule.push({
        date: currDue.toISOString().split("T")[0],
        tax: Math.round(tax * 100) / 100,
        amountTTC: Math.round(P * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        balance: Math.round(balance * 100) / 100,
        num: i + 1,
        days,
      });
    }

    return { finalBalance: balance, schedule, taxTotal };
  }

  let low = 10000;
  let high = montant;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const result = simulate(mid);
    if (result.finalBalance > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const P = (low + high) / 2;
  const result = simulate(P);

  return {
    mensualiteHT: Math.round((P - result.taxTotal / dureeMois) * 100) / 100,
    mensualiteTTC: Math.round(P * 100) / 100,
    schedule: result.schedule,
    taxTotal: Math.round(result.taxTotal * 100) / 100,
  };
}

const router = Router();

router.post("/simulate/classic", (req, res) => {
  const parsed = SimulateClassicBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Données invalides", details: parsed.error.issues });
  }

  const { montant, dureeAns, taux = 5.5, tax = 0, dureeMois, firstDueDate, loanStartDate } = parsed.data;

  let n: number;
  if (dureeMois && dureeMois > 0) {
    n = dureeMois;
  } else {
    n = (dureeAns || 5) * 12;
  }

  let mensualiteHT: number;
  const r = taux / 100 / 12;
  if (r === 0) {
    mensualiteHT = montant / n;
  } else {
    mensualiteHT = (montant * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  let dueDate: Date;
  if (firstDueDate) {
    dueDate = firstDueDate instanceof Date ? firstDueDate : new Date(firstDueDate);
  } else {
    dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(22);
  }

  let startDate: Date | undefined;
  if (loanStartDate) {
    startDate = loanStartDate instanceof Date ? loanStartDate : new Date(loanStartDate);
  }

  const { mensualiteTTC, schedule, taxTotal } = simulateClassicSchedule(
    montant,
    taux,
    tax,
    n,
    dueDate,
    startDate
  );

  const coutTotal = mensualiteTTC * n;
  const interetsTotal = coutTotal - montant - taxTotal;

  return res.json({
    mensualite: Math.round(mensualiteHT * 100) / 100,
    mensualiteTTC,
    coutTotal: Math.round(coutTotal * 100) / 100,
    interetsTotal: Math.round(interetsTotal * 100) / 100,
    taxTotal,
    montant,
    dureeAns: dureeAns || Math.ceil(n / 12),
    dureeMois: n,
    taux,
    taxRate: tax,
    schedule,
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
