import { Layout } from "@/components/layout";
import { useListVpnPlans, usePurchaseVpnPlan } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Check, Globe, Lock, Server, Shield, Zap, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VpnPage() {
  const [duration, setDuration] = useState<"monthly" | "annual">("monthly");
  const { data: plans, isLoading } = useListVpnPlans(
    { duration },
    { query: { queryKey: ["vpnPlans", duration] } }
  );
  const purchaseMutation = usePurchaseVpnPlan();
  const { toast } = useToast();

  const handlePurchase = (id: number, name: string) => {
    purchaseMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "UniVPN подключён", description: `Тариф "${name}" успешно активирован!` });
        },
        onError: () => {
          toast({ title: "Ошибка", description: "Не удалось подключить VPN. Попробуйте ещё раз.", variant: "destructive" });
        },
      }
    );
  };

  const colorMap: Record<string, string> = {
    blue:   "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    purple: "from-primary/20 to-primary/5 border-primary/40",
    gold:   "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  };
  const badgeColorMap: Record<string, string> = {
    blue:   "bg-blue-500 text-white",
    purple: "bg-primary text-primary-foreground",
    gold:   "bg-amber-500 text-white",
  };

  const features = [
    { icon: Shield, label: "Без логов" },
    { icon: Lock,   label: "AES-256 шифрование" },
    { icon: Zap,    label: "Высокая скорость" },
    { icon: Globe,  label: "Обход блокировок" },
    { icon: Wifi,   label: "Kill Switch" },
    { icon: Server, label: "7000+ серверов" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-20 pb-24 border-b">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[35rem] w-[35rem] bg-primary/15 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <Shield className="h-4 w-4" />
            UniVPN — собственный VPN-сервис ЮниКард
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Безопасный интернет <br />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">без ограничений</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            7000+ серверов в 110 странах, шифрование военного уровня и скорость без ограничений. Один аккаунт — все устройства.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <f.icon className="h-4 w-4 text-primary" />
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <Tabs value={duration} onValueChange={(v) => setDuration(v as "monthly" | "annual")}>
            <TabsList className="grid w-72 grid-cols-2">
              <TabsTrigger value="monthly">Ежемесячно</TabsTrigger>
              <TabsTrigger value="annual">
                Годовой
                <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-600 text-xs py-0">−40%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader><Skeleton className="h-7 w-1/2" /></CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4].map((j) => <Skeleton key={j} className="h-5 w-full" />)}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((plan) => (
              <Card
                key={plan.id}
                className={`glass-card relative flex flex-col transition-all hover-elevate ${plan.popular ? "scale-105 shadow-2xl shadow-primary/20" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground shadow-lg px-4 py-1">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <Badge variant="outline" className={badgeColorMap[plan.color] ?? ""}>
                      {plan.countries} стран
                    </Badge>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold">
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(plan.priceRub)}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1">
                      / {plan.duration === "annual" ? "год" : "мес"}
                    </span>
                  </div>
                  {plan.originalPriceRub && (
                    <div className="text-sm text-muted-foreground line-through">
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(plan.originalPriceRub)}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg">
                    <div className="flex items-center gap-1"><Server className="h-3.5 w-3.5" />{plan.serversCount.toLocaleString()} серверов</div>
                    <div className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5" />{plan.speed}</div>
                    <div className="flex items-center gap-1 col-span-2"><Globe className="h-3.5 w-3.5" />{plan.devices} устр. одновременно</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePurchase(plan.id, plan.name)}
                    disabled={purchaseMutation.isPending}
                  >
                    Подключить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Why UniVPN */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему UniVPN?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Lock,   title: "Полная конфиденциальность", desc: "Политика нулевых логов. Мы не знаем, что вы делаете в интернете." },
              { icon: Zap,    title: "Максимальная скорость",      desc: "Серверы на 10 Гбит/с. Стриминг 4K без буферизации." },
              { icon: Globe,  title: "110 стран",                   desc: "Обходите любые блокировки. Netflix, ChatGPT, Discord — всё доступно." },
              { icon: Shield, title: "Kill Switch",                  desc: "Автоматически блокирует интернет при обрыве VPN-соединения." },
            ].map((item) => (
              <Card key={item.title} className="glass-card hover-elevate">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
