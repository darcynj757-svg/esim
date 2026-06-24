import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  ShieldCheck, 
  Globe2, 
  Wallet,
  Gift,
  Gamepad2,
  Wifi,
  Shield,
  Menu
} from 'lucide-react';
import './_silver.css';

export function LiquidSilver() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-[#fafafa] text-gray-800">
      
      {/* Warm gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#f4e4c1] blur-[100px] opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#e8d5b7] blur-[120px] opacity-40 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#f4e4c1] blur-[100px] opacity-30 mix-blend-multiply pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 relative z-10">
        
        {/* Navigation / Header Area */}
        <header className="flex justify-between items-center mb-16 md:mb-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-inner">
              <span className="font-bold text-white text-xl">Ю</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1e1b4b]">ЮниКард</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-[#1e1b4b] font-medium transition-colors">Карты</a>
            <a href="#" className="text-gray-600 hover:text-[#1e1b4b] font-medium transition-colors">Сервисы</a>
            <a href="#" className="text-gray-600 hover:text-[#1e1b4b] font-medium transition-colors">Тарифы</a>
            <a href="#" className="text-gray-600 hover:text-[#1e1b4b] font-medium transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex text-gray-600 hover:text-[#1e1b4b] hover:bg-gray-100/50 rounded-full px-6">
              Войти
            </Button>
            <Button className="md:hidden bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full px-5 font-medium shadow-none">
              Войти
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-24">
          <div className="flex-1 space-y-6 md:space-y-8 order-1 md:order-1 text-center md:text-left">
            <Badge variant="outline" className="bg-white/60 backdrop-blur-sm border-[#e8d5b7] text-indigo-900 px-4 py-1.5 rounded-full text-sm font-medium inline-block">
              Новый уровень финансов
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1e1b4b] leading-[1.1]">
              Оплачивайте зарубежные сервисы <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-800">без ограничений</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
              Моментальные виртуальные карты для любых задач. Премиальный сервис, швейцарская надежность.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button size="lg" className="bg-[#4f46e5] hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg font-medium shadow-xl shadow-indigo-500/20 transition-transform hover:scale-105">
                Оформить карту
              </Button>
              <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-md border-gray-200 text-[#1e1b4b] rounded-full px-8 h-14 text-lg font-medium hover:bg-white transition-colors">
                Каталог сервисов
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center order-2 md:order-2">
             <div className="relative">
               {/* Colored glow behind the card */}
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400/40 via-purple-400/30 to-orange-300/30 blur-3xl transform scale-110 rounded-[3rem] z-0" />
               <img 
                 src="/__mockup/images/hero-card.png" 
                 alt="Virtual card" 
                 className="relative z-10 w-full max-w-[280px] md:max-w-md rounded-3xl shadow-2xl transform transition-transform hover:scale-[1.02] duration-500" 
               />
             </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#1e1b4b] text-center md:text-left">Преимущества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wallet, title: "Моментальный выпуск", desc: "Карта готова к использованию за 1 минуту", bg: "bg-blue-50", text: "text-blue-600" },
              { icon: ShieldCheck, title: "Безопасные платежи", desc: "Защита всех транзакций по стандарту PCI DSS", bg: "bg-green-50", text: "text-green-600" },
              { icon: Globe2, title: "Оплата по всему миру", desc: "Работает в 200+ странах без блокировок", bg: "bg-orange-50", text: "text-orange-600" },
              { icon: CreditCard, title: "Удобное пополнение", desc: "С любой российской карты или криптой", bg: "bg-purple-50", text: "text-purple-600" },
            ].map((feat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md border border-gray-100/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`w-6 h-6 ${feat.text}`} />
                </div>
                <h3 className="font-semibold text-lg text-[#1e1b4b] mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Row */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e1b4b]">Популярные сервисы</h2>
            <img src="/__mockup/images/hero-app.png" alt="App" className="w-24 h-auto rounded-xl shadow-md rotate-[-5deg] hover:rotate-0 transition-transform duration-300" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Gift, title: "Gift-карты", subtitle: "Apple, PSN, Xbox", borderHover: "hover:border-blue-300", shadowHover: "hover:shadow-blue-900/10" },
              { icon: Gamepad2, title: "Пополнение Steam", subtitle: "Турция, Казахстан", borderHover: "hover:border-green-300", shadowHover: "hover:shadow-green-900/10" },
              { icon: Wifi, title: "eSIM", subtitle: "Интернет в роуминге", borderHover: "hover:border-orange-300", shadowHover: "hover:shadow-orange-900/10" },
              { icon: Shield, title: "UniVPN", subtitle: "Безопасный доступ", borderHover: "hover:border-indigo-300", shadowHover: "hover:shadow-indigo-900/10" },
            ].map((service, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 md:p-6 flex flex-col items-center text-center cursor-pointer border border-transparent ${service.borderHover} shadow-sm hover:shadow-xl ${service.shadowHover} transition-all duration-300 group`}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#fafafa] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-gray-100">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                </div>
                <h3 className="font-semibold text-[#1e1b4b] text-sm md:text-base mb-1">{service.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-gray-200/60 pt-12 pb-8 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-lg md:text-xl font-bold text-gray-400">VISA</div>
          <div className="text-lg md:text-xl font-bold text-gray-400">Mastercard</div>
          <div className="text-lg md:text-xl font-bold text-gray-400">PCI DSS</div>
          <div className="text-lg md:text-xl font-bold text-gray-400">256-bit SSL</div>
        </div>

      </div>
    </div>
  );
}

export default LiquidSilver;
