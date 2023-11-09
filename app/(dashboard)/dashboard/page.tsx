"use client";
import Appointments from "@/app/components/Dashboard/HomePage/Appointments/page";
import Home from "@/app/components/Dashboard/HomePage/Home/page";
import HomeTabs from "@/app/components/Dashboard/HomeTabs/page";
import React from "react";

const Page = () => {
  const [value, setValue] = React.useState("1");

  return (
    <div>
      <HomeTabs value={value} setValue={setValue} />
      {value == "1" && <Home />}
      {value == "2" && <Appointments />}
    </div>
  );
};

export default Page;
