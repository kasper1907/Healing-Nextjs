"use client";
import Appointments from "@/components/Dashboard/HomePage/Appointments/page";
import Home from "@/components/Dashboard/HomePage/Home/page";
import HomeTabs from "@/components/Dashboard/HomeTabs/page";
import React from "react";
import { TabContext } from "@mui/lab";
import { dashboardTabs } from "@/constants/UserTabs";
import { useTabsContext } from "@/components/Dashboard/TabsContext";
import { useAuthentication } from "@/hooks/useAuthentication";

const GroupsMain = () => {
  const { dashboardTabsValue, setDashboardTabsValue }: any = useTabsContext();
  const currentTab = dashboardTabs.find(
    (tab) => tab.value == dashboardTabsValue
  );

  return (
    <div>
      <TabContext value={dashboardTabsValue}>
        <HomeTabs
          tabs={dashboardTabs}
          value={dashboardTabsValue}
          setValue={setDashboardTabsValue}
        />
      </TabContext>
      {currentTab?.component && (
        <currentTab.component value={dashboardTabsValue} />
      )}
    </div>
  );
};

export default GroupsMain;
