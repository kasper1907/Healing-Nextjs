import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
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
    <Dropdown>
      <DropdownTrigger>
        <Button
          style={{
            minWidth: "10px",
            background: "transparent",
            width: "80px",
            height: "60px",
            margin: "0",
            padding: "0",
          }}
        >
          <Badge
            onClick={() => {
              if (showAlert) {
                setShowAlert(false);
              }
            }}
            badgeContent={UnReadNotifications?.data?.length}
            color="error"
          >
            <IoMdNotificationsOutline
              size={30}
              style={{ width: "50px", cursor: "pointer" }}
            />
          </Badge>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={[
          UnReadNotifications?.data?.length == 0 ? "markAsRead" : "",
        ]}
        style={{
          overflowY: "auto",
          maxHeight: "80vh",
        }}
        variant="flat"
        aria-label="Dropdown menu with shortcut"
      >
        <DropdownItem onClick={handleMarkAllAsRead} key={`markAsRead`}>
          <div className="gap-2 flex flex-row items-center">
            <FaCheck />
            <span>Mark all as read</span>
          </div>
        </DropdownItem>
        {Notifications?.data?.map((notification: any, idx: any) => {
          let isReadByMe =
            notification?.read_by?.filter(
              (item: any) =>
                item?.userId == user?.user_id && item?.read_status == 1
            ).length > 0;
          return (
            <DropdownItem key={`new ${idx}`}>
              <div
                onClick={() => {
                  !isReadByMe && handleReadNotification(notification);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: isReadByMe ? "#EEE" : "transparent",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "5px",
                  width: "300px",
                  padding: "8px",
                  borderRadius: "10px",
                }}
              >
                <p className="w-[100px] font-semibold flex flex-row gap-8 justify-between">
                  <span>{notification?.header}</span>
                </p>

                <div className="flex flex-row gap-1 w-full">
                  <User
                    name=""
                    description=""
                    avatarProps={{
                      src: `${process.env.NEXT_PUBLIC_BASE_URL}${notification?.image}`,
                    }}
                  />
                  <p className="flex flex-row gap-4 w-full items-end justify-between">
                    <span
                      className={`w-[100px] notification-body ${
                        isArabic(notification?.body) ? "arabic" : ""
                      }`}
                    >
                      {notification?.body}
                    </span>
                    <span>
                      {moment(notification?.createdAt).format("MM-DD hh:mm A")}
                    </span>
                  </p>
                </div>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Notifications;
