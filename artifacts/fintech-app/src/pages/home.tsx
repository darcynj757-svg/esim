import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiNetflix, SiSpotify, SiSteam, SiApple, SiGoogleplay, SiEpicgames, SiNotion, SiYoutube, SiOpenai, SiBookingdotcom } from "react-icons/si";
import { ArrowRight, CreditCard, Globe, ShieldCheck, Zap, Gamepad, Smartphone, Shield, Network } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";

const faqs = [
  { q: "Как быстро я получу карту после оплаты?", a: "Виртуальная карта выпускается моментально. Сразу после успешной оплаты в личном кабинете появятся реквизиты карты, и вы сможете начать ей пользоваться." },
  { q: "Где я могу расплачиваться вашей картой?", a: "Картой можно расплачиваться в любых зарубежных интернет-магазинах и сервисах, которые принимают Visa/Mastercard. Например: Netflix, Spotify, Steam, Airbnb, Booking, Amazon, Google Play, App Store и многих других." },
  { q: "Можно ли привязать карту к Apple Pay или Google Pay?", a: "Да, наши пластиковые и некоторые виртуальные карты (зависит от тарифа) можно привязать к Apple Pay, Google Pay и Samsung Pay для бесконтактной оплаты в зарубежных поездках." },
  { q: "Как пополнить виртуальную карту?", a: "Пополнить баланс можно с любой российской банковской карты через СБП (без комиссии) или криптовалютой (USDT TRC20). Средства зачисляются мгновенно." },
  { q: "Есть ли скрытые комиссии за обслуживание?", a: "Нет. Вы платите только за выпуск карты (единоразово) и комиссию за пополнение. Абонентской платы за обслуживание виртуальных карт нет." },
  { q: "Что делать, если оплата не проходит?", a: "Некоторые сервисы могут отклонять карты определённых регионов. В таких случаях рекомендуем использовать VPN. Если проблема не решится, наша поддержка поможет разобраться или вернёт деньги." },
  { q: "Можно ли выводить средства с карты обратно?", a: "Да, вы можете вывести остаток средств на карту РФ или в USDT в любое время через личный кабинет. Вывод занимает от 15 минут до 24 часов." },
];

const mainFeatures = [
  { icon: Zap, title: "Моментальный выпуск", desc: "Карта готова к использованию сразу после оформления" },
  { icon: ShieldCheck, title: "Безопасные платежи", desc: "Все транзакции защищены протоколами Visa/Mastercard" },
  { icon: Globe, title: "Оплата по всему миру", desc: "Работает с подавляющим большинством зарубежных сервисов" },
  { icon: CreditCard, title: "Удобное пополнение", desc: "Карты РФ, СБП или криптовалюта" },
];

const services = [
  {
    href: "/gift-cards",
    icon: Globe,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    title: "Gift-карты",
    desc: "Коды пополнения iTunes, PSN, Xbox, Netflix и сотен других сервисов разных регионов.",
  },
  {
    href: "/games",
    icon: Gamepad,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    title: "Пополнение Steam",
    desc: "Прямое пополнение аккаунтов Steam (СНГ, Турция, Казахстан) по логину с минимальной комиссией.",
  },
  {
    href: "/esim",
    icon: Smartphone,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    title: "Туристические eSIM",
    desc: "Интернет в 150+ странах мира без физической сим-карты и переплат за роуминг.",
  },
  {
    href: "/vpn",
    icon: Shield,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "UniVPN",
    desc: "Собственный VPN-сервис: 7000+ серверов в 110 странах, без логов, от 390 ₽/мес.",
    badge: "Новый",
  },
  {
    href: "/proxy",
    icon: Network,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    title: "Прокси-серверы",
    desc: "Резидентские и датацентровые прокси в 100+ странах. HTTP, SOCKS5, ротация IP.",
    badge: "Новый",
  },
];

function Badge({ className, children, ...props }: any) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-24 pb-32 border-b"
        style={{
          background: "linear-gradient(160deg, #0d0820 0%, #080516 35%, #060412 65%, #050310 100%)",
        }}
      >

        {/* Foreground content */}
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-violet-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Работаем с картами РФ и СБП
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight text-white">
            Оплачивайте зарубежные сервисы{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              без ограничений
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Моментальный выпуск виртуальных карт, пополнение Steam, покупка Gift-карт и eSIM. Ваш надёжный мост в мировую финансовую систему.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/cards">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base group relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
                  boxShadow: "0 0 32px rgba(124,58,237,0.45), 0 4px 16px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(167,139,250,0.3)",
                }}
              >
                <span className="relative z-10 flex items-center">
                  Оформить карту
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="/gift-cards">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-base text-white/90 backdrop-blur-md hover:text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                Каталог сервисов
              </Button>
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {["Мгновенный выпуск", "Visa & Mastercard", "СБП без комиссии", "Crypto пополнение", "150+ стран"].map(pill => (
              <span key={pill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/50 backdrop-blur-sm">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand logos */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Наши карты принимают к оплате
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            <SiNetflix className="w-10 h-10 hover:text-[#E50914] transition-colors" />
            <SiSpotify className="w-10 h-10 hover:text-[#1DB954] transition-colors" />
            <SiSteam className="w-10 h-10 hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors" />
            <SiApple className="w-10 h-10 hover:text-[#A2AAAD] transition-colors" />
            <SiGoogleplay className="w-10 h-10 hover:text-[#414141] transition-colors" />
            <SiEpicgames className="w-10 h-10 hover:text-[#313131] dark:hover:text-[#ffffff] transition-colors" />
            <SiNotion className="w-10 h-10 hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors" />
            <SiYoutube className="w-10 h-10 hover:text-[#FF0000] transition-colors" />
            <SiOpenai className="w-10 h-10 hover:text-[#412991] transition-colors" />
            <SiBookingdotcom className="w-10 h-10 hover:text-[#003580] transition-colors" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают ЮниКард</h2>
          <p className="text-muted-foreground text-lg">Мы создали сервис, который решает реальные проблемы</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFeatures.map((f, i) => (
            <TiltCard key={i} className="border border-white/10 ambient-glow">
              <div className="p-6 flex flex-col space-y-1.5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold leading-none tracking-tight text-xl">{f.title}</div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Не только карты</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Прямые пополнения, подарочные карты, eSIM и прокси-серверы в едином интерфейсе
              </p>
            </div>
            <Link href="/gift-cards">
              <Button variant="outline" className="hidden md:flex">Все сервисы</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="block">
                <TiltCard className="h-full border border-white/10 hover:border-violet-500/40 transition-colors ambient-glow" max={5}>
                  <div className="p-6 flex flex-col space-y-1.5">
                    <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center mb-4 ${s.iconColor}`}>
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div className="font-semibold leading-none tracking-tight flex items-center gap-2 flex-wrap">
                      {s.title}
                      {s.badge && (
                        <span className="text-xs font-normal px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/gift-cards">
              <Button variant="outline" className="w-full">Все сервисы</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 container mx-auto px-4 max-w-4xl" id="faq">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-muted-foreground text-lg">Отвечаем на самые популярные вопросы о нашем сервисе</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-600 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Готовы к оплате без границ?</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Зарегистрируйтесь сейчас и выпустите свою первую виртуальную карту за 2 минуты.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg text-primary shadow-2xl">
              Создать аккаунт
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
