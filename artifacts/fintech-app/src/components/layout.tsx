import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Gamepad, Gift, Globe, History, LayoutDashboard, LogOut, Menu, Smartphone, Wallet, ArrowRightLeft, MessageSquare, Shield } from "lucide-react";
import { useLogout } from "@workspace/api-client-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const logoutMutation = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("fintech_token");
        window.location.href = "/";
      }
    });
  };

  const NavLinks = () => (
    <>
      <Link href="/cards" className="text-sm font-medium transition-colors hover:text-primary">Карты</Link>
      <Link href="/gift-cards" className="text-sm font-medium transition-colors hover:text-primary">Gift-карты</Link>
      <Link href="/games" className="text-sm font-medium transition-colors hover:text-primary">Игры</Link>
      <Link href="/topup" className="text-sm font-medium transition-colors hover:text-primary">Пополнение</Link>
      <Link href="/transfers" className="text-sm font-medium transition-colors hover:text-primary">Переводы</Link>
      <Link href="/mobile" className="text-sm font-medium transition-colors hover:text-primary">Связь</Link>
      <Link href="/esim" className="text-sm font-medium transition-colors hover:text-primary">eSIM</Link>
      <Link href="/vpn" className="text-sm font-medium transition-colors hover:text-primary">UniVPN</Link>
      <Link href="/reviews" className="text-sm font-medium transition-colors hover:text-primary">Отзывы</Link>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Animated background blobs — fixed, behind everything */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-600/28 blur-[100px]" />
        <div className="blob-2 absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-teal-500/22 blur-[90px]" />
        <div className="blob-3 absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-cyan-600/18 blur-[100px]" />
        <div className="blob-1 absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/12 blur-[80px]" style={{ animationDuration: "26s", animationDelay: "-8s" }} />
        <div className="blob-2 absolute bottom-1/4 -left-20 w-[350px] h-[350px] rounded-full bg-indigo-600/18 blur-[80px]" style={{ animationDelay: "-12s" }} />
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white font-bold">
                Ю
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ЮниКард</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="hidden md:flex"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Переключить тему</span>
            </Button>
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/account">
                  <Button variant="outline" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Личный кабинет
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Вход</Button>
                </Link>
                <Link href="/register">
                  <Button>Регистрация</Button>
                </Link>
              </div>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white font-bold">
                    Ю
                  </div>
                  <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ЮниКард</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavLinks />
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="justify-start gap-2"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  >
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {theme === "light" ? "Темная тема" : "Светлая тема"}
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <Link href="/account" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full gap-2 justify-start">
                          <LayoutDashboard className="h-4 w-4" /> Личный кабинет
                        </Button>
                      </Link>
                      <Button variant="destructive" className="w-full gap-2 justify-start" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" /> Выйти
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">Вход</Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full">Регистрация</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-muted/40">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white font-bold">
                  Ю
                </div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ЮниКард</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш надежный финансовый партнер для оплаты зарубежных сервисов.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Сервисы</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/cards" className="hover:text-primary transition-colors">Виртуальные карты</Link></li>
                <li><Link href="/gift-cards" className="hover:text-primary transition-colors">Gift-карты</Link></li>
                <li><Link href="/games" className="hover:text-primary transition-colors">Магазин игр</Link></li>
                <li><Link href="/esim" className="hover:text-primary transition-colors">eSIM для путешествий</Link></li>
                <li><Link href="/vpn" className="hover:text-primary transition-colors">UniVPN</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Оплата</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/transfers" className="hover:text-primary transition-colors">Переводы за рубеж</Link></li>
                <li><Link href="/topup" className="hover:text-primary transition-colors">Пополнение игр</Link></li>
                <li><Link href="/mobile" className="hover:text-primary transition-colors">Мобильная связь</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Поддержка</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/reviews" className="hover:text-primary transition-colors">Отзывы</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram бот</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Служба поддержки</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ЮниКард. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
