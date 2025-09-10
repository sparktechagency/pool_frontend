"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function LogoutButton() {
  const [, , removeCookie] = useCookies(["adminGhost"]);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    removeCookie("adminGhost");
    router.push("/admin/login");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-destructive">
          <LogOutIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
