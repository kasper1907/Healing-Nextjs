"use client";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import useCookie from "react-use-cookie";
const Page = () => {
  const [token, setUserToken] = useCookie("SID");

  const decodedToken = jwt.decode(token?.toString()) as any;
  ////console.log(decodedToken?.data?.role);

  const RedirectionPages: any = {
    Doctor: "/dashboard",
    User: `/dashboard/users/userDetails?id=${
      decodedToken?.data?.user_id
    }&groupId=${200}`,
    Therapist: "/dashboard",
    Assistant: "/dashboard",
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image
        src="/images/Dashboard/401.svg"
        width={300}
        height={300}
        alt="401"
        style={{
          marginTop: "50px",
          marginBottom: "30px",
        }}
      />

      <Typography sx={{ ml: 4 }}>
        Sorry! Your Are Not Authorized To Access This Page
      </Typography>
      <Button sx={{ ml: 4 }}>
        <Link href={RedirectionPages[decodedToken?.data?.role] || "/dashboard"}>
          Go Back
        </Link>
      </Button>
    </div>
  );
};

export default Page;
