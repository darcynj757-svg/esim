import { Layout } from "@/components/layout";
import { useListGiftCards, useListGiftCardCategories } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, ShoppingCart, Monitor, Gamepad2, Cloud, Video, Shield } from "lucide-react";
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
