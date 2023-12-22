import ProfileMain from "@/components/Profile/ProfileMain";
import { getOne } from "@/services/service";
import React from "react";

const Page = async () => {
  const data = await getOne("Users/getOne/5000");
  return <ProfileMain />;
};

export default Page;
