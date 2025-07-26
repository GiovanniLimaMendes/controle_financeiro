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
  BanknoteArrowDown,
  BanknoteArrowUp,
  ReceiptText,
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

export default function Home() {
  return (
    <div className="w-full">
      <header className="flex justify-between items-center pb-2">
        <h1 className="text-xl font-semibold text-gray-700">
          Olá, <span className="text-blue-500">@user</span>. Seja Bem-vindo!
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex border-2 border-primary p-2 rounded-md text-primary hover:bg-primary hover:text-white gap-2 cursor-pointer">
            <User2 /> Usuário
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Conta</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Separator />
      <div>
        <h1 className="mt-5 text-xl font-semibold text-gray-700">
          Visão Geral
        </h1>
        <nav className="flex gap-5">
          <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
            <ReceiptText size={35} />
            <span>Extrato</span>
          </a>
          <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
            <BanknoteArrowUp size={35} />
            <span>Entrada</span>
          </a>
          <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
            <BanknoteArrowDown size={35} />
            <span>Saída</span>
          </a>
        </nav>
        <div className="flex gap-5 mt-5">
          <div className="bg-white border-l-4 border-green-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Saldo</CardTitle>
            <CardTitle className=" text-lg">R$ @saldo</CardTitle>
          </div>
          <div className="bg-white border-l-4 border-red-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Gastos</CardTitle>
            <CardTitle className=" text-lg">R$ @gastos</CardTitle>
          </div>
          <div className="bg-white border-l-4 border-blue-500 shadow-md p-4 rounded w-full">
            <CardTitle className=" text-lg">Restante</CardTitle>
            <CardTitle className=" text-lg">R$ @restante</CardTitle>
          </div>
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <ChartBarLabel />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Resumo 2025:</CardTitle>
            <CardDescription>Resumo financeiro do ano de 2025</CardDescription>
            <CardAction><Wallet/></CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-top border-l-4 border-green-500 pl-2">
                <CardTitle>Total Saldo:</CardTitle>
                <CardTitle>R$ @saldo</CardTitle>
              </div>
              <div className="flex gap-2 items-top border-l-4 border-transparent pl-2">
                <CardTitle>Média saldo mensal:</CardTitle>
                <CardTitle>R$ @media_saldo</CardTitle>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-top border-l-4 border-red-500 pl-2">
                <CardTitle>Total Gastos:</CardTitle>
                <CardTitle>R$ @gastos</CardTitle>
              </div>
              <div className="flex gap-2 items-top border-l-4 border-transparent pl-2">
                <CardTitle>Média gastos mensal:</CardTitle>
                <CardTitle>R$ @media_gastos</CardTitle>
              </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-top border-l-4 border-blue-500 pl-2">
              <CardTitle>Total Restante:</CardTitle>
              <CardTitle>R$ @restante</CardTitle>
            </div>
            <div className="flex gap-2 items-top border-l-4 border-transparent pl-2">
              <CardTitle>Média restante mensal:</CardTitle>
              <CardTitle>R$ @media_restante</CardTitle>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div></div>
    </div>
  );
}
