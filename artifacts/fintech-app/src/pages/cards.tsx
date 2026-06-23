import { Layout } from "@/components/layout";
import { useListCards } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cards() {
  const { data: cards, isLoading } = useListCards();

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Наши Карты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Виртуальная карта Visa</CardTitle>
              <CardDescription>Моментальный выпуск, идеально для интернета</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Оформить</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Виртуальная карта Mastercard</CardTitle>
              <CardDescription>Удобно для подписок и путешествий</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Оформить</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
