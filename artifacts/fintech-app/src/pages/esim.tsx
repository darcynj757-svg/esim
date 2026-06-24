import { Layout } from "@/components/layout";
import { useListEsimPlans } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Wifi } from "lucide-react";

export default function Esim() {
  const { data: countriesPlans, isLoading: loadingCountries } = useListEsimPlans({ query: { queryKey: ["esimPlans", "countries"] } });
  
  const filterByTab = (plans: any[] | undefined, tabName: string) => {
    return plans?.filter(p => p.tab === tabName) || [];
  };

  const renderPlanGrid = (plans: any[], isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent className="flex-1 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!plans || plans.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground border rounded-xl bg-muted/20">
          Тарифы не найдены
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.id} className="glass-card flex flex-col relative overflow-hidden hover-elevate">
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 font-semibold rounded-bl-lg z-10">
                Популярный
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-muted p-2 rounded-lg">
                  {plan.countryFlag || <Globe className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <CardTitle>{plan.country || plan.region}</CardTitle>
                  <CardDescription>eSIM для интернета</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg">{plan.dataGb} ГБ</span>
                </div>
                <div className="text-muted-foreground">на {plan.days} дней</div>
              </div>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(plan.priceRub)}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Купить eSIM</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">eSIM для путешествий</h1>
          <p className="text-xl text-muted-foreground">Интернет в роуминге по местным ценам без физической сим-карты</p>
        </div>
        
        <Tabs defaultValue="countries" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="countries">Страны</TabsTrigger>
              <TabsTrigger value="regions">Регионы</TabsTrigger>
              <TabsTrigger value="global">Глобальный</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="countries" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans, 'countries'), loadingCountries)}
          </TabsContent>
          
          <TabsContent value="regions" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans, 'regions'), loadingCountries)}
          </TabsContent>
          
          <TabsContent value="global" className="mt-0">
            {renderPlanGrid(filterByTab(countriesPlans, 'global'), loadingCountries)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
