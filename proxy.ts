import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/announcements",
  "/bible",
  "/history",
  "/media",
  "/playlists",
  "/presentation",
  "/settings",
  "/songs",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  const token = req.cookies.get("token")?.value;

  if (isProtected && !token) {
    const url = new URL("/auth", req.url);
    url.searchParams.set("mode", "signin");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
