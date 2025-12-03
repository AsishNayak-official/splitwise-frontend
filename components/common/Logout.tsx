import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux.hooks";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { clearAuth } from "@/redux/actions/authSlice";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  id: string;
  name: string;
  email: string;
  exp: number;
}

const Logout = () => {
  const currUser = useAppSelector((state) => state.auth.user);
  const [displayName, setDisplayName] = useState(currUser?.name || "");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        localStorage.clear();
        dispatch(clearAuth());
        router.replace("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  useEffect(() => {
    // Priority 1: If Redux has user name → use it
    if (currUser?.name) {
      return;
    }

    // Priority 2: Decode token from localStorage
    const token = localStorage.getItem("AccessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (decoded?.name) setDisplayName(decoded.name);
      } catch (err) {
        console.error("Token decode failed:", err);
      }
    }
  }, [currUser]);
  return (
    <div className="flex flex-row items-center gap-x-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-row justify-between items-center w-full">
        <span className="leading-tight">{displayName}</span>
        <LogOut onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Logout;
