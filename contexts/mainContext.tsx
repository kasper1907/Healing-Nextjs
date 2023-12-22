"use client";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
  const router = useRouter();
  console.log(router);
  const pageParams = useParams();

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

  let finalUserId = decodedToken?.data?.user_id;
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

  // console.log(decodedToken?.data);
  // const { data: User, isLoading: UserLoading } = useSWR(
  //   `Users/getOne/${decodedToken?.data?.user_id}`,
  //   getOne,
  //   { revalidateIfStale: false, revalidateOnFocus: false }
  // );
  // console.log(LastSession);

  // const generateGroupsRoutes = () => {

  //   let routes: any = [];
  //   Groups?.data?.map((group: any) => {
  //     routes.push(`/dashboard/Groups/${group?.id}`);
  //   });

  //   return routes;
  // }
  // const generateGroupUsersRoutes = () => {
  //   console.log(GroupUsers);
  //   console.log(LoggedInUser?.group_id, LoggedInUser?.course_id);
  //   let routes: any = [];
  //   GroupUsers?.data?.map((user: any) => {
  //     routes.push(`/dashboard/Users/${user?.id}`);
  //   });

  //   return routes;
  // }

  return (
    <UserContext.Provider
      value={{
        recordedVideos: data?.data,
        RecordedVideosLoading: isLoading,
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
