import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

const ADMIN_PUBLIC_PATHS = ["/admin", "/admin/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (ADMIN_PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
