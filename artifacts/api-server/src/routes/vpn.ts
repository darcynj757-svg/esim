import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { VPN_PLANS } from "../data/catalog";
import { optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/vpn-plans", async (req, res): Promise<void> => {
  let plans = VPN_PLANS;
  const { duration } = req.query as Record<string, string>;
  if (duration) plans = plans.filter(p => p.duration === duration);
  res.json(plans);
});

router.post("/vpn-plans/:id/purchase", optionalAuth, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid plan id" });
    return;
  }
  const plan = VPN_PLANS.find(p => p.id === id);
  if (!plan) {
    res.status(404).json({ error: "VPN plan not found" });
    return;
  }
  const user = getUser(req);
  const productName = `UniVPN ${plan.name} (${plan.duration === "annual" ? "годовой" : "месячный"})`;
  const [order] = await db.insert(ordersTable).values({
    userId: user?.id ?? null,
    productId: plan.id,
    productName,
    productType: "vpn",
    amount: plan.priceRub.toString(),
    currency: "RUB",
    status: "success",
  }).returning();
  res.json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
