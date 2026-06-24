import { Layout } from "@/components/layout";
import { useListGiftCards, useListGiftCardCategories, useCreateOrder } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Search, ShoppingCart, Monitor, Gamepad2, Cloud, Video, Shield, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  SiSteam, SiPlaystation, SiNetflix, SiSpotify,
  SiApple, SiGoogleplay, SiEpicgames, SiTwitch, SiDiscord, SiAirbnb,
  SiBookingdotcom, SiYoutube, SiOpenai, SiRoblox,
  SiNotion, SiCoinbase, SiBinance, SiCanva, SiDuolingo, SiHeadspace,
  SiTidal, SiSurfshark, SiParamountplus, SiUber,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;

interface BrandConfig {
  icon: AnyIcon;
  color: string;
  bg: string;
}

const BRAND_MAP: Record<string, BrandConfig> = {
  "Steam":               { icon: SiSteam,        color: "#1b2838", bg: "#c6d4df" },
  "PlayStation Store":   { icon: SiPlaystation,   color: "#003087", bg: "#dce8f7" },
  "Xbox Gift Card":      { icon: Monitor,         color: "#107c10", bg: "#d4f0d4" },
  "Nintendo eShop":      { icon: Gamepad2,        color: "#e4000f", bg: "#ffd9db" },
  "Netflix":             { icon: SiNetflix,       color: "#e50914", bg: "#ffd9db" },
  "Spotify Premium":     { icon: SiSpotify,       color: "#1db954", bg: "#d4f5e2" },
  "Apple App Store":     { icon: SiApple,         color: "#555555", bg: "#e8e8e8" },
  "Google Play":         { icon: SiGoogleplay,    color: "#4285f4", bg: "#dce8ff" },
  "Amazon Gift Card":    { icon: ShoppingCart,    color: "#ff9900", bg: "#fff0d4" },
  "Roblox":              { icon: SiRoblox,        color: "#cc0000", bg: "#ffd9d9" },
  "Epic Games":          { icon: SiEpicgames,     color: "#313131", bg: "#e8e8e8" },
  "Twitch":              { icon: SiTwitch,        color: "#9146ff", bg: "#ead9ff" },
  "Discord Nitro":       { icon: SiDiscord,       color: "#5865f2", bg: "#dce0ff" },
  "Airbnb":              { icon: SiAirbnb,        color: "#ff385c", bg: "#ffd9de" },
  "Booking.com":         { icon: SiBookingdotcom, color: "#003580", bg: "#d4dff5" },
  "Adobe Creative Cloud":{ icon: Video,           color: "#ff0000", bg: "#ffd9d9" },
  "Notion":              { icon: SiNotion,        color: "#000000", bg: "#e8e8e8" },
  "ChatGPT Plus":        { icon: SiOpenai,        color: "#412991", bg: "#e4d9f5" },
  "Uber Gift Card":      { icon: SiUber,          color: "#000000", bg: "#e8e8e8" },
  "iTunes":              { icon: SiApple,         color: "#555555", bg: "#e8e8e8" },
  "YouTube Premium":     { icon: SiYoutube,       color: "#ff0000", bg: "#ffd9d9" },
  "Coinbase":            { icon: SiCoinbase,      color: "#0052ff", bg: "#d9e5ff" },
  "Binance":             { icon: SiBinance,       color: "#f3ba2f", bg: "#fdf3d4" },
  "Canva Pro":           { icon: SiCanva,         color: "#00c4cc", bg: "#d4f8f9" },
  "Duolingo Plus":       { icon: SiDuolingo,      color: "#58cc02", bg: "#ddf5d4" },
  "Headspace":           { icon: SiHeadspace,     color: "#f47d31", bg: "#fde8d9" },
  "Tidal":               { icon: SiTidal,         color: "#000000", bg: "#e8e8e8" },
  "Surfshark VPN":       { icon: SiSurfshark,     color: "#1a1f71", bg: "#d4d9f5" },
  "Paramount+":          { icon: SiParamountplus, color: "#0064ff", bg: "#d9e5ff" },
  "Hulu":                { icon: Video,           color: "#1ce783", bg: "#d4f9e8" },
  "iCloud+":             { icon: Cloud,           color: "#555555", bg: "#e8e8e8" },
  "NordVPN":             { icon: Shield,          color: "#4687ff", bg: "#d9e5ff" },
  "ExpressVPN":          { icon: Shield,          color: "#da3940", bg: "#ffd9da" },
  "DoorDash":            { icon: ShoppingCart,    color: "#ff3008", bg: "#ffd9d9" },
  "Razer Gold":          { icon: Gamepad2,        color: "#44d62c", bg: "#d4f9d4" },
};

