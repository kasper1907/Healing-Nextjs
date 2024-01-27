import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";

import { IoMdNotificationsOutline } from "react-icons/io";
import { Badge } from "@mui/material";
import jwt from "jsonwebtoken";
import useSWR, { mutate } from "swr";
import { getOne, postRequest, updateRequest } from "@/services/service";
import moment from "moment";
import { isArabic } from "@/utils/checkLanguage";
import axios from "axios";
import useCookie from "react-use-cookie";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";

function ClockIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
        fill="#90A4AE"
      />
    </svg>
  );
}

const Notifications = (props: any) => {
  const accessToken = props.accessToken;
  const [showAlert, setShowAlert] = React.useState(true);
  const [receivedNotifications, setReceivedNotifications] = React.useState([]);
  const decodedToken = jwt.decode(accessToken || "") as any;
  const user = decodedToken?.data;
  const [userToken, setUserToken] = useCookie("SID");

  const userRole = user?.role;
  const userGroupId = user?.group_id;
  const { data: Notifications, isLoading } = useSWR(
    `Notifications/GetByGroupId/${userGroupId}`,
    getOne,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      onSuccess: (data) => {
        data?.sort((a: any, b: any) => {
          const timestampA = new Date(a.createdAt).getTime();
          const timestampB = new Date(b.createdAt).getTime();

          return timestampA - timestampB;
        });
      },
    }
  );

  const { data: UnReadNotifications, isLoading: UnReadIsLoading } = useSWR(
    `Notifications/GetUnReadNotifications/${user?.user_id}/${userGroupId}`,
    getOne,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
    }
  );
  const { data: ReadNotifications, isLoading: ReadIsLoading } = useSWR(
    `Notifications/GetReadNotifications/${user?.user_id}/${userGroupId}`,
    getOne,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
    }
  );

  // console.log(ReadNotifications);

  const handleReadNotification = async (notification: any) => {
    const res = await axios.patch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }Notifications/markNotificationAsRead/${user?.user_id?.toString()}/${notification?.id?.toString()}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    mutate(
      `Notifications/GetUnReadNotifications/${user?.user_id}/${userGroupId}`
    );

    mutate(`Notifications/GetByGroupId/${userGroupId}`);
  };

  const handleMarkAllAsRead = async () => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}Notifications/markAllAsRead/${user?.user_id}/${userGroupId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (res.data.status == "success") {
      toast.success("All Unread Notifications Marked As Read Successfully");
      mutate(
        `Notifications/GetUnReadNotifications/${user?.user_id}/${userGroupId}`
      );

      mutate(`Notifications/GetByGroupId/${userGroupId}`);
    }
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <Badge
            onClick={() => {
              if (showAlert) {
                setShowAlert(false);
              }
            }}
            badgeContent={UnReadNotifications?.data?.length}
            color="error"
          >
            <IconButton style={{ marginTop: "2px" }} variant="text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </IconButton>
          </Badge>
        </MenuHandler>
        <MenuList className="flex flex-col gap-2 !font-[Roboto]">
          {Notifications?.data?.map((notification: any, idx: any) => {
            let isReadByMe =
              notification?.read_by?.filter(
                (item: any) =>
                  item?.userId == user?.user_id && item?.read_status == 1
              ).length > 0;
            return (
              <MenuItem
                key={idx}
                onClick={() => {
                  !isReadByMe && handleReadNotification(notification);
                }}
                className={`flex items-center gap-4 py-2 pl-2 pr-2 ${
                  isReadByMe ? "bg-[#f0f0f0] text-gray-700" : "bg-white"
                }`}
              >
                <Avatar
                  variant="circular"
                  alt="tania andrew"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${notification?.image}`}
                />
                <div className="flex flex-col gap-1 flex-1">
                  <Typography
                    variant="small"
                    className="font-semibold flex w-full items-center justify-between"
                  >
                    <span>{notification?.header}</span>
                    <span
                      className={`w-2 h-2 ${
                        isReadByMe ? "bg-blue-gray-200" : "bg-blue-800"
                      } bg-blue-800 rounded-full ml-2`}
                    ></span>
                  </Typography>
                  <Typography className="flex items-center gap-1 text-[12px] font-medium ">
                    <ClockIcon />
                    {calculateTimeDifference(notification?.createdAt)}
                  </Typography>
                </div>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default Notifications;
