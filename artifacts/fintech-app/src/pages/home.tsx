import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiNetflix, SiSpotify, SiSteam, SiApple, SiGoogleplay, SiEpicgames, SiNotion, SiBookingdotcom, SiYoutube, SiOpenai } from "react-icons/si";
import { ArrowRight, CreditCard, Globe, ShieldCheck, Zap, Gamepad, Smartphone, Shield } from "lucide-react";

export default function Home() {
  const faqs = [
    { q: "Как быстро я получу карту после оплаты?", a: "Виртуальная карта выпускается моментально. Сразу после успешной оплаты в личном кабинете появятся реквизиты карты, и вы сможете начать ей пользоваться." },
    { q: "Где я могу расплачиваться вашей картой?", a: "Картой можно расплачиваться в любых зарубежных интернет-магазинах и сервисах, которые принимают Visa/Mastercard. Например: Netflix, Spotify, Steam, Airbnb, Booking, Amazon, Google Play, App Store и многих других." },
    { q: "Можно ли привязать карту к Apple Pay или Google Pay?", a: "Да, наши пластиковые и некоторые виртуальные карты (зависит от тарифа) можно привязать к Apple Pay, Google Pay и Samsung Pay для бесконтактной оплаты в зарубежных поездках." },
    { q: "Как пополнить виртуальную карту?", a: "Пополнить баланс можно с любой российской банковской карты через СБП (без комиссии) или криптовалютой (USDT TRC20). Средства зачисляются мгновенно." },
    { q: "Есть ли скрытые комиссии за обслуживание?", a: "Нет. Вы платите только за выпуск карты (единоразово) и комиссию за пополнение. Абонентской платы за обслуживание виртуальных карт нет." },
    { q: "Что делать, если оплата не проходит?", a: "Некоторые сервисы могут отклонять карты определенных регионов. В таких случаях рекомендуем использовать VPN. Если проблема не решится, наша поддержка поможет разобраться или вернет деньги." },
    { q: "Можно ли выводить средства с карты обратно?", a: "Да, вы можете вывести остаток средств на карту РФ или в USDT в любое время через личный кабинет. Вывод занимает от 15 минут до 24 часов." },
  ];

  const features = [
    { icon: Zap,        title: "Моментальный выпуск",   desc: "Карта готова к использованию сразу после оформления",           color: "bg-amber-500/10 text-amber-500" },
    { icon: ShieldCheck, title: "Безопасные платежи",    desc: "Все транзакции защищены протоколами Visa/Mastercard",            color: "bg-teal-500/10 text-teal-500" },
    { icon: Globe,       title: "Оплата по всему миру",  desc: "Работает с подавляющим большинством зарубежных сервисов",       color: "bg-blue-500/10 text-blue-500" },
    { icon: CreditCard,  title: "Удобное пополнение",    desc: "Карты РФ, СБП или криптовалюта",                                color: "bg-green-500/10 text-green-500" },
  ];

  return (
    <Layout>
      {/* Hero Section — 2-col on desktop, stacked on mobile */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Left: text */}
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
                Работаем с картами РФ и СБП
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Оплачивайте зарубежные сервисы{" "}
                <span className="bg-gradient-to-r from-blue-500 via-primary to-teal-400 bg-clip-text text-transparent">
                  без ограничений
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
                Моментальный выпуск виртуальных карт, пополнение Steam, покупка Gift-карт и eSIM. Ваш надёжный мост в мировую финансовую систему.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/cards">
                  <Button size="lg" className="w-full sm:w-auto h-13 px-8 text-base shadow-lg shadow-primary/25 group">
                    Оформить карту
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/gift-cards">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-13 px-8 text-base glass-card">
                    Каталог сервисов
                  </Button>
                </Link>
              </div>

              {/* Trust pills — mobile friendly */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                {["Мгновенный выпуск", "Без скрытых комиссий", "Поддержка 24/7"].map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full glass-card text-muted-foreground">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: card image — hidden on mobile */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[460px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-teal-400/10 to-primary/20 blur-3xl rounded-full scale-110" />
                <img
                  src="/hero-card.png"
                  alt="Виртуальная карта ЮниКард"
                  className="relative w-full rounded-2xl drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 60px rgba(59,130,246,0.35))" }}
                />
                {/* Floating stat badges */}
                <div className="absolute -top-4 -right-2 sm:-right-6 glass-card rounded-xl px-3 py-2 text-xs font-semibold shadow-lg hidden sm:block">
                  ⚡ Выпуск за 2 мин
                </div>
                <div className="absolute -bottom-4 -left-2 sm:-left-6 glass-card rounded-xl px-3 py-2 text-xs font-semibold shadow-lg hidden sm:block">
                  🌍 150+ стран
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Logos */}
      <section className="py-12 md:py-16 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 md:mb-8">
            Наши карты принимают к оплате
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            <SiNetflix className="w-8 h-8 md:w-10 md:h-10 hover:text-[#E50914] transition-colors" />
            <SiSpotify className="w-8 h-8 md:w-10 md:h-10 hover:text-[#1DB954] transition-colors" />
            <SiSteam className="w-8 h-8 md:w-10 md:h-10 hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors" />
            <SiApple className="w-8 h-8 md:w-10 md:h-10 hover:text-[#A2AAAD] transition-colors" />
            <SiGoogleplay className="w-8 h-8 md:w-10 md:h-10 hover:text-[#414141] transition-colors" />
            <SiEpicgames className="w-8 h-8 md:w-10 md:h-10 hover:text-[#313131] dark:hover:text-[#ffffff] transition-colors" />
            <SiNotion className="w-8 h-8 md:w-10 md:h-10 hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors" />
            <SiYoutube className="w-8 h-8 md:w-10 md:h-10 hover:text-[#FF0000] transition-colors" />
            <SiOpenai className="w-8 h-8 md:w-10 md:h-10 hover:text-[#412991] transition-colors" />
            <SiBookingdotcom className="w-8 h-8 md:w-10 md:h-10 hover:text-[#003580] transition-colors" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Почему выбирают ЮниКард</h2>
          <p className="text-muted-foreground text-base md:text-lg">Мы создали сервис, который решает реальные проблемы</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {features.map((f, i) => (
            <Card key={i} className="glass-card hover-elevate transition-all">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg md:text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">Не только карты</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl">Прямые пополнения, подарочные карты и eSIM для путешествий в едином интерфейсе</p>
            </div>
            <Link href="/gift-cards">
              <Button variant="outline" className="hidden md:flex">Все сервисы</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/gift-cards" className="block">
              <Card className="h-full glass-card hover:border-blue-400/40 transition-all">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 text-blue-500">
                    <Globe className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Gift-карты</CardTitle>
                  <CardDescription className="text-xs md:text-sm">iTunes, PSN, Xbox, Netflix и сотни других сервисов.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/games" className="block">
              <Card className="h-full glass-card hover:border-teal-400/40 transition-all">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-3 text-teal-500">
                    <Gamepad className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Пополнение Steam</CardTitle>
                  <CardDescription className="text-xs md:text-sm">СНГ, Турция, Казахстан — с минимальной комиссией.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/esim" className="block">
              <Card className="h-full glass-card hover:border-green-400/40 transition-all">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3 text-green-500">
                    <Smartphone className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <CardTitle className="text-base md:text-lg">Туристические eSIM</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Интернет в 150+ странах без роуминга.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/vpn" className="block">
              <Card className="h-full glass-card hover:border-amber-400/40 transition-all">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 text-amber-500">
                    <Shield className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <CardTitle className="text-base md:text-lg flex items-center gap-2">
                    UniVPN
                    <span className="text-xs font-normal px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">Новый</span>
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">7000+ серверов в 110 странах, без логов.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/gift-cards">
              <Button variant="outline" className="w-full">Все сервисы</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Phone mockup + stats banner */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Управляйте всем в одном приложении</h2>
            <div className="space-y-5">
              {[
                { title: "Моментальный выпуск карты", desc: "Виртуальная карта за 2 минуты — без посещения офиса и очередей", icon: "⚡" },
                { title: "Пополнение через СБП", desc: "Переводите без комиссии с любой карты РФ через Систему Быстрых Платежей", icon: "💳" },
                { title: "Отслеживание транзакций", desc: "История платежей, уведомления и лимиты в реальном времени", icon: "📊" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 glass-card rounded-xl">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/cards" className="block mt-8">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Попробовать бесплатно <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex-1 order-1 md:order-2 flex justify-center">
            <div className="relative w-[200px] sm:w-[240px] md:w-[280px]">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-teal-500/20 blur-3xl rounded-full scale-150" />
              <img
                src="/hero-phone.png"
                alt="Приложение ЮниКард"
                className="relative w-full drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 50px rgba(20,184,166,0.3))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-4xl" id="faq">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-muted-foreground text-base md:text-lg">Отвечаем на самые популярные вопросы о нашем сервисе</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium text-base md:text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-primary to-teal-500 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">Готовы к оплате без границ?</h2>
          <p className="text-base md:text-xl opacity-90 max-w-2xl mx-auto mb-8 md:mb-10">
            Зарегистрируйтесь сейчас и выпустите свою первую виртуальную карту за 2 минуты.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-13 px-8 md:px-10 text-base md:text-lg text-primary shadow-2xl w-full sm:w-auto">
              Создать аккаунт
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function Badge({ className, children, ...props }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`} {...props}>
      {children}
    </div>
  );
}
