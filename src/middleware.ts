import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const protectedPaths = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    try {
      await verifyToken(token);
    } catch {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
