import { AccountLayout } from "@/components/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AccountTopup() {
  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Пополнение баланса</h1>
        <Card>
          <CardHeader>
            <CardTitle>Выберите способ пополнения</CardTitle>
            <CardDescription>Деньги поступят на счет моментально</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Способ</Label>
              <Select defaultValue="card">
                <SelectTrigger>
                  <SelectValue placeholder="Выберите способ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Банковская карта (РФ)</SelectItem>
                  <SelectItem value="sbp">СБП (Без комиссии)</SelectItem>
                  <SelectItem value="usdt">USDT TRC20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Сумма (₽)</Label>
              <Input type="number" placeholder="1000" min="100" />
            </div>
            <Button className="w-full">Перейти к оплате</Button>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
