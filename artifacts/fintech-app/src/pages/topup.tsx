import { Layout } from "@/components/layout";
import { useListGameServices, useTopupGameService } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SiSteam, SiPlaystation } from "react-icons/si";
import { Monitor } from "lucide-react";

export default function Topup() {
  const { data: services, isLoading } = useListGameServices();
  const topupMutation = useTopupGameService();
  const { toast } = useToast();
  
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const activeService = services?.find(s => s.id === selectedService);

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    topupMutation.mutate({ 
      data: { 
        accountId: activeService?.requiresAccountId ? accountId : undefined,
        amount
      } 
    }, {
      onSuccess: () => {
        toast({ title: "Успешно!", description: "Заявка на пополнение создана" });
        setIsOpen(false);
      },
      onError: () => {
        toast({ title: "Ошибка", description: "Не удалось выполнить пополнение", variant: "destructive" });
      }
    });
  };

  const openDialog = (id: number) => {
    setSelectedService(id);
    setAccountId("");
    setAmount(0);
    setIsOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Пополнение игровых аккаунтов</h1>
        <p className="text-muted-foreground mb-8">Прямое пополнение Steam, PSN и других платформ</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            services?.map(service => (
              <Card key={service.id} className="cursor-pointer hover:bg-muted/50 transition-colors border-border/50" onClick={() => openDialog(service.id)}>
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary shrink-0">
                    {service.name.toLowerCase().includes('steam') ? <SiSteam /> : 
                     service.name.toLowerCase().includes('playstation') ? <SiPlaystation /> :
                     service.name.toLowerCase().includes('xbox') ? <Monitor /> : 
                     service.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{service.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Пополнение {activeService?.name}</DialogTitle>
              <DialogDescription>
                {activeService?.requiresAccountId ? "Введите логин и выберите сумму пополнения" : "Выберите сумму пополнения"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleTopup} className="space-y-6 pt-4">
              {activeService?.requiresAccountId && (
                <div className="space-y-2">
                  <Label htmlFor="accountId">Логин аккаунта</Label>
                  <Input 
                    id="accountId" 
                    value={accountId} 
                    onChange={e => setAccountId(e.target.value)} 
                    required 
                    placeholder="Например: player123"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <Label>Выберите сумму</Label>
                <div className="grid grid-cols-3 gap-2">
                  {activeService?.amounts.map(amt => (
                    <Button
                      key={amt}
                      type="button"
                      variant={amount === amt ? "default" : "outline"}
                      onClick={() => setAmount(amt)}
                      className="w-full"
                    >
                      {amt} ₽
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-xs text-muted-foreground uppercase">Или введите свою</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <Input 
                  type="number" 
                  value={amount || ''} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  placeholder="Сумма в рублях" 
                  min="100" 
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={!amount || (activeService?.requiresAccountId && !accountId) || topupMutation.isPending}>
                {topupMutation.isPending ? "Обработка..." : "Оплатить"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
