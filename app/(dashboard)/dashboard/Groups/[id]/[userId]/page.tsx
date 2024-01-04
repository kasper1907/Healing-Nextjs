import React from "react";
import GroupDetails from "@/components/Groups/GroupDetails";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { cookies } from "next/dist/client/components/headers";
import NotAuthorized from "@/app/(dashboard)/dashboard/NotAuthorized/page";
import jwt from "jsonwebtoken";
import UsersMain from "@/components/Users/UsersMain";
const Page = async ({ params }: any) => {
  const { id, userId } = params;
  const accessToken = cookies().get("SID")?.value;
  const decodedToken: any = await jwt.decode(accessToken?.toString() || "");
  const loggedInUserCourseId = decodedToken?.data?.course_id;
  const loggedInUserPHash = decodedToken?.data?.passwordHash;

  const GroupUsers = await getOne(
    endPoints.getGroupUsers(id, loggedInUserCourseId)
  );

  const userGroups = await getOne(
    `Groups/getThirapistGroups/${loggedInUserPHash}`
  );

  const isThisGroupAllowedToThisUser = await userGroups?.data?.some(
    (group: any) => group.id === id
  );

  const isThisUserExistInThisGroup = await GroupUsers?.data?.some(
    (user: any) => user.id === userId
  );

  if (
    (!isThisUserExistInThisGroup && decodedToken?.data?.role != "Doctor") ||
    (!isThisGroupAllowedToThisUser && decodedToken?.data?.role != "Doctor")
  ) {
    return <NotAuthorized />;
  }

  return <UsersMain ID={userId} />;
};

export default Page;
