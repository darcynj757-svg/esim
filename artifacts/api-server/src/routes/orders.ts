import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { CreateOrderBody } from "@workspace/api-zod";
import { requireAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/orders", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, user.id)).orderBy(desc(ordersTable.createdAt));
  res.json(orders.map(o => ({ ...o, amount: parseFloat(o.amount) })));
});

router.post("/orders", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const body = CreateOrderBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const { productType, amount, productId, details } = body.data;
  const productName = (details as Record<string, string> | undefined)?.productName ?? productType;
  const [order] = await db.insert(ordersTable).values({
    userId: user.id,
    productId: productId ?? null,
    productName,
    productType: productType as "gift_card" | "game" | "game_topup" | "esim" | "mobile_topup" | "transfer",
    amount: amount.toString(),
    currency: "RUB",
    status: "success",
  }).returning();
  res.status(201).json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
