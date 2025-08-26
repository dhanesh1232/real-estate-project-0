import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
