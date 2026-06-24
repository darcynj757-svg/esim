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
  Shield
} from 'lucide-react';
import './_silver.css';

export function LiquidSilver() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ background: '#f5f7fa', color: '#1a1a2e' }}>
      
      {/* Light sweep effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-0 bottom-0 w-1/3 bg-white/40 blur-3xl opacity-50"
          style={{ animation: 'light-sweep 8s ease-in-out infinite' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation / Header Area */}
        <header className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center shadow-inner">
              <span className="font-bold text-white text-xl">Ю</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">ЮниКард</span>
          </div>
          <Button variant="ghost" className="text-gray-600 hover:text-black hover:bg-white/50 rounded-full px-6">
            Войти
          </Button>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-8">
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium shimmer-border">
              Новый уровень финансов
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Оплачивайте зарубежные сервисы <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">без ограничений</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-light">
              Моментальные виртуальные карты для любых задач. Премиальный сервис, швейцарская надежность.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-14 text-lg font-medium shadow-xl shadow-black/10 transition-transform hover:scale-105">
                Оформить карту
              </Button>
              <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-md border-gray-200 text-gray-900 rounded-full px-8 h-14 text-lg font-medium hover:bg-white transition-colors">
                Каталог сервисов
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center">
             {/* Mockup Card */}
             <div className="relative w-80 h-48 sm:w-96 sm:h-56 rounded-2xl p-6 shadow-2xl shimmer-border flex flex-col justify-between overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-xl z-0" />
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full transform translate-x-10 -translate-y-10" />
               
               <div className="relative z-10 flex justify-between items-start">
                  <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded flex items-center justify-center opacity-80 shadow-inner">
                    <div className="w-8 h-5 border border-white/50 rounded-sm" />
                  </div>
                  <Wifi className="text-gray-500 w-6 h-6 rotate-90" />
               </div>
               
               <div className="relative z-10 space-y-4">
                 <div className="text-gray-600 font-mono text-lg tracking-widest">
                   4532 **** **** 9012
                 </div>
                 <div className="flex justify-between items-end">
                   <div className="text-gray-800 font-medium">ЮниКард Premium</div>
                   <div className="text-gray-500 font-bold italic">VISA</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Wallet, title: "Моментальный выпуск", desc: "Карта готова к использованию за 1 минуту" },
              { icon: ShieldCheck, title: "Безопасные платежи", desc: "Защита всех транзакций по стандарту PCI DSS" },
              { icon: Globe2, title: "Оплата по всему миру", desc: "Работает в 200+ странах без блокировок" },
              { icon: CreditCard, title: "Удобное пополнение", desc: "С любой российской карты или криптой" },
            ].map((feat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Row */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Популярные сервисы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Gift, title: "Gift-карты", subtitle: "Apple, PSN, Xbox" },
              { icon: Gamepad2, title: "Пополнение Steam", subtitle: "Турция, Казахстан" },
              { icon: Wifi, title: "eSIM", subtitle: "Интернет в роуминге" },
              { icon: Shield, title: "UniVPN", subtitle: "Безопасный доступ" },
            ].map((service, i) => (
              <div key={i} className="shimmer-border rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 group">
                <div className="relative z-10 w-full h-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <service.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-gray-500 text-sm">{service.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-gray-200 pt-12 pb-8 flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold text-gray-400">VISA</div>
          <div className="text-xl font-bold text-gray-400">Mastercard</div>
          <div className="text-xl font-bold text-gray-400">PCI DSS</div>
          <div className="text-xl font-bold text-gray-400">256-bit SSL</div>
        </div>

      </div>
    </div>
  );
}

export default LiquidSilver;
