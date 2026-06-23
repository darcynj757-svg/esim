import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { MOBILE_OPERATORS } from "../data/catalog";
import { MobileTopupBody } from "@workspace/api-zod";
import { optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/mobile-operators", async (req, res): Promise<void> => {
  let operators = MOBILE_OPERATORS;
  const { country } = req.query as Record<string, string>;
  if (country) operators = operators.filter(o => o.country === country);
  res.json(operators);
});

router.post("/mobile-topup", optionalAuth, async (req, res): Promise<void> => {
  const body = MobileTopupBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const { operatorId, phoneNumber, amount } = body.data;
  const operator = MOBILE_OPERATORS.find(o => o.id === operatorId);
  if (!operator) {
    res.status(404).json({ error: "Operator not found" });
    return;
  }
  const user = getUser(req);
  const [order] = await db.insert(ordersTable).values({
    userId: user?.id ?? null,
    productId: operator.id,
    productName: `${operator.operator} (${phoneNumber})`,
    productType: "mobile_topup",
    amount: amount.toString(),
    currency: "RUB",
    status: "success",
  }).returning();
  res.json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
