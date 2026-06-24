import { Layout } from "@/components/layout";
import { useListEsimPlans, usePurchaseEsim } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe, Wifi, Smartphone, Check, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface EsimPlan {
  id: number;
  country?: string;
  region?: string;
  countryFlag?: string;
  dataGb: number;
  days: number;
  priceRub: number;
  popular?: boolean;
  tab: string;
}

function SuccessDialog({ plan, open, onClose }: { plan: EsimPlan | null; open: boolean; onClose: () => void }) {
  if (!plan) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center py-6 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <DialogTitle className="text-xl">eSIM активирована!</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Тариф <strong>{plan.country ?? plan.region}</strong> — {plan.dataGb} ГБ на {plan.days} дней успешно приобретён.
            QR-код для установки eSIM будет в разделе «Мои заказы».
          </p>
          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <QrCode className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <p className="text-xs text-muted-foreground">QR-код для сканирования будет доступен в личном кабинете</p>
          <Button className="w-full" onClick={onClose}>Отлично</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Esim() {
  const { data: countriesPlans, isLoading: loadingCountries } = useListEsimPlans({ query: { queryKey: ["esimPlans", "countries"] } });
  const purchaseMutation = usePurchaseEsim();
  const { toast } = useToast();
  const [successPlan, setSuccessPlan] = useState<EsimPlan | null>(null);

  const filterByTab = (plans: EsimPlan[] | undefined, tabName: string) => {
    return plans?.filter(p => p.tab === tabName) || [];
  };

  const handlePurchase = (plan: EsimPlan) => {
    purchaseMutation.mutate(
      { id: plan.id },
      {
        onSuccess: () => setSuccessPlan(plan),
        onError: () => toast({ title: "Ошибка", description: "Не удалось оформить eSIM. Попробуйте ещё раз.", variant: "destructive" }),
      }
    );
  };

  const renderPlanGrid = (plans: EsimPlan[], isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent className="flex-1 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!plans || plans.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground border rounded-xl bg-muted/20">
          Тарифы не найдены
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.id} className="flex flex-col relative overflow-hidden hover-elevate border-border/50">
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 font-semibold rounded-bl-lg z-10">
                Популярный
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-muted p-2 rounded-lg">
                  {plan.countryFlag || <Globe className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <CardTitle>{plan.country || plan.region}</CardTitle>
                  <CardDescription>eSIM для интернета</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg">{plan.dataGb} ГБ</span>
                </div>
                <div className="text-muted-foreground">на {plan.days} дней</div>
              </div>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(plan.priceRub)}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handlePurchase(plan)}
                disabled={purchaseMutation.isPending}
              >
                {purchaseMutation.isPending ? "Оформляем..." : "Купить eSIM"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-16 pb-20 border-b">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[30rem] w-[30rem] bg-green-500/10 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-500 mb-6">
            <Smartphone className="h-4 w-4" />
            Интернет в 150+ странах
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            eSIM для путешествий
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Интернет в роуминге по местным ценам без физической сим-карты и переплат
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Wifi, label: "Мгновенная активация" },
              { icon: Globe, label: "150+ стран" },
              { icon: Smartphone, label: "Без физической SIM" },
              { icon: Check, label: "Совместима с eSIM-устройствами" },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2">
                <f.icon className="h-4 w-4 text-green-500" />
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        <Tabs defaultValue="countries" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="countries">Страны</TabsTrigger>
              <TabsTrigger value="regions">Регионы</TabsTrigger>
              <TabsTrigger value="global">Глобальный</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="countries" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans as EsimPlan[] | undefined, 'countries'), loadingCountries)}
          </TabsContent>

          <TabsContent value="regions" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans as EsimPlan[] | undefined, 'regions'), loadingCountries)}
          </TabsContent>

          <TabsContent value="global" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans as EsimPlan[] | undefined, 'global'), loadingCountries)}
          </TabsContent>
        </Tabs>
      </div>

      <SuccessDialog plan={successPlan} open={!!successPlan} onClose={() => setSuccessPlan(null)} />
    </Layout>
  );
}
