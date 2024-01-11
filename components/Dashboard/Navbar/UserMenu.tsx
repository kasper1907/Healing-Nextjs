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
import UploadVideo from "./UploadVideo";

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
              src: UserData?.data?.image
                ? process.env.NEXT_PUBLIC_BASE_URL + UserData?.data?.image
                : process.env.NEXT_PUBLIC_BASE_URL +
                  "files/static_assets/male-av.jpg",
            }}
            className="transition-transform"
            description={`${isLoading ? "Loading..." : `@${user?.user_name}`}`}
            name={UserData?.data?.full_name}
          />
        </DropdownTrigger>
        {user?.role == "User" && (
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                setUserTabsValue(6);
              }}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setUserTabsValue(7);
              }}
            >
              Edit account
            </DropdownItem>

            <DropdownItem onClick={ViewAllCourses}>
              View All Courses
            </DropdownItem>
            <DropdownItem onClick={handleLogout} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        )}

        {user?.role != "Moderator" && user?.role != "User" && (
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                // setUserTabsValue(7);
                onOpen();
              }}
            >
              Send A Notification
            </DropdownItem>

            <DropdownItem onClick={handleLogout} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
      <SendNotification
        user={user}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <UploadVideo
        user={user}
        isOpen2={isOpen2}
        onOpen2={onOpen2}
        onOpenChange2={onOpenChange2}
      />
    </div>
  );
}
