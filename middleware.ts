import { NextRequest, NextResponse } from "next/server";
const getAuthToken = (cookies: any) => {
  return cookies.get("Authorization");
};

const isNoAuthResource = (pathName: string) => {
  const isPageRequest = /pages/.test(pathName);

  if (!isPageRequest) {
    return true;
  } else {
    const noAuthPagesPattern = [/pages\/login.js$/, /pages\/_app.js$/];

    const matchesNoAuthPattern = noAuthPagesPattern.find((pattern) =>
      pattern.test(pathName)
    );

    return matchesNoAuthPattern ? true : false;
  }
};

export function middleware(req: NextRequest) {
  const token = getAuthToken(req.cookies);

  console.log(
    `hasToken: ${token ? true : false} | pathName: ${req.nextUrl.pathname}`
  );

  if (token || isNoAuthResource(req.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    console.log("REDIRECT");
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
