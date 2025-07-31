import { db } from '@/app/database/db.js';

export async function GET() {
  try {
    const [results] = await db.query('SELECT * FROM transacoes');
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ erro: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
