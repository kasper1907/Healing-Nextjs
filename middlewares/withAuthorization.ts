// import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./types";

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === "/login" || pathname === "/signup";
    const token = request.cookies.get("accessToken");
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    console.log("withAuthorization", request.nextUrl.pathname);

    return next(request, _next);
  };
};
