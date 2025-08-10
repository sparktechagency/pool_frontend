"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProviderCard from "./provider-card";
import { ArrowRightIcon } from "lucide-react";

export default function ProviderCardWrapper({ id }: { id: string | number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          View Details <ArrowRightIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <ProviderCard id={id} />
      </DialogContent>
    </Dialog>
  );
}
