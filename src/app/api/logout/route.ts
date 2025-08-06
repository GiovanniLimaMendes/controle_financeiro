import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Remove os cookies
  cookieStore.set("usuario_id", "", { maxAge: 0 });
  cookieStore.set("usuario_nome", "", { maxAge: 0 });
  cookieStore.set("usuario_email", "", { maxAge: 0 });

  return NextResponse.json({ sucesso: true });
}
