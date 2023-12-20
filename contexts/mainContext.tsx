"use client";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, createContext } from "react";
import useSWR from "swr";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";
const UserContext = createContext({});
const UseUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<any>({ name: "test" });
  const [userToken, setUserToken] = useCookie("SID");
  const params = useSearchParams();
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

  const { data: RecommendedVideos, isLoading: RecommendedVideosLoading } =
    useSWR(endPoints.getRecommendedVideos(groupId), getOne, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    });

  const { data: LastSession } = useSWR(
    `Videos/getLastSession/${groupId}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const { data: User, isLoading: UserLoading } = useSWR(
    `Users/getOne/${userId}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  // console.log(User);

  let userGroupId: any = `group_id_${User?.course_id}` || undefined;

  const { data: UserGroup, isLoading: LoadingUserGroup } = useSWR(
    `Groups/getOne/${User?.course_id ? User[userGroupId] : groupId}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  return (
    <UserContext.Provider
      value={{
        recommendedVideos: RecommendedVideos?.data,
        RecommendedVideosLoading,
        recordedVideos: data?.data,
        RecordedVideosLoading: isLoading,
        LastSession: LastSession?.data,
        User: User?.data,
        LoadingUser: UserLoading,
        UserGroup: UserGroup?.data,
        LoadingUserGroup,
        LoggedInUser: decodedToken?.data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UseUserContextProvider, UserContext };
