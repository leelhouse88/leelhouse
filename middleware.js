import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();

  if (!token) {
    // Redirect to login if no token is found
    url.pathname = "/page/auth/login";
    return NextResponse.redirect(url);
  }

  const usertype = token.usertype;

  if (url.pathname.startsWith("/admin") && usertype !== "2") {
    // If user is not admin, redirect from admin pages
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/user") && usertype !== "1") {
    // If user is not a normal user, restrict access to user pages
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
