import { Layout } from "@/components/layout";
import { useListGiftCards, useListGiftCardCategories } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search } from "lucide-react";

export default function GiftCards() {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  
  const { data: categories } = useListGiftCardCategories();
  const { data: giftCards, isLoading } = useListGiftCards({ query: { queryKey: ["giftCards", category, search], enabled: true } });

  const filteredCards = giftCards?.filter(c => {
    if (category && c.category !== category) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Каталог Gift-карт</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Категории</h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                <Badge 
                  variant={category === null ? "default" : "outline"}
                  className="cursor-pointer py-1.5 px-3 hover:bg-primary/20"
                  onClick={() => setCategory(null)}
                >
                  Все
                </Badge>
                {categories?.map(c => (
                  <Badge 
                    key={c.id}
                    variant={category === c.name ? "default" : "outline"}
                    className="cursor-pointer py-1.5 px-3 hover:bg-primary/20"
                    onClick={() => setCategory(c.name)}
                  >
                    {c.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="flex flex-col">
                    <Skeleton className="h-48 rounded-t-xl" />
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="flex-1"><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-1/2" /></CardContent>
                  </Card>
                ))
              ) : filteredCards?.length ? (
                filteredCards.map(card => (
                  <Card key={card.id} className="flex flex-col hover-elevate transition-all overflow-hidden border-border/50">
                    <div className="aspect-video w-full relative bg-muted/30 flex items-center justify-center p-4">
                      {card.image ? (
                         <img src={card.image} alt={card.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-4xl opacity-20 font-bold">{card.name[0]}</div>
                      )}
                      <div className="absolute top-2 right-2 text-2xl">{card.countryFlag}</div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-1">{card.name}</CardTitle>
                        {card.popular && <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0">Хит</Badge>}
                      </div>
                      <CardDescription>{card.country}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-1">
                      <div className="text-sm text-muted-foreground">
                        От {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(card.priceRub)}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Купить</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  По вашему запросу ничего не найдено.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
