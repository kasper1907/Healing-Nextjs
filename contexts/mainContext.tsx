"use client";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, createContext } from "react";
import useSWR from "swr";

const UserContext = createContext({});
const UseUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<any>({ name: "test" });
  const params = useSearchParams();
  let groupId = params.get("groupId");
  const userId = params.get("id");

  const { data, error, isLoading } = useSWR(
    endPoints.getSessionsByGroupId(groupId),
    getOne
  );

  const { data: RecommendedVideos, isLoading: RecommendedVideosLoading } =
    useSWR(endPoints.getRecommendedVideos(groupId), getOne, {
      refreshInterval: 0,
    });

  const { data: LastSession } = useSWR(
    `videos/getLastSession/${groupId}`,
    getOne
  );

  const { data: User, isLoading: UserLoading } = useSWR(
    `users/getOne/${userId}`,
    getOne
  );

  let userGroupId: any = `group_id_${User?.course_id}` || undefined;

  const { data: UserGroup, isLoading: LoadingUserGroup } = useSWR(
    `groups/getOne/${User?.course_id ? User[userGroupId] : groupId}`,
    getOne
  );

  return (
    <UserContext.Provider
      value={{
        recommendedVideos: RecommendedVideos?.data,
        RecommendedVideosLoading,
        recordedVideos: data?.data,
        RecordedVideosLoading: isLoading,
        LastSession: LastSession?.data,
        User,
        LoadingUser: UserLoading,
        UserGroup: UserGroup?.data,
        LoadingUserGroup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UseUserContextProvider, UserContext };
