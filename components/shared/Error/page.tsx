"use client";
import { Typography } from "@mui/material";
import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

export const Error = ({ msg }: { msg?: string }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div
      data-aos="fade-right"
      className="w-full h-[50vh] flex flex-col items-center justify-center"
    >
      <Image
        src={"/images/Dashboard/error.svg"}
        width={200}
        height={200}
        alt="error"
      />

      <Typography sx={{ mt: 6 }} color={"primary"}>
        Something went wrong, {msg ? msg : "please try again later"}
      </Typography>
    </div>
  );
};
