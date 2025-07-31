import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronUp,
  Home,
  ReceiptText,
  Target,
  User2,
} from "lucide-react";
import { SidebarFooter, useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Menu",
    url: "#",
    icon: Home,
  },
  {
    title: "Extrato",
    url: "#",
    icon: ReceiptText,
  },
  {
    title: "Entrada",
    url: "#",
    icon: BanknoteArrowUp,
  },
  {
    title: "Saída",
    url: "#",
    icon: BanknoteArrowDown,
  },
  {
    title: "Metas",
    url: "#",
    icon: Target,
  },
];

type AppSidebarProps = {
  userName: string;
};

export function AppSidebar({userName}: AppSidebarProps) {

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Conta</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
