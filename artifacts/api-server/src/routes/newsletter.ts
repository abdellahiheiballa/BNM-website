import { Router } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Email invalide" });
  }

  try {
    await db.insert(newsletterSubscribersTable).values({ email: parsed.data.email });
    return res.status(201).json({ success: true, message: "Inscription réussie à notre newsletter." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return res.status(409).json({ success: false, message: "Cet email est déjà inscrit." });
    }
    throw err;
  }
});

export default router;
