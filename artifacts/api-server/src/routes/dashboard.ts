import { Router, type IRouter } from "express";
import { db, cardsTable, transactionsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/dashboard", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const cards = await db.select().from(cardsTable).where(eq(cardsTable.userId, user.id));
  const allTxns = await db.select().from(transactionsTable).where(eq(transactionsTable.userId, user.id));
  const recentTxns = await db.select().from(transactionsTable).where(eq(transactionsTable.userId, user.id)).orderBy(desc(transactionsTable.createdAt)).limit(5);

  const totalBalance = cards.reduce((sum, c) => sum + parseFloat(c.balance), 0);

  res.json({
    totalCards: cards.length,
    totalBalance,
    totalTransactions: allTxns.length,
    recentTransactions: recentTxns.map(t => ({ ...t, amount: parseFloat(t.amount) })),
    cards: cards.map(c => ({ ...c, balance: parseFloat(c.balance) })),
  });
});

export default router;
