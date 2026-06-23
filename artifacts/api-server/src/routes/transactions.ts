import { Router, type IRouter } from "express";
import { db, transactionsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { ListTransactionsQueryParams } from "@workspace/api-zod";
import { requireAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/transactions", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const params = ListTransactionsQueryParams.safeParse(req.query);
  const conditions = [eq(transactionsTable.userId, user.id)];
  if (params.success && params.data.type) {
    conditions.push(eq(transactionsTable.type, params.data.type as "topup" | "withdraw" | "payment"));
  }
  if (params.success && params.data.status) {
    conditions.push(eq(transactionsTable.status, params.data.status as "pending" | "success" | "failed"));
  }
  const txns = await db.select().from(transactionsTable).where(and(...conditions)).orderBy(transactionsTable.createdAt);
  res.json(txns.map(t => ({ ...t, amount: parseFloat(t.amount) })));
});

export default router;
