import ProfileMain from "@/components/Profile/ProfileMain";
import { getOne } from "@/services/service";
import React from "react";

const Page = async () => {
  const ClientReport: any = await getOne("Dashboard/getUnCompletedReport");
  const blockProfile = ClientReport?.isExistAnUnCompletedReport;
  return <ProfileMain blockProfile={blockProfile} />;
};

export default Page;
