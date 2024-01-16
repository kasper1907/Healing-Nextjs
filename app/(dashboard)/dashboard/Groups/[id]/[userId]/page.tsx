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
  console.log(GroupUsers);
  console.log(userId);

  let endpointName =
    decodedToken?.data?.role == "Assistant"
      ? `getAssistantGroups/${decodedToken?.data?.user_id}`
      : (decodedToken?.data?.role == "Therapist" &&
          `getTherapistGroups/${decodedToken?.data?.user_id}`) ||
        (decodedToken?.data?.role == "Therapist" &&
          `getTherapistGroups/${decodedToken?.data?.user_id}`);

  const userGroups = await getOne(`Groups/${endpointName}`);

  const isThisGroupAllowedToThisUser = await userGroups?.data?.some(
    (group: any) => group.id === id
  );

  const isThisUserExistInThisGroup = await GroupUsers?.data?.some(
    (user: any) => user.id === userId
  );

  if (
    (!isThisUserExistInThisGroup && decodedToken?.data?.role == "User") ||
    (!isThisGroupAllowedToThisUser && decodedToken?.data?.role == "User")
  ) {
    return <NotAuthorized />;
  }

  return <UsersMain ID={userId} />;
};

export default Page;
