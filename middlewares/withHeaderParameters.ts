import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";

export const withHeaderParams: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    let pathName = request.nextUrl.pathname;
    const urlRegex = /^\?id=\d+&groupId=\d+$/;
    const isMatch = urlRegex.test(request.nextUrl.search);
    const referer = request.headers.get("referer");
    if (pathName === "/dashboard/users/userDetails") {
      return !isMatch
        ? NextResponse.redirect(new URL("/dashboard", request.nextUrl))
        : next(request, _next);
    }
    if (pathName === "/dashboard/GroupUsers") {
      const urlRegex = /^\?groupId=\d+&courseId=\d+$/;
      const isMatch = urlRegex.test(request.nextUrl.search);

      return !isMatch
        ? NextResponse.redirect(new URL("/dashboard", request.nextUrl))
        : next(request, _next);
    }
  };
};
