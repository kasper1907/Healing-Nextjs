"use client";
import { CircularProgress, Container } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import HomeTabs from "@/components/Dashboard/HomeTabs/page";
import { TabContext } from "@mui/lab";
import { userTabs } from "@/constants/UserTabs";
import { useTabsContext } from "@/components/Dashboard/TabsContext";

const UsersMain = ({ ID }: any) => {
  const { userTabsValue, setUserTabsValue }: any = useTabsContext();
  const currentTab = userTabs.find((tab) => tab.value == userTabsValue);

  return (
    <>
      <TabContext value={userTabsValue}>
        <HomeTabs
          tabs={userTabs}
          value={userTabsValue}
          setValue={setUserTabsValue}
        />
      </TabContext>
      <Container sx={{ mt: 10 }}>
        {currentTab?.component && <currentTab.component ID={ID} />}
      </Container>
    </>
  );
};

export default UsersMain;
