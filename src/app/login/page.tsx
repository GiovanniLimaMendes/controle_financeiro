"use client";

import { useState } from "react";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          type: "error",
          message: data.erro || "Erro ao fazer login",
        });
        setTimeout(() => setAlert(null), 5000);
      } else {
        setAlert({ type: "success", message: "Login realizado com sucesso!" });

        // Oculta o alerta depois de 3 segundos (opcional)
        setTimeout(() => {
          setAlert(null);
          router.push("/"); // 🔁 Redirecionamento
        }, 1500);

        // Aqui você pode redirecionar ou salvar sessão/cookie
      }
    } catch {
      setAlert({ type: "error", message: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>Informe seu e-mail para continuar</CardDescription>
          <CardAction>
            <Link href="/cadastro" passHref>
              <Button variant="link">Cadastre-se</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* ALERTA DE ERRO OU SUCESSO */}
          {alert && (
            <div className="fixed bottom-4 right-4 z-50 w-[300px] bg-white border-l-4 {alert.type === 'error' ? 'border-red-500' : 'border-green-500'}">
              <Alert
                variant={alert.type === "error" ? "destructive" : "default"}
                className="mb-4 border-none"
              >
                <AlertTitle>
                  {alert.type === "error" ? "Erro" : "Sucesso"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-5" disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
