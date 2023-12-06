import jwt from "jsonwebtoken";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import {
  doctorRoutes,
  therapistRoutes,
  userRoutes,
} from "@/constants/RolesRoutes";

export const withRolesAndPermissions: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    // const cookie = request.cookies.get(process.env.TOKEN as string);
    // const token = cookie?.value;
    const token: any = request.cookies.get("accessToken");
    // console.log("token ->", token?.value);
    const decodedToken: any = jwt.decode(token?.value);
    // console.log(decodedToken);
    if (token) {
      //   url.pathname = "/not-found";
      url.pathname = "/dashboard/NotAuthorized";
      const user = decodedToken?.data as any;
      //   console.log("user ->", user);
      // if token is expired then redirect to login page
      //   if (user?.exp < Date.now() / 1000) {
      //     url.pathname = "/signin";
      //     return NextResponse.redirect(url);
      //   }
      // if user role is not admin and user is trying to access admin routes then redirect to login page
      if (user?.role != "Doctor" && user?.role != "Therapist") {
        if (
          doctorRoutes.includes(pathname) ||
          therapistRoutes.includes(pathname)
        ) {
          if (!userRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
          }
        }
      }

      //   if (user?.role != "Therapist" && therapistRoutes.includes(pathname)) {
      //     console.log("Test");
      //     return NextResponse.redirect(url);
      //   }
    }
  };
};