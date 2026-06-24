import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Globe, Wallet, Gamepad2, CreditCard, Wifi, Lock } from 'lucide-react';
import './_neon.css';

export function NeonCity() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden font-sans" style={{ background: '#0a0a0a', color: '#ffffff' }}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-bg z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        
        {/* Nav */}
        <header className="flex justify-between items-center mb-12 md:mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00e5ff] shadow-[0_0_15px_#00e5ff] flex items-center justify-center text-black font-black font-mono">
              U
            </div>
            <span className="font-mono text-xl tracking-wider font-bold text-white">
              Юни<span className="text-[#00e5ff] text-glow-cyan">Кард</span>
            </span>
          </div>
          <Button variant="ghost" className="font-mono text-[#00e5ff] hover:text-[#ff2d78] hover:bg-transparent transition-colors">
            Войти
          </Button>
        </header>

        {/* Hero Section */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <Badge className="mb-6 bg-transparent border-[#39ff14] text-[#39ff14] font-mono shadow-[0_0_10px_#39ff14_inset,0_0_10px_#39ff14] hover:bg-[#39ff14]/20 uppercase tracking-widest text-xs px-3 py-1">
              v2.0 System Online
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-tight">
              <span className="gradient-text-cyan-pink font-sans">Оплачивайте зарубежные сервисы</span><br />
              <span className="text-white text-glow-cyan text-3xl sm:text-4xl md:text-6xl font-mono mt-2 block">Без ограничений</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl font-mono">
              Моментальные виртуальные карты для геймеров и цифровых кочевников. 
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Button className="btn-neon-cyan rounded-none h-14 px-8 text-lg font-bold font-mono uppercase tracking-wider w-full sm:w-auto">
                Оформить карту
              </Button>
              <Button className="btn-neon-pink-outline rounded-none h-14 px-8 text-lg font-bold font-mono uppercase tracking-wider w-full sm:w-auto">
                Каталог сервисов
              </Button>
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-center items-center">
             <img 
               src="/__mockup/images/hero-card.png" 
               alt="Card" 
               className="w-full max-w-md rounded-2xl" 
               style={{ filter: 'drop-shadow(0 0 30px #00e5ff) drop-shadow(0 0 60px #00e5ff44)' }} 
             />
          </div>
        </section>

        {/* Features Row */}
        <section className="mb-24">
          <h2 className="text-xl md:text-2xl font-mono text-[#00e5ff] mb-8 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"></span>
            Системные функции
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neon-card neon-card-cyan rounded-none">
              <CardHeader className="pb-2">
                <Zap className="w-8 h-8 text-[#00e5ff] mb-2" />
                <CardTitle className="text-base md:text-lg font-bold font-mono uppercase">Моментальный выпуск</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Карта готова к использованию через 2 минуты после заявки.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-pink rounded-none">
              <CardHeader className="pb-2">
                <Shield className="w-8 h-8 text-[#ff2d78] mb-2" />
                <CardTitle className="text-base md:text-lg font-bold font-mono uppercase">Безопасные платежи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">3D-Secure и полная анонимность транзакций.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-cyan rounded-none">
              <CardHeader className="pb-2">
                <Globe className="w-8 h-8 text-[#00e5ff] mb-2" />
                <CardTitle className="text-base md:text-lg font-bold font-mono uppercase">Оплата по всему миру</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Поддержка Apple Pay, Google Pay и онлайн-магазинов.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-pink rounded-none">
              <CardHeader className="pb-2">
                <Wallet className="w-8 h-8 text-[#ff2d78] mb-2" />
                <CardTitle className="text-base md:text-lg font-bold font-mono uppercase">Удобное пополнение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Крипта, карты РФ банков и СБП с минимальной комиссией.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Row */}
        <section className="mb-24">
          <h2 className="text-xl md:text-2xl font-mono text-[#00e5ff] mb-8 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"></span>
            Доступные сервисы
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff2d78]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111111] border border-[#ff2d78]/50 hover:border-[#ff2d78] hover:shadow-[inset_0_0_15px_-5px_#ff2d78] transition-all h-full rounded-none">
                <CardContent className="p-4 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4">
                  <CreditCard className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:text-[#ff2d78] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,45,120,0.8)]" />
                  <h3 className="font-bold text-sm md:text-lg font-mono uppercase">Gift-карты</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111111] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:shadow-[inset_0_0_15px_-5px_#00e5ff] transition-all h-full rounded-none">
                <CardContent className="p-4 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4">
                  <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:text-[#00e5ff] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
                  <h3 className="font-bold text-sm md:text-lg font-mono uppercase">Пополнение Steam</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#39ff14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111111] border border-[#39ff14]/50 hover:border-[#39ff14] hover:shadow-[inset_0_0_15px_-5px_#39ff14] transition-all h-full rounded-none">
                <CardContent className="p-4 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4">
                  <Wifi className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:text-[#39ff14] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
                  <h3 className="font-bold text-sm md:text-lg font-mono uppercase">eSIM</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff6b35]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111111] border border-[#ff6b35]/50 hover:border-[#ff6b35] hover:shadow-[inset_0_0_15px_-5px_#ff6b35] transition-all h-full rounded-none">
                <CardContent className="p-4 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4">
                  <Lock className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:text-[#ff6b35] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,107,53,0.8)]" />
                  <h3 className="font-bold text-sm md:text-lg font-mono uppercase">UniVPN</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Trust Bar */}
        <section className="mb-12 border-t border-b border-[#00e5ff]/30 py-8 relative">
          <div className="absolute inset-0 bg-[#00e5ff]/5 blur-md" />
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-[#00e5ff] font-mono mb-6 uppercase tracking-widest text-xs md:text-sm text-center">
              [ Verified by 100,000+ users worldwide ]
            </h3>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-16 opacity-75 filter md:grayscale md:hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black font-mono text-lg md:text-xl"><Shield className="text-[#00e5ff] w-5 h-5"/> SECURE PAY</div>
              <div className="flex items-center gap-2 font-black font-mono text-lg md:text-xl"><Globe className="text-[#ff2d78] w-5 h-5"/> GLOBAL NET</div>
              <div className="flex items-center gap-2 font-black font-mono text-lg md:text-xl"><Zap className="text-[#39ff14] w-5 h-5"/> FAST SYNC</div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}

export default NeonCity;
