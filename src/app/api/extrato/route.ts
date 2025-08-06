import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const usuario_id = cookieStore.get("usuario_id")?.value;

    if (!usuario_id) {
      return NextResponse.json({ erro: "Usuário não autenticado" }, { status: 401 });
    }

    // Query params
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get("tipo"); // entrada | saida
    const mes = searchParams.get("mes"); // ex: 2025-08
    const categoria = searchParams.get("categoria");
    const pagina = Number(searchParams.get("pagina") || "1");
    const limite = Number(searchParams.get("limite") || "10");
    const offset = (pagina - 1) * limite;

    // Ordenação
    const colunasValidas = ["id", "data", "valor", "categoria"];
    const ordenarPorRaw = searchParams.get("ordenarPor") || "data";
    const ordenarPor = colunasValidas.includes(ordenarPorRaw) ? ordenarPorRaw : "data";

    const ordemRaw = searchParams.get("ordem")?.toUpperCase();
    const ordem = ordemRaw === "ASC" ? "ASC" : "DESC"; // default: DESC

    // Montar SQL dinâmico com filtros
    let sql = "SELECT id, tipo, valor, categoria, descricao, data FROM transacoes WHERE usuario_id = ?";
    const params: any[] = [usuario_id];

    if (tipo) {
      sql += " AND tipo = ?";
      params.push(tipo);
    }

    if (mes) {
      sql += " AND DATE_FORMAT(data, '%Y-%m') = ?";
      params.push(mes);
    }

    if (categoria) {
      sql += " AND categoria = ?";
      params.push(categoria);
    }

    sql += ` ORDER BY ${ordenarPor} ${ordem} LIMIT ? OFFSET ?`;
    params.push(limite, offset);

    const [rows] = await db.query(sql, params);

    return NextResponse.json({ transacoes: rows }, { status: 200 });

  } catch (erro) {
    console.error("Erro ao buscar extrato:", erro);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
