import { AccountLayout } from "@/components/account-layout";
import { useGetDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function AccountDashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Обзор</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общий баланс</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard?.totalBalance ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(dashboard.totalBalance) : '0 ₽'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего карт</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.totalCards || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Транзакции за месяц</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard?.totalTransactions || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Мои карты</CardTitle>
              <CardDescription>Активные виртуальные карты</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboard?.cards?.length ? (
                <div className="space-y-4">
                  {dashboard.cards.map((card) => (
                    <div key={card.id} className="p-4 rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-50">
                        {card.system.toUpperCase()}
                      </div>
                      <div className="text-lg font-mono tracking-widest mt-8 mb-2">
                        {card.numberMasked}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-75 uppercase">Баланс</div>
                          <div className="font-semibold">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: card.currency }).format(card.balance)}</div>
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded bg-white/20">
                          {card.status === 'active' ? 'Активна' : card.status === 'blocked' ? 'Заблокирована' : 'Ожидает'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  У вас пока нет выпущенных карт
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Последние транзакции</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboard?.recentTransactions?.length ? (
                <div className="space-y-4">
                  {dashboard.recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${tx.type === 'topup' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {tx.type === 'topup' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium">
                            {tx.type === 'topup' ? 'Пополнение' : tx.type === 'withdraw' ? 'Вывод средств' : 'Оплата'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(tx.createdAt), 'd MMM yyyy, HH:mm', { locale: ru })}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${tx.type === 'topup' ? 'text-green-500' : ''}`}>
                        {tx.type === 'topup' ? '+' : '-'}{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: tx.currency }).format(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  История транзакций пуста
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountLayout>
  );
}
