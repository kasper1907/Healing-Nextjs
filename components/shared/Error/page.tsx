import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Error = () => {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
      <Image
        src={"/images/Dashboard/Error.svg"}
        width={200}
        height={200}
        alt="error"
      />

      <Typography sx={{ mt: 6 }} color={"primary"}>
        Something went wrong, please try again later
      </Typography>
    </div>
  );
};

export default Error;
