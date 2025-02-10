import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = token.role as
    | "ADMIN"
    | "DIRECTOR"
    | "IDC_MANAGER"
    | "POS_COORDINATOR";

  if (
    token &&
    userRole == "POS_COORDINATOR" &&
    req.nextUrl.pathname.startsWith("/pos-coordinator")
  ) {
    return NextResponse.next();
  } else if (
    token &&
    userRole == "IDC_MANAGER" &&
    req.nextUrl.pathname.startsWith("/idc-manager")
  ) {
    return NextResponse.next();
  } else if (
    token &&
    userRole == "ADMIN" &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  } else if (
    token &&
    userRole == "DIRECTOR" &&
    req.nextUrl.pathname.startsWith("/director")
  ) {
    return NextResponse.next();
  } else if (
    token &&
    userRole == "POS_COORDINATOR" &&
    !req.nextUrl.pathname.startsWith("/pos-coordinator")
  ) {
    return NextResponse.redirect(new URL("/pos-coordinator", req.url));
  } else if (
    token &&
    userRole == "IDC_MANAGER" &&
    !req.nextUrl.pathname.startsWith("/idc-manager")
  ) {
    return NextResponse.redirect(new URL("/idc-manager", req.url));
  } else if (
    token &&
    userRole == "ADMIN" &&
    !req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  } else if (
    token &&
    userRole == "DIRECTOR" &&
    !req.nextUrl.pathname.startsWith("/director")
  ) {
    return NextResponse.redirect(new URL("/director", req.url));
  } else {
    if (!req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico|login|forgot-password|kiosk|signage).*)",
  ],
};
