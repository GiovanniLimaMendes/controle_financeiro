// src/app/layout.tsx (Server)
import { cookies } from "next/headers";
import AppLayoutClient from "./AppLayoutClient";
import "./globals.css";

export const metadata = {
  title: "Home",
  description: "Controle financeiro",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get('usuario_nome')?.value || "Usuário";

  return (
    <html lang="pt-BR">
      <body>
        <AppLayoutClient userName={usuario_nome}>{children}</AppLayoutClient>
      </body>
    </html>
  );
}
