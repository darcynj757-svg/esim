import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiNetflix, SiSpotify, SiSteam, SiApple, SiGoogleplay, SiEpicgames, SiNotion, SiBookingdotcom, SiYoutube, SiOpenai } from "react-icons/si";
import { ArrowRight, CreditCard, Globe, ShieldCheck, Zap, Gamepad, Smartphone } from "lucide-react";

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
    { icon: Zap, title: "Моментальный выпуск", desc: "Карта готова к использованию сразу после оформления" },
    { icon: ShieldCheck, title: "Безопасные платежи", desc: "Все транзакции защищены протоколами Visa/Mastercard" },
    { icon: Globe, title: "Оплата по всему миру", desc: "Работает с подавляющим большинством зарубежных сервисов" },
    { icon: CreditCard, title: "Удобное пополнение", desc: "Карты РФ, СБП или криптовалюта" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 border-b">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-800/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[40rem] w-[40rem] bg-primary/20 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            Работаем с картами РФ и СБП
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            Оплачивайте зарубежные сервисы <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">без ограничений</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Моментальный выпуск виртуальных карт, пополнение Steam, покупка Gift-карт и eSIM. Ваш надежный мост в мировую финансовую систему.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/cards">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/25 group">
                Оформить карту
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/gift-cards">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-background/50 backdrop-blur-sm">
                Каталог сервисов
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Logos */}
      <section className="py-16 bg-muted/30 border-b">
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
          {features.map((f, i) => (
            <Card key={i} className="bg-muted/20 border-border/50 hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Не только карты</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Прямые пополнения, подарочные карты и eSIM для путешествий в едином интерфейсе</p>
            </div>
            <Link href="/gift-cards">
              <Button variant="outline" className="hidden md:flex">Все сервисы</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/gift-cards" className="block">
              <Card className="h-full hover:border-primary/50 transition-colors bg-gradient-to-br from-background to-muted">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle>Gift-карты</CardTitle>
                  <CardDescription>Коды пополнения iTunes, PSN, Xbox, Netflix и сотен других сервисов разных регионов.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/games" className="block">
              <Card className="h-full hover:border-primary/50 transition-colors bg-gradient-to-br from-background to-muted">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                    <Gamepad className="h-6 w-6" />
                  </div>
                  <CardTitle>Пополнение Steam</CardTitle>
                  <CardDescription>Прямое пополнение аккаунтов Steam (СНГ, Турция, Казахстан) по логину с минимальной комиссией.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/esim" className="block">
              <Card className="h-full hover:border-primary/50 transition-colors bg-gradient-to-br from-background to-muted">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <CardTitle>Туристические eSIM</CardTitle>
                  <CardDescription>Интернет в 150+ странах мира без физической сим-карты и переплат за роуминг.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
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
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
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

// Inline Badge component specifically for this page since we don't have the ui/badge ready yet
function Badge({ className, children, ...props }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
