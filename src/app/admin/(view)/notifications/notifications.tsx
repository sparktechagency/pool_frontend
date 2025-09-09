"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getNotificationApi, readAllApi, readApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { serverImageBuilder } from "@/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Notifications() {
  const [cookies] = useCookies(["adminGhost"]);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["notif"],
    queryFn: (): AnyType => {
      return getNotificationApi(cookies.adminGhost);
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
    <div>
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
                const call: AnyType = await readApi(x.id, cookies.adminGhost);
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
              const call: AnyType = await readAllApi(cookies.adminGhost);
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
