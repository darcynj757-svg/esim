import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  CreditCard, Globe, Shield, Zap, Check, ArrowRight,
  Smartphone, Lock, RefreshCw, Star,
} from "lucide-react";

const CARD_PLANS = [
  {
    id: 1,
    name: "Лайт",
    subtitle: "Виртуальная Visa",
    price: 390,
    color: "blue",
    popular: false,
    features: [
      "Мгновенный выпуск",
      "Оплата онлайн-сервисов",
      "Привязка к Apple/Google Pay",
      "Пополнение через СБП",
      "Поддержка 24/7",
    ],
    limits: { daily: "50 000 ₽", monthly: "200 000 ₽", balance: "100 000 ₽" },
    network: "Visa",
    type: "Виртуальная",
  },
  {
    id: 2,
    name: "Стандарт",
    subtitle: "Виртуальная Mastercard",
    price: 690,
    color: "purple",
    popular: true,
    features: [
      "Мгновенный выпуск",
      "Оплата в 180+ странах",
      "Apple Pay / Google Pay",
      "Пополнение СБП и крипто",
      "Уведомления об операциях",
      "Заморозка карты",
    ],
    limits: { daily: "150 000 ₽", monthly: "500 000 ₽", balance: "300 000 ₽" },
    network: "Mastercard",
    type: "Виртуальная",
  },
  {
    id: 3,
    name: "Премиум",
    subtitle: "Пластиковая Mastercard",
    price: 1990,
    color: "gold",
    popular: false,
    features: [
      "Физическая карта с доставкой",
      "Оплата везде офлайн и онлайн",
      "Бесконтактная оплата",
      "Без ограничений по транзакциям",
      "Кешбэк 1%",
      "Приоритетная поддержка",
    ],
    limits: { daily: "500 000 ₽", monthly: "2 000 000 ₽", balance: "1 000 000 ₽" },
    network: "Mastercard",
    type: "Пластиковая",
  },
];

const colorGradient: Record<string, string> = {
  blue:   "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  purple: "from-primary/20 to-primary/5 border-primary/40",
  gold:   "from-amber-500/20 to-amber-600/5 border-amber-500/30",
};
const badgeColor: Record<string, string> = {
  blue:   "bg-blue-500 text-white",
  purple: "bg-primary text-primary-foreground",
  gold:   "bg-amber-500 text-white",
};
const cardVisual: Record<string, { bg: string; text: string }> = {
  blue:   { bg: "from-blue-600 to-blue-900", text: "text-blue-100" },
  purple: { bg: "from-violet-600 to-indigo-900", text: "text-violet-100" },
  gold:   { bg: "from-amber-500 to-orange-700", text: "text-amber-100" },
};

const features = [
  { icon: Zap, label: "Мгновенный выпуск" },
  { icon: Shield, label: "Защита платежей" },
  { icon: Globe, label: "Оплата за рубежом" },
  { icon: Lock, label: "Заморозка карты" },
  { icon: RefreshCw, label: "Пополнение СБП" },
  { icon: Smartphone, label: "Apple / Google Pay" },
];

export default function Cards() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-20 pb-24 border-b">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[35rem] w-[35rem] bg-primary/10 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <CreditCard className="h-4 w-4" />
            Виртуальные и пластиковые карты
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Карта для оплаты <br />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">любых сервисов</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Visa и Mastercard без привязки к банку. Оплачивайте Netflix, Steam, ChatGPT и сотни других зарубежных сервисов.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {CARD_PLANS.map((plan) => {
            const vis = cardVisual[plan.color];
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col border bg-gradient-to-br transition-all hover-elevate ${colorGradient[plan.color]} ${plan.popular ? "scale-105 shadow-xl" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground shadow-lg px-4 py-1">
                      <Star className="h-3 w-3 mr-1 fill-current" /> Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  {/* Card visual */}
                  <div className={`w-full h-36 rounded-xl bg-gradient-to-br ${vis.bg} p-4 mb-4 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white,transparent_60%)]" />
                    <div className="flex justify-between items-start">
                      <div className={`text-xs font-semibold uppercase tracking-wider ${vis.text} opacity-80`}>{plan.type}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs border-0">{plan.network}</Badge>
                    </div>
                    <div>
                      <div className={`text-sm font-mono tracking-widest ${vis.text} opacity-60 mb-1`}>•••• •••• •••• 1234</div>
                      <div className={`text-xs ${vis.text} opacity-70`}>ЮниКард — {plan.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <Badge variant="outline" className={badgeColor[plan.color]}>{plan.network}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">{plan.subtitle}</div>

                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold">
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(plan.price)}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1">выпуск</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-1.5 text-sm text-muted-foreground p-3 bg-muted/40 rounded-lg">
                    <div className="flex justify-between"><span>Лимит в день</span><span className="font-medium text-foreground">{plan.limits.daily}</span></div>
                    <div className="flex justify-between"><span>Лимит в месяц</span><span className="font-medium text-foreground">{plan.limits.monthly}</span></div>
                    <div className="flex justify-between"><span>Макс. баланс</span><span className="font-medium text-foreground">{plan.limits.balance}</span></div>
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
                  <Link href="/register" className="w-full">
                    <Button className="w-full group" variant={plan.popular ? "default" : "outline"}>
                      Оформить карту
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Регистрация", desc: "Создайте аккаунт за 1 минуту без верификации документов" },
              { step: "2", title: "Выбор карты", desc: "Выберите подходящий тариф и оплатите выпуск" },
              { step: "3", title: "Пополнение", desc: "Пополните баланс через СБП, карту РФ или крипту" },
              { step: "4", title: "Оплата", desc: "Используйте реквизиты для оплаты любых зарубежных сервисов" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold text-primary">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
