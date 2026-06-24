import { AccountLayout } from "@/components/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListCards, useTopupCard } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CreditCard, Check } from "lucide-react";

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000];

export default function AccountTopup() {
  const { data: cards, isLoading } = useListCards();
  const topupMutation = useTopupCard();
  const { toast } = useToast();

  const [cardId, setCardId] = useState<string>("");
  const [method, setMethod] = useState<"card" | "sbp" | "usdt">("sbp");
  const [amount, setAmount] = useState<number>(0);
  const [success, setSuccess] = useState(false);

  const selectedCard = cards?.find(c => c.id.toString() === cardId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardId || !amount) return;

    topupMutation.mutate(
      { id: parseInt(cardId), data: { amount, method } },
      {
        onSuccess: () => {
          setSuccess(true);
          setAmount(0);
        },
        onError: () => {
          toast({ title: "Ошибка", description: "Не удалось выполнить пополнение. Попробуйте ещё раз.", variant: "destructive" });
        },
      }
    );
  };

  if (success) {
    return (
      <AccountLayout>
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Пополнение баланса</h1>
          <Card>
            <CardContent className="flex flex-col items-center py-12 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">Пополнение выполнено!</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Баланс карты успешно пополнен. Средства уже зачислены на ваш счёт.
              </p>
              <Button className="mt-4" onClick={() => setSuccess(false)}>
                Ещё одно пополнение
              </Button>
            </CardContent>
          </Card>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Пополнение баланса</h1>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Выберите способ пополнения</CardTitle>
              <CardDescription>Деньги поступят на счёт моментально</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card selector */}
              <div className="space-y-2">
                <Label>Карта для пополнения</Label>
                {isLoading ? (
                  <div className="h-10 bg-muted rounded-md animate-pulse" />
                ) : !cards || cards.length === 0 ? (
                  <div className="border rounded-md p-3 text-sm text-muted-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    У вас нет карт. Сначала выпустите карту.
                  </div>
                ) : (
                  <Select value={cardId} onValueChange={setCardId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите карту" />
                    </SelectTrigger>
                    <SelectContent>
                      {cards.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            {c.system?.toUpperCase()} {c.type === "virtual" ? "Виртуальная" : "Пластиковая"} — баланс{" "}
                            {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(c.balance ?? 0)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Method */}
              <div className="space-y-2">
                <Label>Способ оплаты</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "sbp", label: "СБП", sublabel: "Без комиссии" },
                    { value: "card", label: "Карта РФ", sublabel: "До 2%" },
                    { value: "usdt", label: "USDT", sublabel: "TRC20" },
                  ].map(m => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMethod(m.value as typeof method)}
                      className={`border rounded-lg p-3 text-left transition-colors ${
                        method === m.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium text-sm">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick amounts */}
              <div className="space-y-3">
                <Label>Сумма (₽)</Label>
                <div className="grid grid-cols-5 gap-2">
                  {QUICK_AMOUNTS.map(a => (
                    <Button
                      key={a}
                      type="button"
                      variant={amount === a ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(a)}
                      className="w-full"
                    >
                      {a.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Своя сумма"
                  value={amount || ""}
                  onChange={e => setAmount(Number(e.target.value))}
                  min="100"
                  required
                />
              </div>

              {/* Summary */}
              {amount > 0 && (
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма пополнения</span>
                    <span>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Комиссия</span>
                    <span className="text-green-500">{method === "sbp" ? "Бесплатно" : method === "card" ? `${(amount * 0.02).toFixed(0)} ₽` : "0 ₽"}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-1 border-t border-primary/10">
                    <span>Итого к оплате</span>
                    <span className="text-primary">
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(
                        method === "card" ? amount * 1.02 : amount
                      )}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!cardId || !amount || amount < 100 || topupMutation.isPending}
              >
                {topupMutation.isPending ? "Обработка..." : "Перейти к оплате"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AccountLayout>
  );
}
