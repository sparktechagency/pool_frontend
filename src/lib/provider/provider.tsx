"use client";
import React, { ReactNode } from "react";
import QueryClientWrapper from "./query-client";
import { CookiesProvider } from "react-cookie";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientWrapper>
      <CookiesProvider>{children}</CookiesProvider>
    </QueryClientWrapper>
  );
}
