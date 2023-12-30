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
  const pageParams = useParams();

  const groupId = params.get("groupId");
  const userId = params.get("id");
  const decodedToken: any = jwt.decode(userToken);

  let loggedUserId = decodedToken?.data?.user_id;
  const { data: User, isLoading: UserLoading } = useSWR(
    `Users/getOne/${loggedUserId}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  let userGroupId: any = `group_id_${User?.data?.course_id}`;

  const { data: Group, isLoading: LoadingUserGroup } = useSWR(
    `Groups/getOne/${User?.data?.course_id && User?.data[userGroupId]}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  return (
    <UserContext.Provider
      value={{
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
