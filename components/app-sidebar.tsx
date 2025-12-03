import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import { fetchFriends } from "@/api/friendsApi";
import { fetchGroups } from "@/api/groupApi";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { BASE_SIDEBAR_MENU } from "@/lib/config/sidebar.config";
import { IFriendDetails } from "@/lib/types/friend.types";
import { IGroup } from "@/lib/types/group.types";
import { setFriends } from "@/redux/actions/friendSlice";
import { setGroups as setGroupsAction } from "@/redux/actions/groupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux.hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Logout from "./common/Logout";

let groupsCache: IGroup[] | null = null;
let friendsCache: IFriendDetails[] | null = null;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const groups = useAppSelector((state) => state.group.groups);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (groupsCache) {
      dispatch(setGroupsAction(groupsCache));
      return;
    }

    const loadGroups = async () => {
      try {
        setLoadingGroups(true);
        const data = await fetchGroups();
        dispatch(setGroupsAction(data));
        groupsCache = data;
      } catch (err) {
        console.error("Failed to load groups:", err);
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    if (friendsCache) {
      dispatch(setFriends(friendsCache));
      return;
    }

    const loadFriends = async () => {
      try {
        const data = await fetchFriends();
        dispatch(setFriends(data));
        friendsCache = data;
      } catch (err) {
        console.error("Failed to load groups:", err);
      }
    };

    loadFriends();
  }, []);

  const menu = useMemo(() => {
    return BASE_SIDEBAR_MENU.map((section) => {
      if (section.title !== "Groups") return section;

      const items =
        groups?.map((g) => ({
          title: g.name,
          url: `/group/${g._id}`,
          isActive: pathname === `/group/${g._id}`,
        })) ?? [];

      return {
        ...section,
        items,
      };
    });
  }, [groups, pathname]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Contri</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map((section) => {
              const isSectionActive =
                pathname === section.url ||
                (section.title === "Groups" && pathname.startsWith("/groups"));

              return (
                <SidebarMenuItem key={section.title}>
                  <SidebarMenuButton asChild isActive={isSectionActive}>
                    <Link href={section.url} className="font-medium">
                      {section.title}
                    </Link>
                  </SidebarMenuButton>

                  {/* Submenu for Groups (dynamic) */}
                  {section.title === "Groups" && (
                    <>
                      {loadingGroups && (
                        <div className="px-3 py-1 text-xs text-muted-foreground">
                          Loading groups…
                        </div>
                      )}

                      {!loadingGroups &&
                        section.items &&
                        section.items.length > 0 && (
                          <SidebarMenuSub>
                            {section.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={subItem.isActive}
                                >
                                  <Link href={subItem.url}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}

                      {!loadingGroups &&
                        section.items &&
                        section.items.length === 0 && (
                          <div className="px-3 py-1 text-xs text-muted-foreground">
                            No groups yet.
                          </div>
                        )}
                    </>
                  )}

                  {/* For non-Groups sections that don’t have submenu items */}
                  {section.title !== "Groups" && section.items?.length ? (
                    <SidebarMenuSub>
                      {section.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter className="bg-slate-200 rounded-2xl mx-2 my-1">
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}
