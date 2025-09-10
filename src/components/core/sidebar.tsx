import React from "react";
// import SideMenu from "./side-menu";
import AdminSideMenu from "./admin-side-menu";

import Image from "next/image";
import AdminUser from "../ui/admin-user";
import LogooutButton from "./logoutButton";

export default function Sidebar() {
  return (
    <div className="!p-6 h-full flex flex-col justify-between">
      <div className="">
        <h1 className="text-2xl font-bold text-center">
          <Image
            src={"/icon.png"}
            height={200}
            width={200}
            alt="icon"
            className="aspect-video h-18 object-contain border rounded-lg shadow-inner w-full"
          />
        </h1>
        <div className="" suppressHydrationWarning>
          <AdminSideMenu />
        </div>
      </div>
      <div className="w-full">
        <div className="bg-secondary hover:bg-zinc-900/10 w-full flex flex-row justify-between items-center p-2! rounded-lg transition-colors">
          <AdminUser />
          <LogooutButton />
        </div>
      </div>
    </div>
  );
}
