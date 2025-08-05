import React from "react";
// import SideMenu from "./side-menu";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import AdminSideMenu from "./admin-side-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Sidebar() {
  return (
    <div className="!p-6 h-full flex flex-col justify-between">
      <div className="">
        <h1 className="text-2xl font-bold text-center">HomeFood</h1>
        <div className="" suppressHydrationWarning>
          <AdminSideMenu />
        </div>
      </div>
      <div className="w-full">
        <div className="bg-secondary hover:bg-zinc-900/10 w-full flex flex-row justify-between items-center p-2! rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://avatar.iran.liara.run/public" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            Admin
          </div>
          <Button variant="ghost" className="text-destructive">
            <LogOutIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
