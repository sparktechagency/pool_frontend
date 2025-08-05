import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem, // Add this import for menu items
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="lg:h-[80dvh] my-6! px-2! lg:px-8!">
      <div className="w-full h-full grid lg:grid-cols-7 gap-6">
        <div className="h-full lg:col-span-2 border rounded-lg bg-accent-foreground/5">
          <div className="!p-4">
            <h3 className="text-2xl mb-3!">Chats</h3>
            <Input
              placeholder="Search"
              className="bg-background rounded-full"
            />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              className="flex flex-row justify-start items-center gap-6 !px-6 !py-3 border-b"
              key={i}
            >
              <Avatar className="!size-12">
                <AvatarImage src="https://avatar.iran.liara.run/public" />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex items-center justify-between w-full ">
                  <h4 className="text-base font-bold">Json</h4>
                  <p className="text-xs text-muted-foreground">8:29 AM</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-primary font-bold">
                    Sent a message
                  </p>
                  <div className="size-4 rounded-full text-xs bg-accent-foreground text-background flex justify-center items-center">
                    3
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-dvh lg:h-full lg:col-span-5 border rounded-lg flex flex-col justify-between items-start bg-accent-foreground/5">
          <div className="flex flex-row justify-start items-center gap-3 !px-4 !py-3 border-b w-full">
            <Avatar className="!size-12">
              <AvatarImage src="https://avatar.iran.liara.run/public" />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <h4 className="text-base font-bold">Katie</h4>
              <div
                className="w-full text-sm text-green-500 font-bold flex flex-row items-center gap-2"
                suppressHydrationWarning
              >
                <div className="size-3 rounded-full  bg-green-500" /> online
              </div>
            </div>
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <EllipsisVerticalIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  {/* You can add your menu items here */}
                  <DropdownMenuItem variant="destructive">
                    <Trash2Icon /> Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className=""></div>
          <div className="flex flex-row justify-between w-full !p-6 gap-6">
            <Input className="bg-background" placeholder="Aa" />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
