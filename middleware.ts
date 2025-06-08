import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = !!token;
  
  const pathname = request.nextUrl.pathname;

  const isLogInPage = pathname.startsWith("/auth/login");

  const isProtectedRoutes =
    pathname === "/" ||
    pathname.startsWith("/main") ||
    pathname.startsWith("/profile");

  if (!isLoggedIn && isProtectedRoutes) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isLoggedIn && isLogInPage) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/main/:path*", "/profile/:path*", "/auth/login"],
};
