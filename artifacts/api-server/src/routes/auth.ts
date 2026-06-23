import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { RegisterBody, LoginBody } from "@workspace/api-zod";
import { hashPassword, createToken, requireAuth, getUser } from "../lib/auth";

const router: IRouter = Router();

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, password, name } = parsed.data;
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }
  const [user] = await db.insert(usersTable).values({
    email,
    passwordHash: hashPassword(password),
    name: name ?? null,
  }).returning();
  const token = createToken(user.id);
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, telegramId: user.telegramId, createdAt: user.createdAt },
    token,
  });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, password } = parsed.data;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const token = createToken(user.id);
  res.json({
    user: { id: user.id, email: user.email, name: user.name, telegramId: user.telegramId, createdAt: user.createdAt },
    token,
  });
});

router.get("/auth/me", requireAuth, async (req, res): Promise<void> => {
  const user = getUser(req)!;
  res.json({ id: user.id, email: user.email, name: user.name, telegramId: user.telegramId, createdAt: user.createdAt });
});

router.post("/auth/logout", async (_req, res): Promise<void> => {
  res.json({ ok: true });
});

export default router;
