"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { editAccApi } from "@/lib/api/auth/auth";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";

const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export default function EditProfileForm({
  defaultValues,
}: {
  defaultValues: z.infer<AnyType>;
}) {
  const [cookies] = useCookies(["ghost"]);
  const { mutate } = useMutation({
    mutationKey: ["profile"],
    mutationFn: (data: z.infer<AnyType>) => editAccApi(data, cookies.ghost),
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log("Profile Updated:", values);

    try {
      const finalizer = {
        ...values,
        _method: "PATCH",
      };

      mutate(finalizer, {
        onSuccess: (data: AnyType) => {
          toast.success(data.message ?? "Successfully updated your profile");
        },
        onError: (error: AnyType) => {
          toast.error(error.message ?? "Failed to update your profile");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input className="bg-background" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-background"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className="min-h-[160px] bg-background" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-accent-foreground">
          Save Profile
        </Button>
      </form>
    </Form>
  );
}
