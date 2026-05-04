import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: "Validation failed", details: parsed.error.issues });
  }

  await db.insert(contactsTable).values({
    nom: parsed.data.nom,
    email: parsed.data.email,
    telephone: parsed.data.telephone ?? null,
    sujet: parsed.data.sujet ?? null,
    message: parsed.data.message,
  });

  return res.status(201).json({ success: true, message: "Votre message a été envoyé avec succès." });
});

export default router;
