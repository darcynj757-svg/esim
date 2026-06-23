import { Router, type IRouter } from "express";
import { db, cardsTable, transactionsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { IssueCardBody, GetCardParams, TopupCardParams, TopupCardBody, WithdrawCardParams, WithdrawCardBody } from "@workspace/api-zod";
import { requireAuth, getUser } from "../lib/auth";
import { paymentProvider } from "../lib/payments";

const router: IRouter = Router();

router.get("/cards", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const cards = await db.select().from(cardsTable).where(eq(cardsTable.userId, user.id));
  res.json(cards.map(c => ({ ...c, balance: parseFloat(c.balance) })));
});

router.post("/cards", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const parsed = IssueCardBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { type, system, currency = "USD" } = parsed.data;

  // Issue via payment provider (mock)
  const result = await paymentProvider.issueCard(user.id, type, system);

  const [card] = await db.insert(cardsTable).values({
    userId: user.id,
    type,
    system,
    numberMasked: result.numberMasked,
    balance: "0",
    currency,
    status: result.status === "success" ? "active" : "pending",
  }).returning();

  res.status(201).json({ ...card, balance: parseFloat(card.balance) });
});

router.get("/cards/:id", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const params = GetCardParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [card] = await db.select().from(cardsTable).where(and(eq(cardsTable.id, params.data.id), eq(cardsTable.userId, user.id)));
  if (!card) {
    res.status(404).json({ error: "Card not found" });
    return;
  }
  res.json({ ...card, balance: parseFloat(card.balance) });
});

router.post("/cards/:id/topup", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const params = TopupCardParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = TopupCardBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [card] = await db.select().from(cardsTable).where(and(eq(cardsTable.id, params.data.id), eq(cardsTable.userId, user.id)));
  if (!card) {
    res.status(404).json({ error: "Card not found" });
    return;
  }

  const { amount, method } = body.data;
  // Process via payment provider (mock)
  const result = await paymentProvider.topup(card.id, amount, method);

  // Update balance
  const newBalance = parseFloat(card.balance) + amount;
  await db.update(cardsTable).set({ balance: newBalance.toString() }).where(eq(cardsTable.id, card.id));

  const [txn] = await db.insert(transactionsTable).values({
    userId: user.id,
    cardId: card.id,
    type: "topup",
    method,
    amount: amount.toString(),
    currency: "RUB",
    status: result.status,
    description: `Пополнение карты ${card.numberMasked}`,
  }).returning();

  res.json({ ...txn, amount: parseFloat(txn.amount) });
});

router.post("/cards/:id/withdraw", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const params = WithdrawCardParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = WithdrawCardBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [card] = await db.select().from(cardsTable).where(and(eq(cardsTable.id, params.data.id), eq(cardsTable.userId, user.id)));
  if (!card) {
    res.status(404).json({ error: "Card not found" });
    return;
  }

  const { amount, method, destination } = body.data;
  if (parseFloat(card.balance) < amount) {
    res.status(400).json({ error: "Insufficient balance" });
    return;
  }

  const result = await paymentProvider.withdraw(card.id, amount, method, destination);
  const newBalance = parseFloat(card.balance) - amount;
  await db.update(cardsTable).set({ balance: newBalance.toString() }).where(eq(cardsTable.id, card.id));

  const [txn] = await db.insert(transactionsTable).values({
    userId: user.id,
    cardId: card.id,
    type: "withdraw",
    method,
    amount: amount.toString(),
    currency: "RUB",
    status: result.status,
    description: `Вывод с карты ${card.numberMasked}`,
  }).returning();

  res.json({ ...txn, amount: parseFloat(txn.amount) });
});

export default router;
