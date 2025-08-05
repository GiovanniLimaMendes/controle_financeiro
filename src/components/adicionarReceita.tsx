"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BanknoteArrowDown, BanknoteArrowUp, CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import React from "react";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AdicionarReceita() {
  const [date, setDate] = React.useState<Date>();
  const [valor, setValor] = useState("0,00");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [descricao, setDescricao] = useState("");
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  function formatarValor(v: string) {
    const apenasNumeros = v.replace(/\D/g, ""); // Remove não dígitos
    const valorComZero = apenasNumeros.padStart(3, "0");
    const parteInteira = valorComZero.slice(0, -2);
    const parteDecimal = valorComZero.slice(-2);
    const parteInteiraFormatada = Number(parteInteira).toLocaleString("pt-BR");
    return `${parteInteiraFormatada},${parteDecimal}`;
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valorFormatado = formatarValor(e.target.value);
    setValor(valorFormatado);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ⛔ impede o envio tradicional que redireciona

    const payload = {
      valor: parseFloat(valor.replace(/\./g, "").replace(",", ".")), // converte string formatada para número decimal
      categoria: categoriaSelecionada,
      data: date ? date.toISOString().split("T")[0] : null, // formata para "YYYY-MM-DD"
      descricao: descricao, // você terá que adicionar um estado para descrição
      tipo: "entrada",
    };

    try {
      const res = await fetch("/api/transacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const erro = await res.json();
        setAlert({
          type: "error",
          message: erro?.mensagem || "Erro ao registrar saída.",
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }

      setAlert({
        type: "success",
        message: "Entrada registrada com sucesso!",
      });
      setTimeout(() => setAlert(null), 5000);

      // (opcional) Limpar campos após sucesso
      setValor("0,00");
      setCategoriaSelecionada("");
      setDate(undefined);
      setDescricao("");
    } catch (error) {
      setAlert({
        type: "error",
        message: "Erro inesperado. Tente novamente.",
      });
    }

    // Tratar resposta...
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="flex flex-col bg-white border-b-4 border-blue-500 shadow-lg p-3 rounded mt-5 items-center cursor-pointer max-w-20 min-w-20 max-h-22 hover:bg-gray-100">
          <BanknoteArrowUp size={35} />
          <span>Entrada</span>
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar nova receita</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-3" id="form-entrada">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                name="valor"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={`R$ ${valor}`}
                onChange={handleValorChange}
                className="w-full"
              />
              <input
                type="hidden"
                name="valor"
                value={valor.replace(/\./g, "").replace(",", ".")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={categoriaSelecionada}
                onValueChange={setCategoriaSelecionada}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario">Salário</SelectItem>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="reembolso">Reembolso</SelectItem>
                  <SelectItem value="investimento">Investimento</SelectItem>
                  <SelectItem value="presente">Presente</SelectItem>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="categoria"
                value={categoriaSelecionada}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="data">Data da entrada</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <input
                  type="hidden"
                  name="data"
                  value={date.toISOString().split("T")[0]}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                placeholder="Ex: Entrada referente à venda de produto XPTO no dia X."
                className="w-full resize-none"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button type="submit" form="form-entrada">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* ALERTA DE ERRO OU SUCESSO */}
      {alert && (
        <div
          className={`fixed bottom-4 right-4 z-500 w-[300px] bg-white border-l-4 rounded ${
            alert.type === "error" ? "border-red-500" : "border-green-500"
          }`}
        >
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
    </Dialog>
  );
}
