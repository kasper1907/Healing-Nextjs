"use client";
import { UserContext } from "@/contexts/mainContext";
import { getOne } from "@/services/service";
import useSWR from "swr";
import React, { useEffect } from "react";
import { useState } from "react";
//@ts-ignore
import { Tabs, TabProperties } from "@sinm/react-chrome-tabs";
import "@sinm/react-chrome-tabs/css/chrome-tabs.css";
// for dark mode
import "@sinm/react-chrome-tabs/css/chrome-tabs-dark-theme.css";
import AssistantQuestions from "@/components/Questions/AssistantQuestions";
import { toast } from "sonner";
import { CircularProgress } from "@nextui-org/react";

const Page = ({ params }: { params: { groupId: string } }) => {
  //   let id = 1;
  const { groupId } = params;
  const [id, setId] = useState(1);
  const { LoggedInUser }: any = React.useContext(UserContext);
  const [tabs, setTabs] = useState<TabProperties[]>([]);
  const [currentReport, setCurrentReport] = useState<any>({});

  const loggedInUserPHash = LoggedInUser?.passwordHash;
  let endpointName = `getGroupReports/${groupId}`;
  const { data, error, isLoading } = useSWR(`Groups/${endpointName}`, getOne, {
    onSuccess: async (data) => {
      let test = data?.data[0]?.reports?.map((item: any, idx: any) => {
        return {
          id: item?.ReportId,
          title: item?.client_name,
          favicon: `${process.env.NEXT_PUBLIC_BASE_URL}${item?.clientImage}`,
          active: idx == 0 ? true : false,
          assistant_status: item?.is_completed_by_assistant,
          client_status: item?.is_completed,
        };
      });
      setTabs(test?.filter((item: any) => item?.assistant_status == "false"));

      const unCompletedReports = test?.filter(
        (item: any) => item?.assistant_status == "false"
      );

      console.log(unCompletedReports);

      const AssistantReport: any = await getOne(
        `Dashboard/getAssistantReport/${unCompletedReports[0]?.id}`
      );
      setCurrentReport(AssistantReport?.data);
    },
  });
  const Reports: any = data?.data;

  const active = async (id: string) => {
    setTabs(tabs.map((tab) => ({ ...tab, active: id == tab.id })));
    const AssistantReport: any = await getOne(
      `Dashboard/getAssistantReport/${id}`
    );
    setCurrentReport(AssistantReport?.data);
  };

  const close = (id: string) => {
    console.log();
    const currentTab = tabs.find((tab) => tab.id == id);
    if (!currentTab) {
      return;
    }
    if (
      currentTab.assistant_status == false ||
      currentTab.assistant_status == "false"
    ) {
      toast.error("Please Complete The Report Firstly");
      return;
    } else {
      setTabs(tabs.filter((tab) => tab.id !== id));
    }
    // setTabs(
    // tabs.filter((tab) => {
    // console.log(tab);
    // if (tab.assistant_status) {
    //   toast.error(
    //     "You can't close this tab because it is completed by assistant"
    //   );
    // } else {
    //   return tab.id !== id;
    // }
    // })
    // );
  };

  const reorder = (tabId: string, fromIndex: number, toIndex: number) => {
    const beforeTab = tabs.find((tab) => tab.id == tabId);
    if (!beforeTab) {
      return;
    }
    let newTabs = tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  };
  const closeAll = () => setTabs([]);

  if (isLoading)
    return (
      <div className="w-full h-full mt-8 flex items-center justify-center">
        <CircularProgress size="sm" />
        Loading...
      </div>
    );

  return (
    <>
      <div className="mt-6">
        <Tabs
          darkMode={false}
          onTabClose={close}
          onTabReorder={reorder}
          onTabActive={active}
          tabs={tabs || []}
        ></Tabs>
      </div>

      <AssistantQuestions
        report={currentReport}
        questions={currentReport?.questions}
      />
    </>
  );
};

export default Page;
