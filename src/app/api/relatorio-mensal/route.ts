import { db } from "@/app/database/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json({ erro: "Usuário não autenticado" }, { status: 401 });
    }

    const [rows] = await db.query<any[]>(`
      SELECT
        MONTH(data) AS mes,
        SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) AS entrada,
        SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) AS gastos
      FROM transacoes
      WHERE usuario_id = ?
      GROUP BY MONTH(data)
      ORDER BY mes;
    `, [usuarioId]);

    // Mapeia os dados para incluir o campo "restante"
    const dados = Array.from({ length: 12 }, (_, i) => {
      const item = rows.find(r => r.mes === i + 1);
      const entrada = item?.entrada || 0;
      const gastos = item?.gastos || 0;
      const saldo = entrada - gastos;
      return {
        month: new Date(0, i).toLocaleString("pt-BR", { month: "long" }),
        entrada,
        gastos,
        saldo,
      };
    });

    return NextResponse.json(dados);
  } catch (error: any) {
    return NextResponse.json({ erro: error.message || "Erro interno" }, { status: 500 });
  }
}
