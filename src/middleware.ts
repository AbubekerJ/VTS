import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const rolePaths = {
    POS_COORDINATOR: "/pos-coordinator",
    IDC_MANAGER: "/idc-manager",
    ADMIN: "/admin",
    DIRECTOR: "/director",
  };

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = token.role as
    | "ADMIN"
    | "DIRECTOR"
    | "IDC_MANAGER"
    | "POS_COORDINATOR";

  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL(rolePaths[userRole] || "/", req.url));
  }

  // Enforce role-based access control
  if (
    token &&
    rolePaths[userRole] &&
    !req.nextUrl.pathname.startsWith(rolePaths[userRole])
  ) {
    return NextResponse.redirect(new URL(rolePaths[userRole], req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico|login|forgot-password).*)",
  ],
};
