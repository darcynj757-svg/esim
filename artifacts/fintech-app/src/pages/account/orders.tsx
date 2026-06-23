import { AccountLayout } from "@/components/account-layout";
import { useListOrders } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function AccountOrders() {
  const { data: orders, isLoading } = useListOrders();

  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Загрузка...</TableCell>
                  </TableRow>
                ) : orders?.length ? (
                  orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(order.createdAt), 'd MMM yyyy', { locale: ru })}
                      </TableCell>
                      <TableCell className="font-medium">{order.productName}</TableCell>
                      <TableCell>
                        {order.productType === 'gift_card' ? 'Gift-карта' :
                         order.productType === 'game' ? 'Игра' :
                         order.productType === 'esim' ? 'eSIM' :
                         'Услуга'}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'success' ? 'bg-green-500/10 text-green-500' :
                          order.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {order.status === 'success' ? 'Выполнен' : order.status === 'failed' ? 'Ошибка' : 'В обработке'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: order.currency }).format(order.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Заказов пока нет
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
