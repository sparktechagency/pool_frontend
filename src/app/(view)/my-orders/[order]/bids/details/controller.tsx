"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { decrypt, encrypt } from "@/lib/formatter";
import { useMutation } from "@tanstack/react-query";
import {
  acceptRequestApi,
  cancelOrderApi,
  createServiceIntend,
} from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { AnyType } from "@/lib/config/error-type";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { AlertCircleIcon } from "lucide-react";

export default function Controller({
  status,
  id,
  prov,
  xxx,
}: {
  id: string;
  status: string;
  xxx: string;
  prov: string | number;
}) {
  const [cookies] = useCookies(["ghost"]);
  const [mounted, setMounted] = React.useState(false);
  const navig = useRouter();
  const pathname = usePathname();
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["quote"],
    mutationFn: () => {
      if (!cookies.ghost) return Promise.resolve();
      return acceptRequestApi(id, cookies.ghost);
    },
  });
  const { mutate: cancelBid } = useMutation({
    mutationKey: ["quote"],
    mutationFn: () => {
      if (!cookies.ghost) return Promise.resolve();
      return cancelOrderApi(id, cookies.ghost);
    },
  });
  const { mutate: pay } = useMutation({
    mutationKey: ["quote"],
    mutationFn: () => {
      return createServiceIntend(
        {
          payment_method_types: "card",
          amount: decrypt(xxx),
          provider_id: prov,
        },
        cookies.ghost
      );
    },
  });
  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto"></div>
    );
  }

  if (!cookies.ghost) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto"></div>
    );
  }
  if (!prov) {
    return <></>;
  }
  return (
    <>
      {status === "Pending" ? (
        <Button
          className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full"
          size="lg"
          onClick={async () =>
            mutate(undefined, {
              onError(error) {
                toast.error(error.message ?? "Failed to accept Bid request");
              },
              onSuccess: (data: AnyType) => {
                if (!data.status) {
                  toast.error(data.message ?? "Failed to accept Bid request");
                } else {
                  toast.success(
                    data.message ?? "Successfully Accepted the bid"
                  );
                  const basePath = pathname.split("/details")[0];
                  navig.push(`${basePath}?accepted=true`);
                }
              },
            })
          }
        >
          Accept Request
        </Button>
      ) : status === "In progress" ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full"
              size="lg"
            >
              Cancel Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="size-8 rounded-full bg-gradient-to-br from-red-600 to-primary/20 to mx-auto flex justify-center items-center text-primary">
              <AlertCircleIcon />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Are you sure?
              </DialogTitle>
              <DialogDescription className="text-center">
                Do you want to cancel the service?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex-col!">
              <Button
                variant={"outline"}
                className="rounded-full"
                onClick={async () =>
                  cancelBid(undefined, {
                    onError(error) {
                      toast.error(
                        error.message ?? "Failed to Cancel Bid request"
                      );
                    },
                    onSuccess: (data: AnyType) => {
                      if (!data.status) {
                        toast.error(
                          data.message ?? "Failed to Cancel Bid request"
                        );
                      } else {
                        toast.success(
                          data.message ?? "Successfully Cancelled the bid"
                        );
                        const basePath = pathname.split("/details")[0];
                        navig.push(`${basePath}`);
                      }
                    },
                  })
                }
              >
                Yes
              </Button>
              <DialogClose asChild>
                <Button className="rounded-full">No</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full"
          size="lg"
          onClick={() => {
            {
              try {
                pay(undefined, {
                  onError(error) {
                    toast.error(
                      error.message ?? "Failed to create payment intend"
                    );
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSuccess(data: any) {
                    if (!data.status) {
                      toast.error(
                        data.message ?? "Failed to create payment intend"
                      );
                    } else {
                      toast.success(
                        data.message ?? "Payment intend created successfully"
                      );
                      navig.push(
                        `details/payment?xxx=${encrypt(
                          data.data.client_secret
                        )}&r=${decrypt(xxx)}&codex=${data.data.id}`
                      );
                    }
                  },
                });
              } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
              }
            }
          }}
        >
          Pay ${decrypt(xxx)}
        </Button>
      )}
    </>
  );
}
