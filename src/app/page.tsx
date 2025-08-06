import "@/app/globals.css";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ReceiptText,
  Target,
  User2,
  Wallet,
} from "lucide-react";
import { ChartBarLabel } from "./chart-bar-label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cookies } from "next/headers";
import { getFinanceiroPorUsuario } from "./api/financeiro/route";
import { AdicionarReceita } from "@/components/adicionarReceita";
import { AdicionarSaida } from "@/components/adicionarSaida";
import { BotaoLogout } from "@/components/botaoLogout";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get("usuario_nome")?.value || "Usuário";
  const usuario_id = cookieStore.get("usuario_id")?.value;

  if (!usuario_id) {
    return redirect("/login");
  }

  const data = await getFinanceiroPorUsuario(usuario_id);

  const saldo = Number(data.saldo) || 0;
  const entradas = Number(data.entradas) || 0;
  const saidas = Number(data.saidas) || 0;

  return (
    <div className="w-full">
      <header className="flex justify-between items-center pb-2">
        <h1 className="text-xl font-semibold text-gray-700">
          Olá, <span className="text-blue-500">{usuario_nome}</span>. Seja
          Bem-vindo!
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex border-2 border-primary p-2 rounded-md text-primary hover:bg-primary hover:text-white gap-2 cursor-pointer">
            <User2 /> {usuario_nome}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Conta</DropdownMenuItem>
            <BotaoLogout/>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Separator />
      <div>
        <h1 className="mt-5 text-xl font-semibold text-gray-700">
          Visão Geral
        </h1>
        <nav className="flex gap-5 box-border">
          <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
            <ReceiptText size={35} />
            <span>Extrato</span>
          </a>
          <AdicionarReceita/>
          <AdicionarSaida/>
          <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
            <Target size={35} />
            <span>Metas</span>
          </a>
        </nav>
        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:justify-end">
          <div className="bg-white border-l-4 border-green-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Saldo</CardTitle>
            <CardTitle className=" text-lg">{saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</CardTitle>
          </div>
          <div className="bg-white border-l-4 border-red-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Saídas</CardTitle>
            <CardTitle className=" text-lg">{saidas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</CardTitle>
          </div>
          <div className="bg-white border-l-4 border-blue-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Entradas</CardTitle>
            <CardTitle className=" text-lg">{entradas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</CardTitle>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-5 sm:flex-row sm:justify-end">
        <ChartBarLabel />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Painel Financeiro:</CardTitle>
            <CardDescription>Resumo financeiro do ano de 2025</CardDescription>
            <CardAction>
              <Wallet />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Card className="p-3 flex flex-row gap-3 items-center cursor-pointer hover:bg-secondary">
              <Target size={35} />
              <div className="flex flex-col w-full">
                <CardTitle className="text-base">Meta: R$@meta</CardTitle>
                <Progress className="mt-2" value={50} />
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>
      <div></div>
    </div>
  );
}
