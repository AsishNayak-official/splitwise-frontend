// src/config/sidebarMenu.ts

export interface SidebarItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface SidebarSection {
  title: string;
  url: string;
  items?: SidebarItem[];
}

export const BASE_SIDEBAR_MENU: SidebarSection[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Groups",
    url: "#", // children will be dynamic
    items: [], // will be filled in component
  },
  {
    title: "Friends",
    url: "/friends",
  },
];
