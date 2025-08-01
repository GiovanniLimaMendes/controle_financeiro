import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db"; // ajuste o caminho conforme seu projeto
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const usuario_id = cookieStore.get("usuario_id")?.value;

    if (!usuario_id) {
      return NextResponse.json({ erro: "Usuário não autenticado" }, { status: 401 });
    }

    // Ler corpo JSON ao invés de formData
    const data = await req.json();

    const valorNumerico = Number(data.valor);
    const categoria = data.categoria;
    const descricao = data.descricao;
    const dataEntrada = data.data; // esperado no formato "YYYY-MM-DD"

    if (
      !valorNumerico ||
      isNaN(valorNumerico) ||
      !categoria ||
      !dataEntrada
    ) {
      return NextResponse.json({ erro: "Dados inválidos ou incompletos" }, { status: 400 });
    }

    // Inserir no banco
    await db.query(
      `INSERT INTO transacoes (usuario_id, tipo, valor, categoria, data, descricao)
       VALUES (?, 'entrada', ?, ?, ?, ?)`,
      [usuario_id, valorNumerico, categoria, dataEntrada, descricao]
    );

    return NextResponse.json({ sucesso: true }, { status: 201 });
  } catch (erro) {
    console.error("Erro ao registrar transação:", erro);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
