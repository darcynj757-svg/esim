import React from 'react';
import './_cosmic.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Globe, Wallet, CreditCard, Gamepad2, Smartphone, Lock, Menu, ArrowRight } from 'lucide-react';

export function CosmicDark() {
  return (
    <div className="min-h-screen relative overflow-hidden text-slate-50 font-sans" style={{ background: '#050816' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 star-field pointer-events-none" />
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide chrome-text">ЮниКард</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Карты</a>
          <a href="#" className="hover:text-white transition-colors">Сервисы</a>
          <a href="#" className="hover:text-white transition-colors">Тарифы</a>
          <a href="#" className="hover:text-white transition-colors">Поддержка</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex text-slate-300 hover:text-white hover:bg-white/10">Войти</Button>
          <Button className="md:hidden glass-card p-2 text-white"><Menu className="w-5 h-5" /></Button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pt-32 pb-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-4xl mx-auto mt-12 mb-24">
          <Badge className="mb-6 bg-white/5 hover:bg-white/10 text-cyan-400 border border-cyan-500/30 backdrop-blur-md px-4 py-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2" />
            Работает по всему миру
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight chrome-text tracking-tight">
            Оплачивайте зарубежные сервисы без ограничений
          </h1>
          
          <p className="text-xl text-indigo-200/80 mb-10 max-w-2xl font-light">
            Моментальный выпуск виртуальных карт для оплаты подписок, покупок и сервисов по всему миру. Безопасно, быстро, без скрытых комиссий.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="neon-btn bg-violet-600 hover:bg-violet-500 text-white border-0 rounded-full h-14 px-8 text-lg font-medium w-full sm:w-auto">
              Оформить карту
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card hover:bg-white/10 text-white border-white/20 rounded-full h-14 px-8 text-lg font-medium w-full sm:w-auto">
              Каталог сервисов
            </Button>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="mb-24 flex flex-col items-center opacity-70">
          <p className="text-sm text-indigo-300 mb-6 uppercase tracking-widest">Мы поддерживаем оплату</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {/* Fallback to text for brands to avoid missing dependencies */}
            <div className="text-2xl font-bold tracking-tighter text-red-500 flex items-center gap-1">NETFLIX</div>
            <div className="text-xl font-bold text-green-500 flex items-center gap-1"><span className="w-6 h-6 rounded-full bg-green-500 block mr-1" /> Spotify</div>
            <div className="text-xl font-bold text-slate-100 flex items-center gap-1">STEAM</div>
            <div className="text-xl font-bold text-blue-400 flex items-center gap-1">Telegram</div>
          </div>
        </section>

        {/* Features Row */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-cyan-400" />}
              title="Моментальный выпуск"
              description="Карта готова к использованию через минуту после регистрации"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-violet-400" />}
              title="Безопасные платежи"
              description="Защита данных с использованием современных стандартов шифрования"
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-indigo-400" />}
              title="Оплата по всему миру"
              description="Принимается в любых зарубежных интернет-магазинах и сервисах"
            />
            <FeatureCard 
              icon={<Wallet className="w-8 h-8 text-fuchsia-400" />}
              title="Удобное пополнение"
              description="Пополнение картами РФ или криптовалютой без лишних шагов"
            />
          </div>
        </section>

        {/* Services Section */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center chrome-text">Популярные сервисы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <ServiceCard 
              title="Gift-карты"
              description="Подарочные карты для App Store, Google Play, PlayStation и других сервисов."
              icon={<CreditCard className="w-10 h-10 text-cyan-300" />}
              bgGradient="from-cyan-900/40 to-blue-900/40"
            />
            <ServiceCard 
              title="Пополнение Steam"
              description="Моментальное пополнение кошелька Steam для покупки любимых игр."
              icon={<Gamepad2 className="w-10 h-10 text-violet-300" />}
              bgGradient="from-violet-900/40 to-purple-900/40"
            />
            <ServiceCard 
              title="eSIM"
              description="Интернет в путешествиях по всему миру без роуминга и скрытых платежей."
              icon={<Smartphone className="w-10 h-10 text-indigo-300" />}
              bgGradient="from-indigo-900/40 to-blue-900/40"
            />
            <ServiceCard 
              title="UniVPN"
              description="Безопасный и быстрый доступ к любым ресурсам без ограничений."
              icon={<Lock className="w-10 h-10 text-fuchsia-300" />}
              bgGradient="from-fuchsia-900/40 to-pink-900/40"
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-12 text-center text-slate-400 text-sm glass-card rounded-none">
        <p>© 2024 ЮниКард. Все права защищены.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="glass-card border-white/10 p-6 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300 bg-transparent text-white">
      <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </Card>
  );
}

function ServiceCard({ title, description, icon, bgGradient }: { title: string, description: string, icon: React.ReactNode, bgGradient: string }) {
  return (
    <Card className={`glass-card border-white/10 p-8 flex items-center gap-6 group overflow-hidden relative bg-transparent text-white`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-sm text-indigo-200/70 group-hover:text-indigo-100 transition-colors">{description}</p>
      </div>
      <Button variant="ghost" size="icon" className="relative z-10 rounded-full bg-white/5 hover:bg-white/20 text-white border border-white/10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
        <ArrowRight className="w-5 h-5" />
      </Button>
    </Card>
  );
}
