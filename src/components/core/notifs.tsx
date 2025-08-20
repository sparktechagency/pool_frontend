"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getNotificationApi, readAllApi, readApi } from "@/lib/api/auth/auth";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { AnyType } from "@/lib/config/error-type";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { serverImageBuilder } from "@/lib/formatter";

export default function Notifs() {
  const [cookies] = useCookies(["ghost"]);
  const { data, isPending, refetch }: AnyType = useQuery({
    queryKey: ["profile"],
    refetchOnMount: "always",
    queryFn: () => {
      return getNotificationApi(cookies.ghost);
    },
  });

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <div className="py-4! space-y-4! max-h-96 overflow-y-auto">
      {data?.data?.data?.length <= 0 && (
        <div className="w-full flex justify-center items-center text-sm font-semibold text-muted-foreground">
          No Notifications found
        </div>
      )}

      {data &&
        data?.data?.data?.map((x: AnyType) => (
          <div
            key={x.id}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/40 transition"
            onClick={async () => {
              try {
                const call: AnyType = await readApi(x.id, cookies.ghost);
                if (!call.status) {
                  toast.error(
                    call.message ?? "Failed to read this notification"
                  );
                }
                {
                  toast.success(call.message ?? "Marked all notifciation");
                  refetch();
                }
              } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
              }
            }}
          >
            {/* Avatar */}
            <Avatar className="size-10 border border-border shadow-sm flex-shrink-0">
              <AvatarImage
                src={serverImageBuilder(x.data.provider_avatar)}
                alt={x.data.provider_name}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                {x.data.provider_name?.[0] ?? "UI"}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-sm truncate flex items-center gap-1">
                  {x.data.provider_name}
                  {!x.read_at && (
                    <span className="size-2 rounded-full bg-destructive flex-shrink-0" />
                  )}
                </h4>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  5 mins ago
                </p>
              </div>
              <p className="text-sm text-foreground truncate">
                {x.data.message}
              </p>
            </div>
          </div>
        ))}
      {data?.data?.data?.length > 0 && (
        <Button
          className="w-full"
          variant={"outline"}
          onClick={async () => {
            try {
              const call: AnyType = await readAllApi(cookies.ghost);
              if (!call.status) {
                toast.error(call.message ?? "Failed to read all notification");
              } else {
                toast.success(call.message ?? "Marked all notifciation");
                refetch();
              }
            } catch (error) {
              console.error(error);
              toast.error("Something went wrong");
            }
          }}
        >
          Mark all as read
        </Button>
      )}
    </div>
  );
}

// <div className="py-4! space-y-4! max-h-96 overflow-y-auto">
//   {Array.from({ length: 5 }).map((_, i) => (
//     <div
//       className="flex flex-row justify-between items-center gap-2"
//       key={i}
//     >
//       <Avatar className="size-10 border-2 border-white shadow-lg flex-shrink-0">
//         <AvatarImage
//           src={`/placeholder.svg?height=40&width=40`}
//           alt="avatar"
//         />
//         <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
//           UI
//         </AvatarFallback>
//       </Avatar>
//       <div className="h-full flex-1 flex flex-row justify-between items-center min-w-0">
//         <h4 className="flex items-center gap-2 truncate">
//           L.Messi
//           <div className="size-2 rounded-full bg-destructive flex-shrink-0"></div>
//         </h4>
//         <div className="flex-shrink-0">
//           <p className="text-xs text-muted-foreground">5 mins ago</p>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
