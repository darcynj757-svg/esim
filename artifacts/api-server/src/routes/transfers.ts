import { Router, type IRouter } from "express";
import { db, transfersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { TRANSFER_COUNTRIES, EXCHANGE_RATES } from "../data/catalog";
import { GetTransferRateQueryParams, CreateTransferBody } from "@workspace/api-zod";
import { requireAuth, optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/transfer-countries", async (_req, res): Promise<void> => {
  res.json(TRANSFER_COUNTRIES);
});

router.get("/transfer-rate", async (req, res): Promise<void> => {
  const params = GetTransferRateQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const { fromCountry, toCountry, amount } = params.data;
  const toCountryData = TRANSFER_COUNTRIES.find(c => c.code === toCountry || c.nameRu === toCountry);
  const receiveCurrency = toCountryData?.currency ?? "USD";
  const exchangeRate = EXCHANGE_RATES[receiveCurrency] ?? 1;
  const feePercent = 2.5;
  const fee = Math.round(amount * (feePercent / 100) * 100) / 100;
  const totalAmount = Math.round((amount + fee) * 100) / 100;
  const receiveAmount = Math.round((amount / exchangeRate) * 100) / 100;

  res.json({
    fromCountry,
    toCountry,
    amount,
    fee,
    feePercent,
    totalAmount,
    exchangeRate: Math.round((1 / exchangeRate) * 10000) / 10000,
    receiveCurrency,
    receiveAmount,
  });
});

router.get("/transfers", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  const transfers = await db.select().from(transfersTable).where(eq(transfersTable.userId, user.id));
  res.json(transfers.map(t => ({
    ...t,
    amount: parseFloat(t.amount),
    fee: parseFloat(t.fee),
    totalAmount: parseFloat(t.totalAmount),
  })));
});

router.post("/transfers", optionalAuth, async (req, res): Promise<void> => {
  const user = getUser(req);
  const body = CreateTransferBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const { fromCountry, toCountry, amount } = body.data;
  const feePercent = 2.5;
  const fee = Math.round(amount * (feePercent / 100) * 100) / 100;
  const totalAmount = amount + fee;

  const [transfer] = await db.insert(transfersTable).values({
    userId: user?.id ?? 1,
    fromCountry,
    toCountry,
    amount: amount.toString(),
    fee: fee.toString(),
    totalAmount: totalAmount.toString(),
    status: "success",
  }).returning();

  res.status(201).json({
    ...transfer,
    amount: parseFloat(transfer.amount),
    fee: parseFloat(transfer.fee),
    totalAmount: parseFloat(transfer.totalAmount),
  });
});

export default router;
