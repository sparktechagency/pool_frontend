// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Skip certain admin routes
  const excludedPaths = [
    "/admin/login",
    "/admin/forgot-pass",
    "/admin/verify-otp",
  ];
  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for ghost cookie
  const ghostCookie = req.cookies.get("ghost");

  if (!ghostCookie) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

// Match all /admin/* routes
export const config = {
  matcher: ["/admin/:path*"],
};
