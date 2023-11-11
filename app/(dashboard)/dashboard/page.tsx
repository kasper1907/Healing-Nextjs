"use client";
import Appointments from "@/components/Dashboard/HomePage/Appointments/page";
import Home from "@/components/Dashboard/HomePage/Home/page";
import HomeTabs from "@/components/Dashboard/HomeTabs/page";
import React from "react";
import { TabContext } from "@mui/lab";

const Page = () => {
  const [value, setValue] = React.useState<any>("1");

  return (
    <div>
      <TabContext value={value}>
        <HomeTabs value={value} setValue={setValue} />
      </TabContext>
      {value == "1" && <Home />}
      {value == "2" && <Appointments />}
    </div>
  );
};

export default Page;
