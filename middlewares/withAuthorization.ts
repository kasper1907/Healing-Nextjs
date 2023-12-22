// import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MiddlewareFactory } from "./types";

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname == "/login" || pathname == "/signup";
    const token = request.cookies.get("SID");
    const decodedToken: any = await jwt.decode(token?.value?.toString() || "");
    const userRole = decodedToken?.data?.role;
    if (!isPublicPath && !token?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname == "/dashboard" && userRole == "User") {
      return NextResponse.redirect(
        new URL(
          // `/dashboard/users/userDetails?id=${decodedToken.data.user_id}&groupId=${decodedToken.data.group_id}`,
          `/Profile`,
          request.url
        )
      );
    }

    if (isPublicPath && token) {
      if (userRole == "User") {
        return NextResponse.redirect(
          new URL(
            // `/dashboard/users/userDetails?id=${decodedToken.data.user_id}&groupId=${decodedToken.data.group_id}`,
            `/Profile`,
            request.url
          )
        );
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  };
};
