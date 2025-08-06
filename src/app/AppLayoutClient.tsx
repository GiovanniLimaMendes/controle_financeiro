// src/components/AppLayoutClient.tsx
'use client';

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

type Props = {
  children: React.ReactNode;
  userName: string;
};

export default function AppLayoutClient({ children, userName }: Props) {
  const pathname = usePathname();
  const showSidebar = !(pathname.startsWith("/login") || pathname.startsWith("/cadastro"));

  return (
    <SidebarProvider defaultOpen={true}>
      {showSidebar && <AppSidebar userName={userName} />}
      <SidebarTrigger className="fixed" />
      <main className="w-full m-[25px]">{children}</main>
    </SidebarProvider>
  );
}
