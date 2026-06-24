import { Layout } from "@/components/layout";
import { useListGames, useCreateOrder } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Search, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SiSteam, SiPlaystation } from "react-icons/si";
import { Gamepad2, Monitor } from "lucide-react";

const GENRE_GRADIENTS: Record<string, string> = {
  RPG:           "from-violet-900 via-purple-800 to-indigo-900",
  Action:        "from-red-900 via-orange-800 to-yellow-900",
  FPS:           "from-slate-900 via-zinc-800 to-gray-900",
  Sports:        "from-green-900 via-emerald-800 to-teal-900",
  Adventure:     "from-emerald-900 via-teal-800 to-cyan-900",
  Horror:        "from-stone-900 via-red-950 to-zinc-900",
  Racing:        "from-blue-900 via-cyan-800 to-sky-900",
  Fighting:      "from-orange-900 via-red-800 to-rose-900",
  "Battle Royale": "from-amber-900 via-yellow-800 to-lime-900",
};

const GENRE_TEXT: Record<string, string> = {
  RPG:           "text-violet-300",
  Action:        "text-orange-300",
  FPS:           "text-zinc-300",
  Sports:        "text-emerald-300",
  Adventure:     "text-teal-300",
  Horror:        "text-red-300",
  Racing:        "text-cyan-300",
  Fighting:      "text-rose-300",
  "Battle Royale": "text-yellow-300",
};

function getPlatformIcon(plat: string) {
  switch (plat) {
    case "steam":        return <SiSteam className="h-4 w-4" />;
    case "xbox":         return <Monitor className="h-4 w-4" />;
    case "playstation":  return <SiPlaystation className="h-4 w-4" />;
    case "nintendo":     return <Gamepad2 className="h-4 w-4" />;
    default:             return <Gamepad2 className="h-4 w-4" />;
  }
}

const platforms = ["steam", "xbox", "playstation", "nintendo"];

interface GameItem {
  id: number;
  name: string;
  platform: string;
  genre: string;
  region: string;
  description: string;
  priceRub: number;
  popular: boolean;
}

function BuyGameDialog({ game, open, onClose }: { game: GameItem | null; open: boolean; onClose: () => void }) {
  const createOrder = useCreateOrder();
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  if (!game) return null;

  const handleBuy = () => {
    createOrder.mutate(
      { data: { productId: game.id, productType: "game", amount: game.priceRub, details: { name: game.name, platform: game.platform, region: game.region } } },
      {
        onSuccess: () => setSuccess(true),
        onError: () => toast({ title: "Ошибка", description: "Не удалось оформить заказ", variant: "destructive" }),
      }
    );
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  const gradient = GENRE_GRADIENTS[game.genre] ?? "from-gray-900 via-slate-800 to-zinc-900";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <DialogTitle className="text-xl">Заказ оформлен!</DialogTitle>
            <p className="text-muted-foreground text-sm">
              Игра <strong>{game.name}</strong> успешно куплена. Ключ активации будет в разделе «Мои заказы».
            </p>
            <Button className="w-full mt-2" onClick={handleClose}>Отлично</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{game.name}</DialogTitle>
              <DialogDescription>{game.genre} • {game.region} • {game.platform}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className={`h-32 w-full rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />
                <div className="relative text-center">
                  <div className={`text-4xl font-black opacity-30 ${GENRE_TEXT[game.genre] ?? "text-gray-300"}`}>
                    {game.name.split(" ").map((w: string) => w[0]).join("").slice(0, 3)}
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md p-1.5 rounded-md text-white">
                  {getPlatformIcon(game.platform)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{game.description}</p>
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Цена</span>
                <span className="font-bold text-primary text-xl">
                  {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(game.priceRub)}
                </span>
              </div>
              <Button className="w-full" onClick={handleBuy} disabled={createOrder.isPending}>
                {createOrder.isPending ? "Оформляем..." : "Купить игру"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Games() {
  const [platform, setPlatform] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [buyGame, setBuyGame] = useState<GameItem | null>(null);

  const { data: games, isLoading } = useListGames({ query: { queryKey: ["games", platform, search], enabled: true } });

  const filteredGames = (games as GameItem[] | undefined)?.filter(g => {
    if (platform && g.platform !== platform) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">Магазин игр</h1>
        <p className="text-muted-foreground mb-8">Покупка игр для Steam, PlayStation, Xbox и Nintendo</p>

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
                filteredGames.map(game => {
                  const gradient = GENRE_GRADIENTS[game.genre] ?? "from-gray-900 via-slate-800 to-zinc-900";
                  const textColor = GENRE_TEXT[game.genre] ?? "text-gray-300";
                  return (
                    <Card key={game.id} className="flex flex-col hover-elevate transition-all overflow-hidden border-border/50">
                      <div className={`aspect-[3/4] w-full relative bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6`}>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />
                        <div className="relative text-center">
                          <div className={`text-6xl font-black mb-3 opacity-20 ${textColor}`}>
                            {game.name.split(" ").map((w: string) => w[0]).join("").slice(0, 3)}
                          </div>
                          <div className={`text-sm font-bold uppercase tracking-widest ${textColor} opacity-80`}>
                            {game.genre}
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
                          {game.region}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md p-1.5 rounded-md text-white">
                          {getPlatformIcon(game.platform)}
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-lg line-clamp-2 leading-tight">{game.name}</CardTitle>
                        </div>
                        <CardDescription>{game.genre} • {game.region}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 flex-1">
                        <p className="text-xs text-muted-foreground line-clamp-2">{game.description}</p>
                      </CardContent>
                      <CardContent className="p-4 pt-0 flex items-center justify-between">
                        <div className="text-xl font-bold text-primary">
                          {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(game.priceRub)}
                        </div>
                        {game.popular && <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Хит</Badge>}
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full" onClick={() => setBuyGame(game)}>Купить</Button>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Игры не найдены.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BuyGameDialog game={buyGame} open={!!buyGame} onClose={() => setBuyGame(null)} />
    </Layout>
  );
}
