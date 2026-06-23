import { Layout } from "@/components/layout";
import { useListReviews, useCreateReview } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function Reviews() {
  const { data: reviews, refetch } = useListReviews();
  const createReview = useCreateReview();
  const { toast } = useToast();
  
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview.mutate({ data: { userName, rating, text } }, {
      onSuccess: () => {
        toast({ title: "Спасибо за отзыв!", description: "Ваш отзыв успешно опубликован." });
        setUserName("");
        setText("");
        setRating(5);
        refetch();
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Отзывы наших клиентов</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {reviews?.map(review => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {review.userName[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold">{review.userName}</div>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {format(new Date(review.createdAt), 'd MMMM yyyy', { locale: ru })}
                    </div>
                  </div>
                  <p className="text-foreground/90">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="sticky top-24 h-fit">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Оставить отзыв</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Ваше имя</Label>
                    <Input id="userName" value={userName} onChange={e => setUserName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Оценка</Label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`text-2xl ${i < rating ? 'text-yellow-500' : 'text-muted'}`}
                          onClick={() => setRating(i + 1)}
                        >
                          <Star className={i < rating ? 'fill-current' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text">Отзыв</Label>
                    <Textarea id="text" value={text} onChange={e => setText(e.target.value)} rows={4} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={createReview.isPending}>
                    {createReview.isPending ? "Отправка..." : "Опубликовать"}
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
