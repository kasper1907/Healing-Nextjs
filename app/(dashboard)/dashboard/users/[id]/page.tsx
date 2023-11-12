"use client";
import { CircularProgress, Container } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import HomeTabs from "@/components/Dashboard/HomeTabs/page";
import { TabContext } from "@mui/lab";
import { userTabs } from "@/constants/UserTabs";

const Page = ({ params }: any) => {
  const [value, setValue] = React.useState<string>("1");
  const currentTab = userTabs.find((tab) => tab.value == value);

  return (
    <>
      <TabContext value={value}>
        <HomeTabs tabs={userTabs} value={value} setValue={setValue} />
      </TabContext>
      <Container sx={{ mt: 10 }}>
        {currentTab?.component && <currentTab.component />}
      </Container>
    </>
  );
};

export default Page;
