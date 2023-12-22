"use client";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, createContext } from "react";
import useSWR from "swr";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";
const UserContext = createContext({});
const UseUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<any>({ name: "test" });
  const [userToken, setUserToken] = useCookie("SID");
  const params = useSearchParams();
  const pathName = usePathname();
  const groupId = params.get("groupId");
  const userId = params.get("id");
  const decodedToken: any = jwt.decode(userToken);
  // console.log(decodedToken);
  const { data, error, isLoading } = useSWR(
    endPoints.getSessionsByGroupId(groupId),
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  let finalUserId = decodedToken?.data?.user_id || 5000;
  const { data: User, isLoading: UserLoading } = useSWR(
    `Users/getOne/${finalUserId}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  let userGroupId: any = `group_id_${User?.data?.course_id}`;

  const { data: Group, isLoading: LoadingUserGroup } = useSWR(
    `Groups/getOne/${User?.data[userGroupId]}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const { data: RecommendedVideos, isLoading: RecommendedVideosLoading } =
    useSWR(endPoints.getRecommendedVideos(User?.data[userGroupId]), getOne, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    });

  const { data: LastSession } = useSWR(
    `Videos/getLastSession/${User?.data[userGroupId]}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );
  // console.log(decodedToken?.data);
  // const { data: User, isLoading: UserLoading } = useSWR(
  //   `Users/getOne/${decodedToken?.data?.user_id}`,
  //   getOne,
  //   { revalidateIfStale: false, revalidateOnFocus: false }
  // );
  console.log(LastSession);
  return (
    <UserContext.Provider
      value={{
        recommendedVideos: RecommendedVideos?.data,
        RecommendedVideosLoading,
        recordedVideos: data?.data,
        RecordedVideosLoading: isLoading,
        LastSession: LastSession?.data,
        LoggedInUser: decodedToken?.data,
        User: User?.data,
        Group: Group?.data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UseUserContextProvider, UserContext };
