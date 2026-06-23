import { Layout } from "@/components/layout";
import { useListTransferCountries, useGetTransferRate, useCreateTransfer } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Transfers() {
  const { data: countries } = useListTransferCountries();
  const createTransfer = useCreateTransfer();
  const { toast } = useToast();
  
  const [fromCountry, setFromCountry] = useState("RU");
  const [toCountry, setToCountry] = useState("KZ");
  const [amount, setAmount] = useState<number>(10000);
  
  const { data: rateData, isLoading: isRateLoading } = useGetTransferRate(
    { fromCountry, toCountry, amount: amount || 0 },
    { query: { enabled: !!amount && amount > 0 } }
  );

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    createTransfer.mutate({ 
      data: { 
        fromCountry, 
        toCountry, 
        amount,
        recipientName: "Иван Иванов",
        recipientAccount: "1234567890"
      } 
    }, {
      onSuccess: () => {
        toast({ title: "Успешно!", description: "Заявка на перевод создана" });
      },
      onError: () => {
        toast({ title: "Ошибка", description: "Не удалось создать заявку", variant: "destructive" });
      }
    });
  };

  const toCountries = countries?.filter(c => c.direction === 'to' || c.direction === 'both') || [];
  const fromCountries = countries?.filter(c => c.direction === 'from' || c.direction === 'both') || [];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Денежные переводы</h1>
        <p className="text-muted-foreground mb-8 text-center">Безопасные переводы в 60+ стран мира с прозрачной комиссией</p>
        
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle>Калькулятор перевода</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="transfer-form" onSubmit={handleTransfer} className="space-y-6">
              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-muted-foreground">Откуда</Label>
                    <Select value={fromCountry} onValueChange={setFromCountry}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fromCountries.map(c => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="mr-2">{c.flag}</span> {c.nameRu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-muted-foreground">Сумма</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={amount || ''} 
                        onChange={e => setAmount(Number(e.target.value))} 
                        min="1000" 
                        className="bg-background pr-12 font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-muted-foreground">
                        {fromCountries.find(c => c.code === fromCountry)?.currency || 'RUB'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-background border rounded-full p-2 text-muted-foreground">
                  <ArrowDown className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-muted-foreground">Куда</Label>
                    <Select value={toCountry} onValueChange={setToCountry}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toCountries.map(c => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="mr-2">{c.flag}</span> {c.nameRu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-muted-foreground">Получатель получит</Label>
                    <div className="relative">
                      <Input 
                        readOnly 
                        value={rateData?.receiveAmount ? rateData.receiveAmount.toFixed(2) : '0.00'} 
                        className="bg-muted font-semibold text-primary"
                      />
                      <span className="absolute right-3 top-2.5 text-muted-foreground font-medium">
                        {toCountries.find(c => c.code === toCountry)?.currency || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {rateData && (
                <div className="bg-primary/5 rounded-lg p-4 space-y-2 text-sm border border-primary/10">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Курс обмена</span>
                    <span className="font-medium">1 {fromCountries.find(c => c.code === fromCountry)?.currency} = {rateData.exchangeRate} {toCountries.find(c => c.code === toCountry)?.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Комиссия сервиса</span>
                    <span className="font-medium">{rateData.fee} {fromCountries.find(c => c.code === fromCountry)?.currency} ({rateData.feePercent}%)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-primary/10 mt-2 font-bold">
                    <span>Итого к оплате</span>
                    <span className="text-primary">{rateData.totalAmount} {fromCountries.find(c => c.code === fromCountry)?.currency}</span>
                  </div>
                </div>
              )}
              
              <Alert className="bg-background text-muted-foreground">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Скорость перевода зависит от страны назначения. Обычно перевод занимает от 5 минут до 24 часов.
                </AlertDescription>
              </Alert>

            </form>
          </CardContent>
          <CardFooter>
            <Button form="transfer-form" type="submit" className="w-full" size="lg" disabled={!amount || isRateLoading || createTransfer.isPending}>
              {createTransfer.isPending ? "Обработка..." : "Перевести деньги"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
