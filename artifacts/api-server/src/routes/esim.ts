import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { ESIM_PLANS } from "../data/catalog";
import { PurchaseEsimParams } from "@workspace/api-zod";
import { optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/esim-plans", async (req, res): Promise<void> => {
  let plans = ESIM_PLANS;
  const { tab, country } = req.query as Record<string, string>;
  if (tab) plans = plans.filter(p => p.tab === tab);
  if (country) plans = plans.filter(p => p.country === country);
  res.json(plans);
});

router.post("/esim-plans/:id/purchase", optionalAuth, async (req, res): Promise<void> => {
  const params = PurchaseEsimParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const plan = ESIM_PLANS.find(p => p.id === params.data.id);
  if (!plan) {
    res.status(404).json({ error: "eSIM plan not found" });
    return;
  }
  const user = getUser(req);
  const productName = plan.country ? `eSIM ${plan.country} ${plan.dataGb}GB/${plan.days}д` : plan.region ? `eSIM ${plan.region} ${plan.dataGb}GB/${plan.days}д` : `eSIM Global ${plan.dataGb}GB/${plan.days}д`;
  const [order] = await db.insert(ordersTable).values({
    userId: user?.id ?? null,
    productId: plan.id,
    productName,
    productType: "esim",
    amount: plan.priceRub.toString(),
    currency: "RUB",
    status: "success",
  }).returning();
  res.json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
