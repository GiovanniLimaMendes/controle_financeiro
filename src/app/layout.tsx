import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "@/app/globals.css";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  return (
    <html>
      <body>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="w-full p-5">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
