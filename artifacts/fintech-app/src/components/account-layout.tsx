import { Layout } from "@/components/layout";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, LayoutDashboard, History, ShoppingBag, ArrowUpRight, ArrowDownRight, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@workspace/api-client-react";

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const logoutMutation = useLogout();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("fintech_token");
        window.location.href = "/";
      }
    });
  };

  const navItems = [
    { href: "/account", icon: LayoutDashboard, label: "Дашборд" },
    { href: "/account/topup", icon: ArrowUpRight, label: "Пополнить баланс" },
    { href: "/account/withdraw", icon: ArrowDownRight, label: "Вывод средств" },
    { href: "/account/transactions", icon: History, label: "История транзакций" },
    { href: "/account/orders", icon: ShoppingBag, label: "Мои заказы" },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <aside className="hidden md:flex flex-col gap-2">
            <div className="p-4 bg-muted/30 rounded-xl mb-4 border">
              <div className="font-semibold">{user?.name || "Пользователь"}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 ${location === item.href ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            </div>
          </aside>
          <div className="md:hidden mb-4 overflow-x-auto pb-2">
            <nav className="flex gap-2 min-w-max">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "outline"}
                    size="sm"
                    className={`gap-2 whitespace-nowrap ${location === item.href ? "bg-primary/10 text-primary border-primary/20" : ""}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
}
