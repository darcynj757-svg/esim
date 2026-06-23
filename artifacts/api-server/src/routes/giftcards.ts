import { Router, type IRouter } from "express";
import { GIFT_CARDS, GIFT_CARD_CATEGORIES } from "../data/catalog";
import { GetGiftCardParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/gift-cards", async (req, res): Promise<void> => {
  let cards = GIFT_CARDS;
  const { category, country, search } = req.query as Record<string, string>;
  if (category) cards = cards.filter(c => c.category === category);
  if (country) cards = cards.filter(c => c.country === country);
  if (search) cards = cards.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  res.json(cards);
});

router.get("/gift-cards/categories", async (_req, res): Promise<void> => {
  res.json(GIFT_CARD_CATEGORIES);
});

router.get("/gift-cards/:id", async (req, res): Promise<void> => {
  const params = GetGiftCardParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const card = GIFT_CARDS.find(c => c.id === params.data.id);
  if (!card) {
    res.status(404).json({ error: "Gift card not found" });
    return;
  }
  res.json(card);
});

export default router;
