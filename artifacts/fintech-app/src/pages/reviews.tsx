import { Layout } from "@/components/layout";
import { useListReviews, useCreateReview } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { data: reviews, refetch } = useListReviews();
  const createReview = useCreateReview();
  const { toast } = useToast();

  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);

  const avgRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview.mutate(
      { data: { userName, rating, text } },
      {
        onSuccess: () => {
          toast({ title: "Спасибо за отзыв!", description: "Ваш отзыв успешно опубликован." });
          setUserName("");
          setText("");
          setRating(5);
          refetch();
        },
      }
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-16 pb-20 border-b">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[30rem] w-[30rem] bg-yellow-400/10 blur-3xl rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm font-semibold text-yellow-500 mb-6">
            <Star className="h-4 w-4 fill-current" />
            Рейтинг {avgRating} из 5
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Отзывы наших клиентов
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Более {reviews?.length ?? "0"} довольных пользователей доверяют ЮниКард
          </p>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-5">
            {!reviews || reviews.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground border rounded-xl bg-muted/20">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
                Отзывов пока нет — будьте первым!
              </div>
            ) : (
              reviews.map((review: any) => (
                <Card key={review.id} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 text-lg">
                        {review.userName[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <span className="font-semibold">{review.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(review.createdAt), "d MMMM yyyy", { locale: ru })}
                          </span>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Write review */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-5">Оставить отзыв</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Ваше имя</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Оценка</Label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className="transition-transform hover:scale-110"
                          onMouseEnter={() => setHovered(i + 1)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRating(i + 1)}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              i < (hovered || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text">Ваш отзыв</Label>
                    <Textarea
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={4}
                      placeholder="Расскажите о своём опыте..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createReview.isPending}>
                    {createReview.isPending ? "Отправка..." : "Опубликовать отзыв"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
