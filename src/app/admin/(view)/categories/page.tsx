"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import AddCategory from "./add-category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi, getCategoriesApi } from "@/lib/api/admin/admin";
import { useCookies } from "react-cookie";
import { serverImageBuilder } from "@/lib/formatter";
import { AnyType } from "@/lib/config/error-type";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditCategory from "./edit-category";

export default function Page() {
  const [cookeis] = useCookies(["ghost"]);
  const { data, isPending }: AnyType = useQuery({
    queryKey: ["category"],
    queryFn: () => {
      return getCategoriesApi(cookeis.ghost);
    },
  });
  const qCLient = useQueryClient();
  return (
    <div className="!pb-12 !pr-6 space-y-3!">
      <h3 className="text-3xl font-semibold">Manage Preference Categories</h3>
      <AddCategory />
      <div className="w-full space-y-6!">
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          data.data.map((x: AnyType) => (
            <Card key={x.id}>
              <CardContent className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={serverImageBuilder(x.icon)}
                    height={24}
                    width={24}
                    className="size-10 object-contain"
                    alt={x.name}
                  />
                  <span>{x.name}</span>
                </div>
                <div className="">
                  <EditCategory id={x.id} currentName={x.name} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="text-destructive">
                        <Trash2Icon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are your sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          After you delete this cateogry. you can not undo this
                          action.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              const call: AnyType = await deleteCategoryApi(
                                x.id,
                                cookeis.ghost
                              );
                              if (!call.status) {
                                toast.error(
                                  call.message ??
                                    "Failed to delete this category"
                                );
                              } else {
                                toast.success(
                                  call.message ??
                                    "Successfully deleted this category"
                                );
                                qCLient.invalidateQueries({
                                  queryKey: ["category"],
                                });
                              }
                            } catch (error) {
                              console.error(error);
                              toast.error("Something went wrong");
                            }
                          }}
                          className="bg-destructive"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
