"use client";
import { useAuthentication } from "@/hooks/useAuthentication";
import React, { ReactNode, createContext, useState } from "react";
import LoadingScreen from "../Loading/LoadingScreen";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NotAuthorized from "../../../app/(dashboard)/dashboard/NotAuthorized/page";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";
import { Error } from "@/components/shared/Error/page";
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [token, setToken] = useCookie("SID");
  const decodedToken = jwt.decode(token) as any;
  const { isAuthenticated, isLoading, isAuthorized } = useAuthentication({});

  if (isLoading) {
    return <LoadingScreen />;
  }

  // if (!isAuthenticated) {
  //   router.push("/login");
  // }

  // if (isAuthenticated && pathName == "/dashboard") {
  //   if (decodedToken?.data?.role == "User") {
  //     router.push(
  //       `/dashboard/users/userDetails?id=${decodedToken.data.user_id}&groupId=${decodedToken.data.group_id}`
  //     );
  //   }
  // }

  // if (isAuthenticated && pathName == "/login") {
  //   if (decodedToken?.data?.role == "User") {
  //     router.push(
  //       `/dashboard/users/userDetails?id=${decodedToken.data.user_id}&groupId=${decodedToken.data.group_id}`
  //     );
  //   } else {
  //     router.push("/dashboard");
  //   }
  // }

  if (!isAuthorized && pathName != "/login") {
    return <NotAuthorized />;
  }

  if (isAuthenticated && pathName == "/report/create") {
    if (decodedToken?.data?.role != "Assistant") {
      if (decodedToken?.data?.role == "User") {
        router.push(
          `/dashboard/users/userDetails?id=${decodedToken.data.user_id}&groupId=${decodedToken.data.group_id}`
        );
      } else {
        router.push("/dashboard");
      }
    }
  }

  if (isAuthenticated && pathName == "/report/create") {
    if (searchParams.get("id") == null) {
      return (
        <div className="flex flex-row items-center justify-center w-full h-screen">
          <Error msg={"No User ID Found"} />
        </div>
      );
    }
  }
  return (
    <div
      style={{
        minHeight: "calc(100vh - 260px)",
      }}
    >
      {children}
    </div>
  );
};

export default AuthProvider;
