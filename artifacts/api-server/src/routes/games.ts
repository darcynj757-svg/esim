import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { GAMES, GAME_SERVICES } from "../data/catalog";
import { GetGameParams, TopupGameServiceParams, TopupGameServiceBody } from "@workspace/api-zod";
import { optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.get("/games", async (req, res): Promise<void> => {
  let games = GAMES;
  const { platform, region, search } = req.query as Record<string, string>;
  if (platform) games = games.filter(g => g.platform === platform);
  if (region) games = games.filter(g => g.region === region);
  if (search) games = games.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  res.json(games);
});

router.get("/games/:id", async (req, res): Promise<void> => {
  const params = GetGameParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const game = GAMES.find(g => g.id === params.data.id);
  if (!game) {
    res.status(404).json({ error: "Game not found" });
    return;
  }
  res.json(game);
});

router.get("/game-services", async (_req, res): Promise<void> => {
  res.json(GAME_SERVICES);
});

router.post("/game-services/:id/topup", optionalAuth, async (req, res): Promise<void> => {
  const params = TopupGameServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = TopupGameServiceBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const service = GAME_SERVICES.find(s => s.id === params.data.id);
  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  const user = getUser(req);
  const [order] = await db.insert(ordersTable).values({
    userId: user?.id ?? null,
    productId: service.id,
    productName: service.name,
    productType: "game_topup",
    amount: body.data.amount.toString(),
    currency: "RUB",
    status: "success",
  }).returning();
  res.json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
