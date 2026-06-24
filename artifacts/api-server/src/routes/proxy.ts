import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { optionalAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

const PROXY_PLANS = [
  {
    id: 1,
    name: "Starter",
    type: "datacenter",
    typeName: "Датацентр",
    color: "blue",
    priceRub: 290,
    pricePerGb: null,
    trafficGb: 10,
    speed: "1 Гбит/с",
    countries: 10,
    threadsCount: 100,
    protocol: ["HTTP", "SOCKS5"],
    duration: "monthly",
    popular: false,
    features: [
      "10 ГБ трафика",
      "HTTP и SOCKS5",
      "Ротация IP",
      "10 стран",
      "Поддержка 24/7",
    ],
  },
  {
    id: 2,
    name: "Pro",
    type: "residential",
    typeName: "Резидентский",
    color: "purple",
    priceRub: 890,
    pricePerGb: 89,
    trafficGb: 10,
    speed: "100 Мбит/с",
    countries: 50,
    threadsCount: 500,
    protocol: ["HTTP", "SOCKS5"],
    duration: "monthly",
    popular: true,
    features: [
      "10 ГБ резидентского трафика",
      "Реальные IP пользователей",
      "50 стран",
      "HTTP и SOCKS5",
      "API доступ",
      "Поддержка 24/7",
    ],
  },
  {
    id: 3,
    name: "Business",
    type: "residential",
    typeName: "Резидентский",
    color: "gold",
    priceRub: 3490,
    pricePerGb: 70,
    trafficGb: 50,
    speed: "100 Мбит/с",
    countries: 100,
    threadsCount: 2000,
    protocol: ["HTTP", "SOCKS5", "Rotating"],
    duration: "monthly",
    popular: false,
    features: [
      "50 ГБ резидентского трафика",
      "100 стран и регионов",
      "Sticky и Rotating IP",
      "Whitelist по IP",
      "Дашборд аналитики",
      "Выделенный менеджер",
    ],
  },
];

const PROXY_COUNTRIES = [
  { code: "US", name: "США", flag: "🇺🇸" },
  { code: "GB", name: "Великобритания", flag: "🇬🇧" },
  { code: "DE", name: "Германия", flag: "🇩🇪" },
  { code: "NL", name: "Нидерланды", flag: "🇳🇱" },
  { code: "FR", name: "Франция", flag: "🇫🇷" },
  { code: "CA", name: "Канада", flag: "🇨🇦" },
  { code: "AU", name: "Австралия", flag: "🇦🇺" },
  { code: "JP", name: "Япония", flag: "🇯🇵" },
  { code: "SG", name: "Сингапур", flag: "🇸🇬" },
  { code: "TR", name: "Турция", flag: "🇹🇷" },
  { code: "KZ", name: "Казахстан", flag: "🇰🇿" },
  { code: "UA", name: "Украина", flag: "🇺🇦" },
];

router.get("/proxy-plans", async (_req, res): Promise<void> => {
  res.json(PROXY_PLANS);
});

router.get("/proxy-countries", async (_req, res): Promise<void> => {
  res.json(PROXY_COUNTRIES);
});

router.post("/proxy-plans/:id/purchase", optionalAuth, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid plan id" });
    return;
  }
  const plan = PROXY_PLANS.find((p) => p.id === id);
  if (!plan) {
    res.status(404).json({ error: "Proxy plan not found" });
    return;
  }
  const user = getUser(req);
  const productName = `Прокси ${plan.name} (${plan.typeName})`;
  const [order] = await db
    .insert(ordersTable)
    .values({
      userId: user?.id ?? null,
      productId: plan.id,
      productName,
      productType: "proxy",
      amount: plan.priceRub.toString(),
      currency: "RUB",
      status: "success",
    })
    .returning();
  res.json({ ...order, amount: parseFloat(order.amount) });
});

export default router;
