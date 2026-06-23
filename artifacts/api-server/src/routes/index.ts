import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import cardsRouter from "./cards";
import transactionsRouter from "./transactions";
import giftcardsRouter from "./giftcards";
import gamesRouter from "./games";
import esimRouter from "./esim";
import transfersRouter from "./transfers";
import mobileRouter from "./mobile";
import reviewsRouter from "./reviews";
import ordersRouter from "./orders";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(cardsRouter);
router.use(transactionsRouter);
router.use(giftcardsRouter);
router.use(gamesRouter);
router.use(esimRouter);
router.use(transfersRouter);
router.use(mobileRouter);
router.use(reviewsRouter);
router.use(ordersRouter);
router.use(dashboardRouter);

export default router;
