import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, LogOut, Menu, Network } from "lucide-react";
import { useLogout } from "@workspace/api-client-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

const NAV_LINKS = [
  { href: "/cards", label: "Карты" },
  { href: "/gift-cards", label: "Gift-карты" },
  { href: "/games", label: "Игры" },
  { href: "/topup", label: "Пополнение" },
  { href: "/transfers", label: "Переводы" },
  { href: "/mobile", label: "Связь" },
  { href: "/esim", label: "eSIM" },
  { href: "/vpn", label: "UniVPN" },
  { href: "/proxy", label: "Прокси" },
  { href: "/reviews", label: "Отзывы" },
];

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
      },
    });
  };

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-sm">
        Ю
      </div>
      <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        ЮниКард
      </span>
    </Link>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Logo />
            {/* Desktop nav — scrollable on medium screens */}
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
                    location === href ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
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
              <div className="hidden md:flex items-center gap-2">
                <Link href="/account">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Личный кабинет
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Вход</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Регистрация</Button>
                </Link>
              </div>
            )}

            {/* Mobile burger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col w-72">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {NAV_LINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
                        location === href ? "text-primary bg-primary/10" : "text-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="justify-start gap-2"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  >
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {theme === "light" ? "Тёмная тема" : "Светлая тема"}
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <Link href="/account" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full gap-2 justify-start">
                          <LayoutDashboard className="h-4 w-4" /> Личный кабинет
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="w-full gap-2 justify-start"
                        onClick={handleLogout}
                      >
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
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Ваш надёжный финансовый партнёр для оплаты зарубежных сервисов.
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
                <li><Link href="/proxy" className="hover:text-primary transition-colors">Прокси-серверы</Link></li>
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
