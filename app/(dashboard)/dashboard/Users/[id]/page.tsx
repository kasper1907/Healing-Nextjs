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
  const loggedInUserCourseId = decodedToken?.data?.course_id;
  const loggedInUserPHASh = decodedToken?.data?.user_id;

  const groupUsers = await getOne(
    `Groups/getTherapistGroups/${loggedInUserPHASh}`
  );

  const isCurrentUserInGroup = await groupUsers?.data?.some(
    (group: any) => group.id === id
  );

  // if (!isCurrentUserInGroup) {
  //   return <NotAuthorized />;
  // }

  return <GroupDetails ID={id} />;
};
export default Page;
