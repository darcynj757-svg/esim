/**
 * Payment Service Layer
 *
 * All payment operations go through a single PaymentProvider interface.
 * Currently using MockProvider which returns fake data with 1-2s delay.
 *
 * To connect real providers, replace MockProvider with a real implementation:
 * - cardIssuer: Connect to a card issuing API (e.g., Stripe Issuing, Payoneer, etc.)
 * - cryptoAcquiring: Connect to USDT TRC20/ERC20 gateway
 * - sbp: Connect to SBP (Система быстрых платежей) API
 */

export type PaymentStatus = "pending" | "success" | "failed";

export interface CardIssueResult {
  cardId: string;
  numberMasked: string;
  status: PaymentStatus;
}

export interface TopupResult {
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  newBalance: number;
}

export interface WithdrawResult {
  transactionId: string;
  amount: number;
  status: PaymentStatus;
}

export interface PaymentProvider {
  issueCard(userId: number, type: string, system: string): Promise<CardIssueResult>;
  topup(cardId: number, amount: number, method: string): Promise<TopupResult>;
  withdraw(cardId: number, amount: number, method: string, destination?: string): Promise<WithdrawResult>;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay() {
  return delay(1000 + Math.random() * 1000);
}

function randomCardNumber(system: string): string {
  const prefix = system === "visa" ? "4" : "5";
  const digits = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("");
  const full = prefix + digits;
  return `${full.slice(0, 4)} **** **** ${full.slice(-4)}`;
}

/**
 * MockProvider — returns fake data with realistic delay.
 * Replace this class with a real provider when connecting real APIs.
 *
 * Real provider connection points:
 * - issueCard: POST to your card issuing API (e.g. /v1/issuing/cards)
 * - topup: POST to payment gateway (card/USDT/SBP endpoint)
 * - withdraw: POST to payout API
 */
class MockProvider implements PaymentProvider {
  async issueCard(userId: number, type: string, system: string): Promise<CardIssueResult> {
    await randomDelay();
    return {
      cardId: `mock_${userId}_${Date.now()}`,
      numberMasked: randomCardNumber(system),
      status: "success",
    };
  }

  async topup(cardId: number, amount: number, _method: string): Promise<TopupResult> {
    await randomDelay();
    return {
      transactionId: `txn_${cardId}_${Date.now()}`,
      amount,
      status: "success",
      newBalance: amount,
    };
  }

  async withdraw(cardId: number, amount: number, _method: string): Promise<WithdrawResult> {
    await randomDelay();
    return {
      transactionId: `wd_${cardId}_${Date.now()}`,
      amount,
      status: "success",
    };
  }
}

// Export singleton provider — swap MockProvider for a real one here
export const paymentProvider: PaymentProvider = new MockProvider();
