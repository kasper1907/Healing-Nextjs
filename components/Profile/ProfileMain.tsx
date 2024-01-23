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
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import Link from "next/link";

const ProfileMain = ({ params }: any) => {
  const { userTabsValue, setUserTabsValue }: any = useTabsContext();
  const currentTab = userTabs.find((tab) => tab.value == userTabsValue);
  const [blocked, setBlocked] = React.useState(false);
  const renderMessage = () => {
    return (
      <div className="flex items-center">
        <p>You Have A Report That Must </p>
        <Link href={"/Profile/Report"}> Complete Now!</Link>
      </div>
    );
  };
  return (
    <>
      <BlockUI blocked={true} fullScreen />
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
        onClick={() => setBlocked(false)}
      >
        <Message
          className="text-[12px]"
          severity="info"
          text={renderMessage()}
        />
      </div>

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
