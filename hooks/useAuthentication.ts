"use client";
import jwt from "jsonwebtoken";
// hooks/useAuthentication.ts

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { isLoggedIn } from "./auth";

type Props = {
  redirectTo?: string;
};

type ReturnData = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthorized: boolean;
};

export const useAuthentication = ({ redirectTo }: Props): ReturnData => {
  const pathname = usePathname();

  const [cookies] = useCookies(["SID"]);
  const decodedToken: any = jwt.decode(cookies.SID);
  const userData = decodedToken?.data;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const userUrl = `/dashboard/users/userDetails?id=${userData?.user_id}`;
  const currentUrl = `${pathname}?id=${searchParams.get("id")}`;

  const RolePages: any = {
    Doctor: ["/dashboard", "/dashboard/Groups", "/dashboard/Users"],

    Therapist: [
      "/dashboard",
      "/dashboard/Groups",
      "/dashboard/Users",
      "/report/view",
      "/Profile",
    ],

    Assistant: ["/dashboard/Groups", "/dashboard/Users", "/report/create"],
    Moderator: [
      // "/dashboard/Groups",
      // "/dashboard/Users",
      // "/report/create",
      "/ModeratorDashboard",
      "/ModeratorDashboard/createReport",
      "/ModeratorDashboard/createAppointment",
      "/ModeratorDashboard/createGroup",
      "/ModeratorDashboard/addMemberToGroup",
      "/ModeratorDashboard/sendNotification",
      "/ModeratorDashboard/UploadSession",
    ],

    User: ["/Profile"],
  };

  // I want to check if the user is not authorized to view the current page, return false

  useEffect(() => {
    let shouldAbort = false;
    setIsLoading(true);

    isLoggedIn(cookies.SID, pathname)
      .then((isAuthenticated: any) => {
        if (shouldAbort) {
          return;
        }

        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated && redirectTo) {
          // router.push(redirectTo);
        }
      })
      .catch(() => {
        if (shouldAbort) {
          return;
        }

        setIsAuthenticated(false);
        if (redirectTo) {
          router.push(redirectTo);
        }
      })
      .finally(() => {
        if (shouldAbort) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      shouldAbort = true;
    };
  }, [cookies.SID, redirectTo, router]);
  let trimmedURL =
    pathname.split("/")[0] +
    "/" +
    pathname.split("/")[1] +
    "/" +
    pathname.split("/")[2];
  let isAuthorizedUser =
    RolePages[userData?.role]?.includes(pathname) ||
    RolePages[userData?.role]?.includes(trimmedURL);
  return {
    isAuthenticated,
    isLoading,
    isAuthorized: isAuthorizedUser,
  };
};
