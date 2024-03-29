import GroupDetails from "@/components/Groups/GroupDetails";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { cookies } from "next/dist/client/components/headers";
import NotAuthorized from "@/app/(dashboard)/dashboard/NotAuthorized/page";
import React from "react";
import jwt from "jsonwebtoken";
const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);
  const accessToken = cookies().get("SID")?.value;
  const decodedToken: any = await jwt.decode(accessToken?.toString() || "");

  let endpointName =
    decodedToken?.data?.role == "Assistant"
      ? `getAssistantGroups/${decodedToken?.data?.user_id}`
      : (decodedToken?.data?.role == "Therapist" &&
          `getTherapistGroups/${decodedToken?.data?.user_id}`) ||
        (decodedToken?.data?.role == "Therapist" &&
          `getTherapistGroups/${decodedToken?.data?.user_id}`);

  const userGroups = await getOne(`Groups/${endpointName}`);

  const isThisGroupAllowedToThisUser: boolean = await userGroups?.data?.some(
    (group: any) => group.groupId == id
  );

  if (!isThisGroupAllowedToThisUser && decodedToken?.data?.role != "Doctor") {
    return <NotAuthorized />;
  }

  return <GroupDetails ID={id} />;
};
export default Page;
