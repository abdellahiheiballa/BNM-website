import { Router } from "express";
import { submitDevenirClient } from "../lib/uploads";

const router = Router();

router.post("/devenir-client", submitDevenirClient);

export default router;
