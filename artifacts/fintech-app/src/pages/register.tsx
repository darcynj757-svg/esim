import { Layout } from "@/components/layout";
import { useState } from "react";
import { useRegister } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ data: { name, email, password } }, {
      onSuccess: (data) => {
        localStorage.setItem("fintech_token", data.token);
        setLocation("/account");
      },
      onError: () => {
        toast({
          title: "Ошибка регистрации",
          description: "Проверьте введенные данные",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-24 px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Создать аккаунт</CardTitle>
            <CardDescription>Присоединяйтесь к ЮниКард</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Уже есть аккаунт? <Link href="/login" className="text-primary hover:underline">Войти</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
