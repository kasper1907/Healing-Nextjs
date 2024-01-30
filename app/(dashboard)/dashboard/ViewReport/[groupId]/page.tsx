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
import { Button, CircularProgress } from "@nextui-org/react";
import DoctorQuestions_View from "@/components/Questions/DoctorQuestions_View";
import { Divider, Grid } from "@mui/material";
import ReportsTable from "@/components/Questions/ReportsTable";
import Image from "next/image";

const Page = ({ params }: { params: { groupId: string } }) => {
  //   let id = 1;
  const { groupId } = params;
  const [id, setId] = useState(1);
  const { LoggedInUser }: any = React.useContext(UserContext);
  const [tabs, setTabs] = useState<TabProperties[]>([]);
  const [currentReport, setCurrentReport] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const loggedInUserPHash = LoggedInUser?.passwordHash;
  let endpointName = `getGroupCompletedReports/${groupId}`;
  const { data, error, isLoading } = useSWR(`Groups/${endpointName}`, getOne, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const Reports: any = data?.data;

  const active = async (id: string) => {
    setTabs(tabs.map((tab) => ({ ...tab, active: id == tab.id })));
    const AssistantReport: any = await getOne(
      `Dashboard/getCompleteReport/${id}`
    );
    setCurrentReport(AssistantReport?.data);
  };

  const close = async (id: string) => {
    let newTabs = tabs.filter((tab) => {
      return tab.id !== id;
    });

    setTabs(newTabs);

    console.log(newTabs);

    if (newTabs?.length == 0) {
      setCurrentReport({});
    }
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

  const handleAddTab = async (ReportId: number) => {
    const AssistantReport: any = await getOne(
      `Dashboard/getCompleteReport/${ReportId}`
    );
    let newTab = {
      id: ReportId,
      title: `#${ReportId} - ${AssistantReport?.data?.client_name}`,
      favicon: `${process.env.NEXT_PUBLIC_BASE_URL}${AssistantReport?.data?.client_image}`,
      active: true,
    };
    setCurrentReport(AssistantReport?.data);
    addTab(newTab);
  };

  const addTab = (newTab: any) => {
    // check if tab already exists

    setTabs((prev) => {
      const exists = prev.find((tab) => tab.id == newTab.id);
      if (exists) {
        // return prev;
        return prev.map((tab) => {
          if (tab.id == newTab.id) {
            return { ...tab, active: true };
          } else {
            return { ...tab, active: false };
          }
        });
      }
      return [...prev, newTab];
    });
  };

  if (isLoading)
    return (
      <div className="w-full h-full mt-8 flex items-center justify-center">
        <CircularProgress size="sm" />
        Loading...
      </div>
    );

  return (
    <>
      {Reports?.length == 0 ? (
        <div className="w-full h-full mt-8 flex items-center justify-center">
          <h1>No Reports Found</h1>
        </div>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12} md={isExpanded ? 12 : 6} sx={{ pr: 2 }}>
              {currentReport && Object?.keys(currentReport)?.length > 0 ? (
                <>
                  <div className="mt-6">
                    <Tabs
                      darkMode={false}
                      onTabClose={close}
                      // onTabReorder={reorder}
                      onTabActive={active}
                      tabs={tabs || []}
                    ></Tabs>
                  </div>
                  <DoctorQuestions_View
                    isExpanded={isExpanded}
                    report={currentReport}
                    questions={currentReport?.questions}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Image
                    src={"/images/chooseReport.svg"}
                    alt="chooseReport"
                    width={200}
                    height={200}
                  />
                  <span className="!font-[Tajawal] mt-4">
                    برجاء اختيار تقرير لعرضه
                  </span>
                </div>
              )}
            </Grid>

            {/* <Divider orientation="vertical//> */}
            <Grid
              item
              xs={12}
              md={isExpanded ? 12 : 6}
              sx={{ borderLeft: isExpanded ? "none" : "5px solid #BBB", pl: 2 }}
            >
              <h2
                className="!font-[Tajawal] mt-4 mr-4"
                style={{ direction: "rtl" }}
              >
                تقارير المجموعه -
                <span className="!font-[Roboto]">
                  {" "}
                  {Reports[0]?.group_name}
                </span>
              </h2>

              <Button
                onPress={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                <span className="!font-[Tajawal]">
                  {isExpanded ? "عرض القائمه" : "عرض التقارير"}
                </span>
              </Button>
              <ReportsTable Reports={Reports} handleAddTab={handleAddTab} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Page;
