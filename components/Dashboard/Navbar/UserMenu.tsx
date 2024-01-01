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
import { useTabsContext } from "../TabsContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getOne } from "@/services/service";
import SendNotification from "./SendNotification";

export default function UserMenu() {
  const router = useRouter();
  const [userToken, setUserToken] = useCookie("SID");
  const decodedToken = jwt.decode(userToken) as any;
  const user = decodedToken?.data;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    userTabsValue,
    setUserTabsValue,
    viewAllGroups,
    setViewAllGroups,
  }: any = useTabsContext();

  const ViewAllCourses = () => {
    if (userTabsValue == 1) {
      setViewAllGroups(true);
      let allGroupsSection: any = document.querySelector(".aos-init");
      //   allGroupsSection.scrollIntoView({ behavior: "smooth" });
      allGroupsSection.scrollIntoView({ behavior: "smooth", block: "center" });
      window.scrollTo({
        top: allGroupsSection.offsetTop - 100,
        behavior: "smooth",
      });
    } else {
      setUserTabsValue(1);
      setViewAllGroups(true);
    }
  };

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
              src: process.env.NEXT_PUBLIC_BASE_URL + UserData?.data?.image,
            }}
            className="transition-transform"
            description={`${isLoading ? "Loading..." : `@${user?.user_name}`}`}
            name={UserData?.data?.full_name}
          />
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={[
            `${user?.role != "User" ? "profile" : ""}`,
            `${user?.role != "User" ? "courses" : ""}`,
            `${user?.role != "User" ? "edit_account" : ""}`,
            `${user?.role != "Moderator" ? "send_notification" : ""}`,
          ]}
          aria-label="User Actions"
          variant="flat"
        >
          <DropdownItem key="profileA" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{`@${user?.user_name}`}</p>
          </DropdownItem>
          <DropdownItem
            key="profile"
            onClick={() => {
              setUserTabsValue(6);
            }}
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="edit_account"
            onClick={() => {
              setUserTabsValue(7);
            }}
          >
            Edit account
          </DropdownItem>
          {/* {user?.role == "Moderator" && (
            <DropdownItem
              key="edit_account"
              onClick={() => {
                setUserTabsValue(7);
              }}
            >
              Send Notification
            </DropdownItem>
          )} */}
          <DropdownItem
            key="send_notification"
            onClick={() => {
              // setUserTabsValue(7);
              onOpen();
            }}
          >
            Send A Notification
          </DropdownItem>
          <DropdownItem key="courses" onClick={ViewAllCourses}>
            View All Courses
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <SendNotification
        user={user}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
