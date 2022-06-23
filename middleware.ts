import { NextRequest, NextResponse } from "next/server";
const getAuthToken = (cookies: any) => {
  return cookies.get("Authorization");
};

export function middleware(req: NextRequest) {
  const token = getAuthToken(req.cookies);

  console.log(
    `hasToken: ${token ? true : false} | pathName: ${req.nextUrl.pathname}`
  );

  if (token) {
    return NextResponse.next();
  } else {
    console.log("REDIRECT");
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
