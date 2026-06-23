import { AccountLayout } from "@/components/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AccountWithdraw() {
  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Вывод средств</h1>
        <Card>
          <CardHeader>
            <CardTitle>Куда вывести?</CardTitle>
            <CardDescription>Вывод доступен на карты РФ и USDT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Способ</Label>
              <Select defaultValue="card">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите способ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">На карту (РФ)</SelectItem>
                  <SelectItem value="usdt">USDT TRC20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Реквизиты</Label>
              <Input placeholder="Номер карты или адрес кошелька" />
            </div>
            <div className="space-y-2">
              <Label>Сумма</Label>
              <Input type="number" placeholder="0" min="500" />
            </div>
            <Button className="w-full">Создать заявку</Button>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
