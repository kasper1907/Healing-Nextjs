import { UserContext } from "@/contexts/mainContext";
import { cookies } from "next/dist/client/components/headers";
import React from "react";
import jwt from "jsonwebtoken";
import { getOne } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import { useSearchParams } from "next/navigation";
import ViewReport from "@/components/Report/View/View";
import NotAuthorized from "@/app/(dashboard)/dashboard/NotAuthorized/page";

interface TokenData {
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
    password: string;
  };
  iat: number;
  exp: number;
}
const ViewReportPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) => {
  // const searchParams = useSearchParams();
  // const groupId = searchParams.get("groupId");
  const { groupId } = searchParams;
  const LoggedInUserToken = await cookies().get("SID")?.value;
  const decodedToken: TokenData | any = await jwt.decode(
    (LoggedInUserToken as string) || ""
  );
  const LoggedInUser = decodedToken?.data;
  const loggedInUserPHash = decodedToken?.data?.passwordHash;

  const userAllowedGroups = await getOne(
    `Groups/getThirapistGroups/${loggedInUserPHash?.course_id}`
  );

  const GroupUsers = await getOne(
    endPoints.getGroupUsers(groupId, LoggedInUser?.course_id)
  );

  const isThisGroupAllowedToThisUser = await userAllowedGroups?.data?.some(
    (group: any) => group.id === groupId
  );

  const isThisUserExistInThisGroup = await GroupUsers?.data?.some(
    (user: any) => user.id === params.id
  );

  if (!isThisGroupAllowedToThisUser || !isThisUserExistInThisGroup) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotAuthorized />
      </div>
    );
  }

  return <ViewReport userId={params.id} groupId={groupId} />;
};

export default ViewReportPage;
