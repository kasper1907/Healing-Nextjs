import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Error = ({ msg }: { msg?: string }) => {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
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
