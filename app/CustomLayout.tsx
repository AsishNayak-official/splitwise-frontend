"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux.hooks";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth, updateAuth } from "@/redux/actions/authSlice";
import { getCurrentUser } from "@/api/authApi";
import { addCurrentUser } from "@/redux/actions/friendSlice";
import Logout from "@/components/common/Logout";

const CustomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const isLoginPage = pathname === "/login";

  const [checkingAuth, setCheckingAuth] = useState(false);
  const [authCheckedOnce, setAuthCheckedOnce] = useState(false);

  useEffect(() => {
    if (isLoginPage) return; // no auth check on login
    if (authCheckedOnce) return;

    const checkAuth = async () => {
      setCheckingAuth(true);
      try {
        const data = await getCurrentUser();
        if (data) {
          dispatch(
            updateAuth({
              id: data._id,
              email: data.email,
              name: data.name,
              upiId: data.upiId,
            })
          );
          dispatch(
            addCurrentUser({
              id: data?._id ?? "",
              name: data?.name ?? "",
            })
          );
        } else {
          dispatch(clearAuth());
          router.replace("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        dispatch(clearAuth());
        router.replace("/login");
      } finally {
        setCheckingAuth(false);
        setAuthCheckedOnce(true);
      }
    };

    checkAuth();
  }, [isLoginPage, authCheckedOnce, dispatch, router]);


  if (isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    );
  }

  if (!authCheckedOnce && checkingAuth && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-slate-500">Loading...</span>
      </div>
    );
  }

  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default CustomLayout;
