import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ReactCodeInput from "react-verification-code-input";

const Test1 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography
        color={"primary"}
        style={{
          fontFamily: "Tajawal",
          fontSize: "20px",
        }}
      >
        رتب أرقام المربعات من المفضل للأقل تفضيلاً
      </Typography>
      <Image
        src={"/images/Dashboard/color_test.jpg"}
        width={400}
        height={400}
        alt="Color-Test1"
      />
      <ReactCodeInput />
    </div>
  );
};

export default Test1;
