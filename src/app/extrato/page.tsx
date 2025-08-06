// app/extrato/page.tsx ou onde estiver esse componente
import { BotaoLogout } from "@/components/botaoLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User2 } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Transacao = {
  id: number;
  tipo: string;
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
};

export default async function Extrato() {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get("usuario_nome")?.value || "Usuário";
  const usuario_id = cookieStore.get("usuario_id")?.value;

  if (!usuario_id) {
    return redirect("/login");
  }

  // Buscar as transações do extrato
  const res = await fetch("http://localhost:3000/api/extrato", {
    // 🔒 Importante para passar o cookie na requisição server-side
    headers: {
      Cookie: `usuario_id=${usuario_id}`,
    },
    cache: "no-store", // garantir dados atualizados
  });

  const data = await res.json();
  const transacoes: Transacao[] = data.transacoes || [];

  return (
    <div className="w-full">
      <header className="flex justify-between items-center pb-2">
        <h1 className="text-xl font-semibold text-gray-700">Extrato</h1>
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
      <div className="mt-5">
        <Table>
          <TableCaption>Lista de suas transações recentes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor (R$)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              transacoes.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.id}</TableCell>
                  <TableCell>{t.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                  <TableCell>{t.categoria}</TableCell>
                  <TableCell>{t.descricao || "-"}</TableCell>
                  <TableCell className="text-right">
                    R$ {Number(t.valor).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
