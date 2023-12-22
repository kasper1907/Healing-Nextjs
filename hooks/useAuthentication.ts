"use client";
import jwt from "jsonwebtoken";
// hooks/useAuthentication.ts

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRouter as useRouter2 } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { isLoggedIn } from "./auth";
import useSWR from "swr";
import { getOne } from "@/services/service";
import { UserContext } from "@/contexts/mainContext";
import { endPoints } from "@/services/endpoints";

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


  let currentGroupId:any = pathname.startsWith("/dashboard/Groups") && pathname.split("/")[3];
  const { LoggedInUser }: any = React.useContext(UserContext);
  const { data:Groups, error } = useSWR(
    `Groups/getThirapistGroups/${LoggedInUser?.course_id}`,
    getOne
  );

  const { data:GroupUsers } = useSWR(
    endPoints.getGroupUsers(currentGroupId, LoggedInUser?.course_id),
    getOne
  );
 
  const { data:AllGroups } = useSWR(
   "Groups",
    getOne
  );



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
  // console.log(userUrl);

  
  const generateGroupsRoutes = () => {

    let routes: any = [];
    Groups?.data?.map((group: any) => {
      routes.push(`/dashboard/Groups/${group?.id}`);
    });

    return routes;
  }
  const generateGroupUsersRoutes = () => {
    let routes: any = [];
    GroupUsers?.data?.map((user: any) => {
      routes.push(`/dashboard/Users/${user?.id}`);
    });

    return routes;
  }

  const generateDoctorRoutes = () => {
    let routes: any = [];
    AllGroups?.data?.map((group: any) => {
      routes.push(`/dashboard/Groups/${group?.id}`);
    });

    return routes;
  }
  // console.log(generateGroupsRoutes());

  let TherapistAndAssistantGroupRoutes = generateGroupsRoutes();
  let TherapistAndAssistantGroupUsersRoutes = generateGroupUsersRoutes();
  const RolePages: any = {
    Doctor: [
      "/dashboard",
      "/dashboard/Groups",
      ...TherapistAndAssistantGroupRoutes,
    ],

    Therapist: [
      "/dashboard/Groups",
      // ...TherapistAndAssistantGroupRoutes,
      // ...TherapistAndAssistantGroupUsersRoutes,
      "/dashboard/Users",
      "/dashboard/Groups",
      "/report/view",
    ],

    Assistant: [
      "/dashboard/Groups",
      // ...TherapistAndAssistantGroupRoutes,
      // ...TherapistAndAssistantGroupUsersRoutes,
      "/dashboard/Users",
      "/dashboard/Groups",
      "/report/create",
    ],

    User: ["/Profile"],
  };

  console.log('RolePages["Therapist"]', RolePages["Therapist"])

  // console.log(pathname);
  // I want to check if the user is not authorized to view the current page, return false

  // console.log(RolePages["User"].includes(url));

  // console.log(
  //   RolePages[userData?.role]?.includes(
  //     userData?.role == "User" && pathname == "/dashboard/users/userDetails"
  //       ? currentUrl
  //       : pathname
  //   )
  // );

  // console.log(userUrl);




  useEffect(() => {
    let shouldAbort = false;
    setIsLoading(true);

    isLoggedIn(cookies.SID, pathname)
      .then((isAuthenticated: any) => {
        // console.log(isAuthenticated);
        if (shouldAbort) {
          return;
        }

        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated && redirectTo) {
          router.push(redirectTo);
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
  let trimmedPathName = (pathname.split("/")[0] + "/" + pathname.split("/")[1]) + "/" + pathname.split("/")[2]; 
  let isAuthorizedUser = RolePages[userData?.role]?.includes(pathname) || RolePages[userData?.role]?.includes(trimmedPathName) ;
  

  return {
    isAuthenticated,
    isLoading,
    isAuthorized:isAuthorizedUser
  };
};
