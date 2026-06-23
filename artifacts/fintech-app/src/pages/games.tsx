import { Layout } from "@/components/layout";
import { useListGames } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiSteam, SiPlaystation } from "react-icons/si";
import { Gamepad2, Monitor } from "lucide-react";

export default function Games() {
  const [platform, setPlatform] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  
  const { data: games, isLoading } = useListGames({ query: { queryKey: ["games", platform, search], enabled: true } });

  const filteredGames = games?.filter(g => {
    if (platform && g.platform !== platform) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getPlatformIcon = (plat: string) => {
    switch (plat) {
      case 'steam': return <SiSteam className="h-4 w-4" />;
      case 'xbox': return <Monitor className="h-4 w-4" />;
      case 'playstation': return <SiPlaystation className="h-4 w-4" />;
      case 'nintendo': return <Gamepad2 className="h-4 w-4" />;
      default: return null;
    }
  };

  const platforms = ['steam', 'xbox', 'playstation', 'nintendo'];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Магазин игр</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск игр..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Платформы</h3>
              <div className="flex flex-wrap md:flex-col gap-2">
                <Badge 
                  variant={platform === null ? "default" : "outline"}
                  className="cursor-pointer py-1.5 px-3 hover:bg-primary/20"
                  onClick={() => setPlatform(null)}
                >
                  Все
                </Badge>
                {platforms.map(p => (
                  <Badge 
                    key={p}
                    variant={platform === p ? "default" : "outline"}
                    className="cursor-pointer py-1.5 px-3 hover:bg-primary/20 gap-2 capitalize"
                    onClick={() => setPlatform(p)}
                  >
                    {getPlatformIcon(p)}
                    {p}
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
                    <Skeleton className="h-64 rounded-t-xl" />
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="flex-1"><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-1/2" /></CardContent>
                  </Card>
                ))
              ) : filteredGames?.length ? (
                filteredGames.map(game => (
                  <Card key={game.id} className="flex flex-col hover-elevate transition-all overflow-hidden border-border/50">
                    <div className="aspect-[3/4] w-full relative bg-muted flex items-center justify-center p-0">
                      {game.image ? (
                         <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl opacity-20 font-bold">{game.name[0]}</div>
                      )}
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md p-1.5 rounded-md">
                        {getPlatformIcon(game.platform)}
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-2 leading-tight">{game.name}</CardTitle>
                      </div>
                      <CardDescription>{game.genre} • {game.region}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-1 flex flex-col justify-end">
                      <div className="text-xl font-bold text-primary">
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(game.priceRub)}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">Купить</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Игры не найдены.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
