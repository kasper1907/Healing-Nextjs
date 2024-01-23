import React from "react";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { Logout as LogoutHandler } from "@/utils/Logout";
import { useTabsContext } from "@/components/Dashboard/TabsContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getOne } from "@/services/service";

export default function UserMenu() {
  const router = useRouter();
  const [userToken, setUserToken] = useCookie("SID");
  const decodedToken = jwt.decode(userToken) as any;
  const user = decodedToken?.data;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  const {
    userTabsValue,
    setUserTabsValue,
    viewAllGroups,
    setViewAllGroups,
  }: any = useTabsContext();

  const handleLogout = () => {
    router.push("/login");
    LogoutHandler();
  };

  const { data: UserData, isLoading } = useSWR(
    `Users/getOne/${user?.user_id}`,
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "/images/8380015.jpg",
            }}
            className="transition-transform"
            description={`${isLoading ? "Loading..." : `@${user?.user_name}`}`}
            name={user?.user_name?.toUpperCase()}
          />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={handleLogout} color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
