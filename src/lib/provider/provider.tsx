"use client";
import React, { ReactNode } from "react";
import QueryClientWrapper from "./query-client";
import { CookiesProvider } from "react-cookie";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientWrapper>
      <CookiesProvider>{children}</CookiesProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientWrapper>
  );
}
