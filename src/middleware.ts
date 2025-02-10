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

  // Define protected routes and allowed roles
  const protectedRoutes: { [key: string]: string[] } = {
    "/admin": ["ADMIN"],
    "/director": ["ADMIN", "DIRECTOR"],
    "/manager": ["ADMIN", "DIRECTOR", "IDC_MANAGER"],
    "/coordinator": ["ADMIN", "DIRECTOR", "IDC_MANAGER", "POS_COORDINATOR"],
  };

  const pathname = req.nextUrl.pathname;
  console.log("pathname.........................", pathname);
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      if (!protectedRoutes[route].includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/director/:path*",
    "/manager/:path*",
    "/pos-coordinator/:path*",
  ],
};
