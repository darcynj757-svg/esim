import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Globe, Wallet, Gamepad2, CreditCard, Wifi, Lock } from 'lucide-react';
import './_neon.css';

export function NeonCity() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ background: '#000000', color: '#ffffff' }}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-bg z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Nav */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ff2d78] shadow-[0_0_15px_#ff2d78] flex items-center justify-center text-black font-black font-mono">
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
        <section className="text-center mb-24">
          <Badge className="mb-6 bg-transparent border-[#39ff14] text-[#39ff14] font-mono shadow-[0_0_10px_#39ff14_inset,0_0_10px_#39ff14] hover:bg-[#39ff14]/20 uppercase tracking-widest">
            v2.0 System Online
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            <span className="gradient-text font-sans">Оплачивайте зарубежные сервисы</span><br />
            <span className="text-white text-glow-cyan text-4xl md:text-6xl font-mono mt-2 block">Без ограничений</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-mono">
            Моментальные виртуальные карты для геймеров и цифровых кочевников. 
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="btn-neon-pink rounded-none h-14 px-8 text-lg font-bold font-mono uppercase tracking-wider w-full sm:w-auto">
              Оформить карту
            </Button>
            <Button className="btn-neon-cyan-outline rounded-none h-14 px-8 text-lg font-bold font-mono uppercase tracking-wider w-full sm:w-auto">
              Каталог сервисов
            </Button>
          </div>
        </section>

        {/* Features Row */}
        <section className="mb-24">
          <h2 className="text-2xl font-mono text-[#00e5ff] mb-8 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"></span>
            Системные функции
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="neon-card neon-card-pink border-0 rounded-none">
              <CardHeader className="pb-2">
                <Zap className="w-8 h-8 text-[#ff2d78] mb-2" />
                <CardTitle className="text-lg font-bold font-mono uppercase">Моментальный выпуск</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Карта готова к использованию через 2 минуты после заявки.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-cyan border-0 rounded-none">
              <CardHeader className="pb-2">
                <Shield className="w-8 h-8 text-[#00e5ff] mb-2" />
                <CardTitle className="text-lg font-bold font-mono uppercase">Безопасные платежи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">3D-Secure и полная анонимность транзакций.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-lime border-0 rounded-none">
              <CardHeader className="pb-2">
                <Globe className="w-8 h-8 text-[#39ff14] mb-2" />
                <CardTitle className="text-lg font-bold font-mono uppercase">Оплата по всему миру</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Поддержка Apple Pay, Google Pay и онлайн-магазинов.</p>
              </CardContent>
            </Card>
            <Card className="neon-card neon-card-pink border-0 rounded-none">
              <CardHeader className="pb-2">
                <Wallet className="w-8 h-8 text-[#ff2d78] mb-2" />
                <CardTitle className="text-lg font-bold font-mono uppercase">Удобное пополнение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Крипта, карты РФ банков и СБП с минимальной комиссией.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Row */}
        <section className="mb-24">
          <h2 className="text-2xl font-mono text-[#ff2d78] mb-8 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#ff2d78] shadow-[0_0_10px_#ff2d78]"></span>
            Доступные сервисы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff2d78]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111] border border-white/10 hover:border-[#ff2d78] transition-colors h-full rounded-none">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <CreditCard className="w-12 h-12 text-white group-hover:text-[#ff2d78] transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(255,45,120,0.8)]" />
                  <h3 className="font-bold text-lg font-mono uppercase">Gift-карты</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00e5ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111] border border-white/10 hover:border-[#00e5ff] transition-colors h-full rounded-none">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <Gamepad2 className="w-12 h-12 text-white group-hover:text-[#00e5ff] transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
                  <h3 className="font-bold text-lg font-mono uppercase">Пополнение Steam</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#39ff14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111] border border-white/10 hover:border-[#39ff14] transition-colors h-full rounded-none">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <Wifi className="w-12 h-12 text-white group-hover:text-[#39ff14] transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
                  <h3 className="font-bold text-lg font-mono uppercase">eSIM</h3>
                </CardContent>
              </Card>
            </div>
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff2d78]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="bg-[#111] border border-white/10 hover:border-[#ff2d78] transition-colors h-full rounded-none">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <Lock className="w-12 h-12 text-white group-hover:text-[#ff2d78] transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(255,45,120,0.8)]" />
                  <h3 className="font-bold text-lg font-mono uppercase">UniVPN</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Trust Bar */}
        <section className="mb-12 border-t border-b border-[#39ff14]/30 py-8 relative">
          <div className="absolute inset-0 bg-[#39ff14]/5 blur-md" />
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-[#39ff14] font-mono mb-6 uppercase tracking-widest text-sm text-center">
              [ Verified by 100,000+ users worldwide ]
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 filter grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black font-mono text-xl"><Shield className="text-[#00e5ff]"/> SECURE PAY</div>
              <div className="flex items-center gap-2 font-black font-mono text-xl"><Globe className="text-[#ff2d78]"/> GLOBAL NET</div>
              <div className="flex items-center gap-2 font-black font-mono text-xl"><Zap className="text-[#39ff14]"/> FAST SYNC</div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}

export default NeonCity;
