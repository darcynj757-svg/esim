import { Layout } from "@/components/layout";
import { useListMobileOperators, useMobileTopup } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Smartphone } from "lucide-react";

export default function Mobile() {
  const [country, setCountry] = useState<string>("KZ");
  const [operatorId, setOperatorId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState<number>(0);
  
  const { data: operators } = useListMobileOperators({ query: { enabled: true } });
  const topupMutation = useMobileTopup();
  const { toast } = useToast();

  const filteredOperators = operators?.filter(o => o.country === country) || [];
  
  // Get unique countries
  const countries = Array.from(new Set(operators?.map(o => o.country) || []));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorId || !amount || !phoneNumber) return;
    
    topupMutation.mutate({ 
      data: { 
        operatorId: parseInt(operatorId),
        phoneNumber,
        amount
      } 
    }, {
      onSuccess: () => {
        toast({ title: "Успешно!", description: "Заявка на пополнение создана" });
        setPhoneNumber("");
        setAmount(0);
      },
      onError: () => {
        toast({ title: "Ошибка", description: "Не удалось пополнить баланс", variant: "destructive" });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Мобильная связь</h1>
        <p className="text-muted-foreground mb-8 text-center">Пополнение баланса зарубежных операторов</p>
        
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Пополнить счет
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form id="mobile-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Страна</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(c => {
                        const op = operators?.find(o => o.country === c);
                        return (
                          <SelectItem key={c} value={c}>
                            {op?.countryFlag} {c}
                          </SelectItem>
                        );
                      })}
                      {countries.length === 0 && (
                        <SelectItem value="KZ">🇰🇿 KZ</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Оператор</Label>
                  <Select value={operatorId} onValueChange={setOperatorId} disabled={!country}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите оператора" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredOperators.map(op => (
                        <SelectItem key={op.id} value={op.id.toString()}>
                          <div className="flex items-center gap-2">
                            {op.logo && <img src={op.logo} alt={op.operator} className="w-4 h-4 object-contain" />}
                            {op.operator}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Номер телефона</Label>
                  <Input 
                    type="tel" 
                    placeholder="+7 777 123 45 67" 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Сумма пополнения (₽)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 2000].map(amt => (
                      <Button
                        key={amt}
                        type="button"
                        variant={amount === amt ? "default" : "outline"}
                        onClick={() => setAmount(amt)}
                      >
                        {amt} ₽
                      </Button>
                    ))}
                  </div>
                  <Input 
                    type="number" 
                    value={amount || ''} 
                    onChange={e => setAmount(Number(e.target.value))} 
                    placeholder="Своя сумма" 
                    min="100" 
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              form="mobile-form" 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={!operatorId || !phoneNumber || !amount || topupMutation.isPending}
            >
              {topupMutation.isPending ? "Обработка..." : "Пополнить баланс"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
