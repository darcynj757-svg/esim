import { AccountLayout } from "@/components/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListCards, useWithdrawCard } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AccountWithdraw() {
  const { data: cards, isLoading } = useListCards();
  const withdrawMutation = useWithdrawCard();
  const { toast } = useToast();

  const [cardId, setCardId] = useState<string>("");
  const [method, setMethod] = useState<"card" | "sbp" | "usdt">("card");
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedCard = cards?.find(c => c.id.toString() === cardId);
  const maxAmount = selectedCard?.balance ?? 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardId || !amount || !destination) return;

    withdrawMutation.mutate(
      { id: parseInt(cardId), data: { amount, method, destination } },
      {
        onSuccess: () => {
          setSuccess(true);
          setAmount(0);
          setDestination("");
        },
        onError: () => {
          toast({ title: "Ошибка", description: "Не удалось создать заявку на вывод. Попробуйте ещё раз.", variant: "destructive" });
        },
      }
    );
  };

  if (success) {
    return (
      <AccountLayout>
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Вывод средств</h1>
          <Card>
            <CardContent className="flex flex-col items-center py-12 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">Заявка создана!</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Заявка на вывод средств успешно создана. Средства поступят в течение 15 минут — 24 часов.
              </p>
              <Button className="mt-4" onClick={() => setSuccess(false)}>
                Новая заявка
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
        <h1 className="text-2xl font-bold mb-6">Вывод средств</h1>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Куда вывести?</CardTitle>
              <CardDescription>Вывод доступен на карты РФ, СБП и USDT. Срок: 15 мин — 24 часа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card selector */}
              <div className="space-y-2">
                <Label>Списать с карты</Label>
                {isLoading ? (
                  <div className="h-10 bg-muted rounded-md animate-pulse" />
                ) : !cards || cards.length === 0 ? (
                  <div className="border rounded-md p-3 text-sm text-muted-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    У вас нет карт.
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
                <Label>Способ вывода</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "card", label: "Карта РФ", sublabel: "1–3%" },
                    { value: "sbp", label: "СБП", sublabel: "Быстро" },
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

              {/* Destination */}
              <div className="space-y-2">
                <Label>
                  {method === "card" ? "Номер карты" : method === "sbp" ? "Номер телефона" : "Адрес USDT-кошелька"}
                </Label>
                <Input
                  placeholder={
                    method === "card" ? "1234 5678 9012 3456" :
                    method === "sbp" ? "+7 900 123 45 67" :
                    "TRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  }
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>
                  Сумма вывода (₽)
                  {selectedCard && maxAmount > 0 && (
                    <span className="text-muted-foreground font-normal ml-2">
                      Доступно: {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(maxAmount)}
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={amount || ""}
                  onChange={e => setAmount(Number(e.target.value))}
                  placeholder="Минимум 500 ₽"
                  min="500"
                  max={maxAmount > 0 ? maxAmount : undefined}
                  required
                />
                {selectedCard && amount > maxAmount && maxAmount > 0 && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">Сумма превышает баланс карты</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Summary */}
              {amount >= 500 && (
                <div className="bg-muted/50 border rounded-lg p-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма к выводу</span>
                    <span>{new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Комиссия</span>
                    <span className="text-destructive">
                      {method === "usdt" ? "0 ₽" : method === "sbp" ? `${(amount * 0.01).toFixed(0)} ₽` : `${(amount * 0.02).toFixed(0)} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-1 border-t">
                    <span>Получите</span>
                    <span>
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(
                        method === "usdt" ? amount : method === "sbp" ? amount * 0.99 : amount * 0.98
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
                disabled={!cardId || !amount || amount < 500 || !destination || (amount > maxAmount && maxAmount > 0) || withdrawMutation.isPending}
              >
                {withdrawMutation.isPending ? "Обработка..." : "Создать заявку"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AccountLayout>
  );
}