function BrandCard({ name }: { name: string }) {
  const brand = BRAND_MAP[name];
  if (brand) {
    const Icon = brand.icon as AnyIcon;
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${brand.bg}33, ${brand.bg}88)` }}
      >
        <Icon style={{ color: brand.color }} className="w-16 h-16 opacity-90" />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/40">
      <span className="text-5xl font-extrabold opacity-20">{name[0]}</span>
    </div>
  );
}

interface GiftCardItem {
  id: number;
  name: string;
  category: string;
  country: string;
  countryFlag: string;
  priceRub: number;
  popular: boolean;
  denominations: number[];
}

function BuyDialog({
  card,
  open,
  onClose,
}: {
  card: GiftCardItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  if (!card) return null;

  const denoms = card.denominations ?? [];

  const handleBuy = () => {
    if (!selected) return;
    createOrder.mutate(
      { data: { productId: card.id, productType: "giftcard", amount: selected, details: { name: card.name, country: card.country } } },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: () => {
          toast({ title: "Ошибка", description: "Не удалось оформить заказ", variant: "destructive" });
        },
      }
    );
  };

  const handleClose = () => {
    setSelected(null);
    setSuccess(false);
    onClose();
  };

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
              Gift-карта <strong>{card.name}</strong> на{" "}
              {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(selected!)} успешно приобретена.
              Код будет в разделе «Мои заказы».
            </p>
            <Button className="w-full mt-2" onClick={handleClose}>Отлично</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Купить {card.name}</DialogTitle>
              <DialogDescription>{card.country} {card.countryFlag}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-sm font-medium mb-3">Выберите номинал</p>
                <div className="grid grid-cols-3 gap-2">
                  {denoms.map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant={selected === d ? "default" : "outline"}
                      onClick={() => setSelected(d)}
                      className="w-full"
                    >
                      {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(d)}
                    </Button>
                  ))}
                </div>
              </div>
              {selected && (
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-sm flex justify-between">
                  <span className="text-muted-foreground">Итого</span>
                  <span className="font-bold text-primary">
                    {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(selected)}
                  </span>
                </div>
              )}
              <Button
                className="w-full"
                disabled={!selected || createOrder.isPending}
                onClick={handleBuy}
              >
                {createOrder.isPending ? "Оформляем..." : "Купить"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function GiftCards() {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [buyCard, setBuyCard] = useState<GiftCardItem | null>(null);

  const { data: categories } = useListGiftCardCategories();
  const { data: giftCards, isLoading } = useListGiftCards({ query: { queryKey: ["giftCards", category, search], enabled: true } });

  const filteredCards = (giftCards as GiftCardItem[] | undefined)?.filter(c => {
    if (category && c.category !== category) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">Каталог Gift-карт</h1>
        <p className="text-muted-foreground mb-8">Коды активации для сотен сервисов по всему миру</p>

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
                    <Skeleton className="h-36 rounded-t-xl" />
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="flex-1"><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-1/2" /></CardContent>
                  </Card>
                ))
              ) : filteredCards?.length ? (
                filteredCards.map(card => (
                  <Card key={card.id} className="flex flex-col hover-elevate transition-all overflow-hidden border-border/50">
                    <div className="h-36 w-full relative overflow-hidden rounded-t-xl">
                      <BrandCard name={card.name} />
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
                        От {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(card.priceRub)}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => setBuyCard(card)}>Купить</Button>
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

      <BuyDialog card={buyCard} open={!!buyCard} onClose={() => setBuyCard(null)} />
    </Layout>
  );
}
