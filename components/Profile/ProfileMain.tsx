"use client";
import { CircularProgress, Container } from "@mui/material";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import HomeTabs from "@/components/Dashboard/HomeTabs/page";
import { TabContext } from "@mui/lab";
import { userTabs } from "@/constants/UserTabs";
import { useTabsContext } from "@/components/Dashboard/TabsContext";
import { io } from "socket.io-client";

const ProfileMain = ({ params }: any) => {
  const { userTabsValue, setUserTabsValue }: any = useTabsContext();
  const currentTab = userTabs.find((tab) => tab.value == userTabsValue);
  const socket = new WebSocket("ws://localhost:8080?user_id=12");

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    socket.addEventListener("message", (event) => {
      console.log("WebSocket message received:", event.data);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
  }, []);

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
        {currentTab?.component && <currentTab.component />}
      </Container>
    </>
  );
};

export default ProfileMain;
