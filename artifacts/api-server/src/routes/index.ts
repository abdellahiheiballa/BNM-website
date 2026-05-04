import { Router, type IRouter } from "express";
import healthRouter from "./health";
import actualitesRouter from "./actualites";
import offresRouter from "./offres";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import simulateRouter from "./simulate";
import agencesRouter from "./agences";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(actualitesRouter);
router.use(offresRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(simulateRouter);
router.use(agencesRouter);
router.use(statsRouter);

export default router;
