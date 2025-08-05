"use client";

import {
  BellIcon,
  Clock2Icon,
  MailIcon,
  MapPin,
  User2Icon,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileApi, logoutApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ResponsiveNavbar() {
  const path = usePathname();
  const navig = useRouter();
  const queryClient = useQueryClient();
  const shouldScroll = useRef(false);
  const [scrollTo, setScrollTo] = useState("hiw");
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["ghost"]);

  const { mutate } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      removeCookie("ghost");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navig.push("/");
    },
  });

  const { data, isPending }: AnyType = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(cookies.ghost),
    enabled: !!cookies.ghost,
  });

  // if (!isPending && data) {
  //   console.log(data.data);
  // }

  function scroller(x: string) {
    if (x === "hiw") {
      window.scrollBy({
        top: window.innerHeight * 1,
        behavior: "smooth",
      });
    } else if (x === "fh") {
      window.scrollBy({
        top: window.innerHeight * 1.8,
        behavior: "smooth",
      });
    } else if (x === "fp") {
      window.scrollBy({
        top: window.innerHeight * 2.7,
        behavior: "smooth",
      });
    }
  }

  const handleScroll = (x: string) => {
    setScrollTo(x);
    setIsOpen(false);
    if (path === "/") {
      scroller(x);
    } else {
      shouldScroll.current = true;
      navig.push("/");
    }
  };

  useEffect(() => {
    if (shouldScroll.current && path === "/") {
      scroller(scrollTo);
      shouldScroll.current = false;
    }
  }, [path]);

  const NavigationButtons = () => (
    <>
      <Button variant="ghost" asChild>
        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
      </Button>
      <Button variant="ghost" onClick={() => handleScroll("hiw")}>
        How It Works
      </Button>
      <Button variant="ghost" onClick={() => handleScroll("fh")}>
        For Homeowners
      </Button>
      <Button variant="ghost" onClick={() => handleScroll("fp")}>
        For Providers
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/get-service" onClick={() => setIsOpen(false)}>
          Get Quotes
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/my-orders" onClick={() => setIsOpen(false)}>
          My Orders
        </Link>
      </Button>
    </>
  );

  return (
    <nav className="">
      <div className="py-2! w-full bg-blue-100 px-4! md:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-0">
          <div className="flex gap-1 text-xs md:text-sm items-center justify-center lg:justify-start">
            <MapPin
              className="size-4 md:size-5 flex-shrink-0"
              fill="#33628F"
              stroke="#dbeafe"
            />
            <span className="truncate">8494 Signal Hill Road Manassas, Va</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-xs md:text-sm justify-center">
            <Clock2Icon className="size-4 text-[#33628F] flex-shrink-0" />
            <span>Working Time:</span>
            <span className="text-[#33628F]">
              24 Hour Service - 7 Days a Week
            </span>
          </div>
          <div className="text-[#33628F] text-xs md:text-sm flex items-center gap-2 justify-center lg:justify-end">
            <MailIcon className="size-4 flex-shrink-0" />
            <span className="truncate">info@poolvalet.com</span>
          </div>
        </div>
      </div>

      <div className="py-4! px-4! md:px-8! flex flex-row justify-between items-center">
        <div className="flex-shrink-0">
          <Image
            src="/icon.png"
            height={80}
            width={80}
            className="w-[60px] md:w-[80px] lg:w-[100px]"
            alt="Pool Valet Logo"
          />
        </div>

        <div className="hidden lg:flex gap-2">
          <NavigationButtons />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="relative">
                <BellIcon className="h-4 w-4 md:h-5 md:w-5" />
                <div className="text-[10px] flex justify-center items-center top-0 right-0 absolute bg-destructive size-4 rounded-full text-background">
                  3
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-80" align="end">
              <PopoverArrow className="bg-background" />
              <h3 className="text-lg text-center font-semibold border-b pb-2!">
                Notifications
              </h3>
              <div className="py-4! space-y-4! max-h-96 overflow-y-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    className="flex flex-row justify-between items-center gap-2"
                    key={i}
                  >
                    <Avatar className="size-10 border-2 border-white shadow-lg flex-shrink-0">
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40`}
                        alt="avatar"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                        UI
                      </AvatarFallback>
                    </Avatar>
                    <div className="h-full flex-1 flex flex-row justify-between items-center min-w-0">
                      <h4 className="flex items-center gap-2 truncate">
                        L.Messi
                        <div className="size-2 rounded-full bg-destructive flex-shrink-0"></div>
                      </h4>
                      <div className="flex-shrink-0">
                        <p className="text-xs text-muted-foreground">
                          5 mins ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button size="icon" variant="ghost" className="relative" asChild>
            <Link href="/chat">
              <MailIcon className="h-4 w-4 md:h-5 md:w-5" />
              <div className="text-[10px] flex justify-center items-center top-0 right-0 absolute bg-destructive size-4 rounded-full text-background">
                12
              </div>
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <User2Icon className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="w-[300px] sm:w-[400px] md:w-[500px] bg-primary/50 backdrop-blur-[2px] border-0 shadow-lg shadow-black/50 text-background"
            >
              <PopoverArrow />
              {cookies.ghost ? (
                !isPending && (
                  <div className="px-4! md:px-6! space-y-4! mt-2">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        {data.data.full_name}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="rounded-full size-2.5 bg-green-600" />
                          </TooltipTrigger>
                          <TooltipContent>{data.data.status}</TooltipContent>
                        </Tooltip>
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {data.data.email}
                      </p>
                      <div className="flex justify-end items-center gap-2">
                        <Button className="mt-6" asChild>
                          <Link href={"/profile"}>View Profile</Link>
                        </Button>
                        <Button
                          className="mt-6 bg-transparent! hover:border-destructive! hover:text-destructive"
                          variant={"outline"}
                          onClick={() => mutate(cookies.ghost)}
                        >
                          Log out
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                //
                <div className="px-4! md:px-6! space-y-4!">
                  <h1 className="text-center text-xl md:text-2xl">
                    Welcome to Pool Valet
                  </h1>
                  <p className="text-sm text-center text-muted-foreground">
                    Whether you&apos;re a pool professional offering expert
                    service or a homeowner seeking trusted care, Pool Valet
                    connects you with what matters quality, convenience, and
                    peace of mind.
                  </p>
                  <Button
                    size="lg"
                    className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full w-full"
                    asChild
                  >
                    <Link href={`/auth?as=user`}>Continue as Home Owner</Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-background hover:bg-slate-200 text-foreground rounded-full w-full"
                    asChild
                  >
                    <Link href="/auth?as=provider">
                      Continue as Service Provider
                    </Link>
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left"></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6!">
                <NavigationButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
