import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-screen z-[50000] absolute left-0 top-0 bg-[#FFF] flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default loading;
