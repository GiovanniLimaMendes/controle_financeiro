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
import { BanknoteArrowDown, BanknoteArrowUp, ReceiptText, User2 } from "lucide-react";
import { ChartBarLabel } from "./chart-bar-label";

export default function Home() {
  return (
    <div className="w-full">
      <header className="flex justify-between items-center pb-2">
        <h1 className="text-xl">
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
        <h1 className="mt-5 text-xl">Visão Geral</h1>
        <div className="flex gap-5 mt-5">
          <div className="bg-white border-l-4 border-green-500 shadow-md p-4 rounded min-w-[200px]">
            <h3 className=" text-lg">Saldo</h3>
            <h3 className=" text-lg">R$ @saldo</h3>
          </div>
          <div className="bg-white border-l-4 border-red-500 shadow-md p-4 rounded min-w-[200px]">
            <h3 className=" text-lg">Gastos</h3>
            <h3 className=" text-lg">R$ @gastos</h3>
          </div>
          <div className="bg-white border-l-4 border-blue-500 shadow-md p-4 rounded min-w-[200px]">
            <h3 className=" text-lg">Restante</h3>
            <h3 className=" text-lg">R$ @restante</h3>
          </div>
        </div>
      </div>
      <nav className="flex gap-10">
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
        <ChartBarLabel/>
      </nav>
      <div>
      </div>
    </div>
  );
}
