import { db } from "@/app/database/db";

export async function getFinanceiroPorUsuario(usuario_id: string) {
  const [entradasRows] = await db.query(
    "SELECT SUM(valor) as total FROM transacoes WHERE usuario_id = ? AND tipo = 'entrada'",
    [usuario_id]
  );
  const [saidasRows] = await db.query(
    "SELECT SUM(valor) as total FROM transacoes WHERE usuario_id = ? AND tipo = 'saida'",
    [usuario_id]
  );

  const entradas = (entradasRows as any)[0].total || 0;
  const saidas = (saidasRows as any)[0].total || 0;
  const saldo = entradas - saidas;

  return { saldo, entradas, saidas };
}
