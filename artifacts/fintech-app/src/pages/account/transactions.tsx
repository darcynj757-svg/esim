import { AccountLayout } from "@/components/account-layout";
import { useListTransactions } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function AccountTransactions() {
  const { data: transactions, isLoading } = useListTransactions({});

  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">История транзакций</h1>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Загрузка...</TableCell>
                  </TableRow>
                ) : transactions?.length ? (
                  transactions.map(tx => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(tx.createdAt), 'd MMM yyyy, HH:mm', { locale: ru })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === 'topup' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                          <span>
                            {tx.type === 'topup' ? 'Пополнение' : tx.type === 'withdraw' ? 'Вывод' : 'Оплата'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tx.status === 'success' ? 'bg-green-500/10 text-green-500' :
                          tx.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {tx.status === 'success' ? 'Успешно' : tx.status === 'failed' ? 'Ошибка' : 'В обработке'}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${tx.type === 'topup' ? 'text-green-500' : ''}`}>
                        {tx.type === 'topup' ? '+' : '-'}{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: tx.currency }).format(tx.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Транзакции не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
