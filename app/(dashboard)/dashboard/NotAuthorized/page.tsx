"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import useCookie from "react-use-cookie";
import { Button } from "@nextui-org/react";
const Page = () => {
  const [token, setUserToken] = useCookie("SID");

  const decodedToken = jwt.decode(token?.toString()) as any;

  const RedirectionPages: any = {
    Doctor: "/dashboard/Groups",
    User: `/dashboard/users/userDetails?id=${
      decodedToken?.data?.user_id
    }&groupId=${200}`,
    Therapist: "/dashboard/Groups",
    Assistant: "/dashboard/Groups",
  };
  return (
    <div
      style={{
        height: "calc(100vh - 260px)",
      }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
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
      {/* <Button sx={{ ml: 4 }}>
        <Link href={RedirectionPages[decodedToken?.data?.role] || "/dashboard"}>
          Go Back
        </Link>
      </Button> */}
      <Button
        style={{
          width: "200px",
          marginLeft: "40px",
          marginTop: "20px",
        }}
        href={RedirectionPages[decodedToken?.data?.role] || "/dashboard"}
        as={Link}
        color="primary"
        variant="solid"
      >
        Go Back
      </Button>
    </div>
  );
};

export default Page;
