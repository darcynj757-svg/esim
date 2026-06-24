import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Globe, Lock, Server, Zap, Network, Shield, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function useProxyPlans() {
  return useQuery({
    queryKey: ["proxyPlans"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/proxy-plans`);
      return res.json();
    },
  });
}

function usePurchaseProxy() {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/api/proxy-plans/${id}/purchase`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });
}

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

const COUNTRIES = [
  { code: "US", flag: "🇺🇸", name: "США" },
  { code: "GB", flag: "🇬🇧", name: "Великобритания" },
  { code: "DE", flag: "🇩🇪", name: "Германия" },
  { code: "NL", flag: "🇳🇱", name: "Нидерланды" },
  { code: "FR", flag: "🇫🇷", name: "Франция" },
  { code: "CA", flag: "🇨🇦", name: "Канада" },
  { code: "AU", flag: "🇦🇺", name: "Австралия" },
  { code: "JP", flag: "🇯🇵", name: "Япония" },
  { code: "SG", flag: "🇸🇬", name: "Сингапур" },
  { code: "TR", flag: "🇹🇷", name: "Турция" },
  { code: "KZ", flag: "🇰🇿", name: "Казахстан" },
  { code: "UA", flag: "🇺🇦", name: "Украина" },
];

const features = [
  { icon: Shield, label: "Анонимность" },
  { icon: Lock,   label: "Шифрование" },
  { icon: RefreshCw, label: "Ротация IP" },
  { icon: Globe,  label: "100+ стран" },
  { icon: Zap,    label: "Высокая скорость" },
  { icon: Server, label: "99.9% аптайм" },
];

export default function ProxyPage() {
  const [proxyType, setProxyType] = useState<"all" | "datacenter" | "residential">("all");
  const { data: plans, isLoading } = useProxyPlans();
  const purchase = usePurchaseProxy();
  const { toast } = useToast();

  const filtered = plans?.filter((p: any) => proxyType === "all" || p.type === proxyType);

  const handleBuy = (id: number, name: string) => {
    purchase.mutate(id, {
      onSuccess: () => toast({ title: "Прокси подключён", description: `Тариф "${name}" активирован!` }),
      onError: () => toast({ title: "Ошибка", description: "Попробуйте ещё раз", variant: "destructive" }),
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-20 pb-24 border-b">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[35rem] w-[35rem] bg-blue-500/10 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <Network className="h-4 w-4" />
            UniProxy — приватные прокси-серверы
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Анонимные прокси <br />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">для любых задач</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Резидентские и датацентровые прокси в 100+ странах. HTTP, SOCKS5, ротация IP. Идеально для парсинга, арбитража и анонимности.
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
          <Tabs value={proxyType} onValueChange={(v) => setProxyType(v as any)}>
            <TabsList className="grid w-80 grid-cols-3">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="datacenter">Датацентр</TabsTrigger>
              <TabsTrigger value="residential">Резидентский</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader><div className="h-7 bg-muted rounded w-1/2" /></CardHeader>
                  <CardContent className="space-y-3">
                    {[1,2,3,4].map(j => <div key={j} className="h-5 bg-muted rounded w-full" />)}
                  </CardContent>
                </Card>
              ))
            : filtered?.map((plan: any) => (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col border bg-gradient-to-br transition-all hover-elevate ${colorMap[plan.color] ?? ""} ${plan.popular ? "scale-105 shadow-xl" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground shadow-lg px-4 py-1">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <Badge variant="outline" className={`text-xs ${badgeColorMap[plan.color] ?? ""}`}>
                        {plan.typeName}
                      </Badge>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(plan.priceRub)}
                      </span>
                      <span className="text-muted-foreground text-sm mb-1">/ мес</span>
                    </div>
                    {plan.pricePerGb && (
                      <div className="text-xs text-muted-foreground">{plan.pricePerGb} ₽/ГБ</div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg">
                      <div className="flex items-center gap-1"><Server className="h-3.5 w-3.5" />{plan.trafficGb} ГБ</div>
                      <div className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" />{plan.speed}</div>
                      <div className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{plan.countries} стран</div>
                      <div className="flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5" />{plan.threadsCount} потоков</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.protocol.map((p: string) => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f: string) => (
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
                      onClick={() => handleBuy(plan.id, plan.name)}
                      disabled={purchase.isPending}
                    >
                      Подключить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </section>

      {/* Countries */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Доступные страны</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {COUNTRIES.map((c) => (
              <div key={c.code} className="flex items-center gap-2 bg-background border rounded-lg px-3 py-2 text-sm hover:border-primary/50 transition-colors cursor-pointer">
                <span className="text-lg">{c.flag}</span>
                <span className="text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Для чего подходит</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Globe,     title: "Парсинг данных",      desc: "Обходите блокировки и ограничения при сборе данных с сайтов." },
            { icon: Lock,      title: "Анонимность",          desc: "Скрывайте реальный IP при работе в интернете." },
            { icon: RefreshCw, title: "Мульти-аккаунты",      desc: "Управляйте несколькими аккаунтами без блокировок." },
            { icon: Zap,       title: "SEO и арбитраж",       desc: "Проверяйте позиции в разных регионах, запускайте рекламные кампании." },
          ].map((item) => (
            <Card key={item.title} className="bg-muted/20 border-border/50 hover-elevate">
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
      </section>
    </Layout>
  );
}
