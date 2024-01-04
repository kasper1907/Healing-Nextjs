import GroupDetails from "@/components/Groups/GroupDetails";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { cookies } from "next/dist/client/components/headers";
import NotAuthorized from "@/app/(dashboard)/dashboard/NotAuthorized/page";
import React from "react";
import jwt from "jsonwebtoken";
const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const accessToken = cookies().get("SID")?.value;
  const decodedToken: any = await jwt.decode(accessToken?.toString() || "");

  const loggedInUserPHash = decodedToken?.data?.passwordHash;

  const userGroups = await getOne(
    `Groups/getThirapistGroups/${loggedInUserPHash}`
  );

  const isThisGroupAllowedToThisUser = await userGroups?.data?.some(
    (group: any) => group.id === id
  );

  if (!isThisGroupAllowedToThisUser && decodedToken?.data?.role != "Doctor") {
    return <NotAuthorized />;
  }

  return <GroupDetails ID={id} />;
};
export default Page;
