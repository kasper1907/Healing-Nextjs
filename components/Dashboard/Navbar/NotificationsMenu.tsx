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
import useSWR from "swr";
import { getOne } from "@/services/service";
import moment from "moment";
import { isArabic } from "@/utils/checkLanguage";
export default function App({ accessToken }: any) {
  const [showAlert, setShowAlert] = React.useState(true);
  const [receivedNotifications, setReceivedNotifications] = React.useState([]);
  const decodedToken = jwt.decode(accessToken || "") as any;
  const user = decodedToken?.data;

  const userRole = user?.role;
  const userGroupId = user?.group_id;

  const { data: Notifications, isLoading } = useSWR(
    `Notifications/GetByGroupId/${userGroupId}`,
    getOne,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    setReceivedNotifications(Notifications?.data);
  }, [Notifications?.data]);

  useEffect(() => {
    if (Notifications?.data?.length !== receivedNotifications?.length) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [Notifications?.data, receivedNotifications?.length]);

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
          {showAlert && receivedNotifications?.length > 0 ? (
            <Badge
              onClick={() => {
                if (showAlert) {
                  setShowAlert(false);
                }
              }}
              badgeContent={
                Notifications?.data?.length - receivedNotifications?.length
              }
              color="error"
            >
              <IoMdNotificationsOutline
                size={30}
                style={{ width: "50px", cursor: "pointer" }}
              />
            </Badge>
          ) : (
            <>
              <IoMdNotificationsOutline
                size={30}
                style={{ width: "50px", cursor: "pointer" }}
              />
            </>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
        {Notifications?.data?.map((notification: any) => (
          <DropdownItem key="new">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <User
                name=""
                description=""
                avatarProps={{
                  src: `${process.env.NEXT_PUBLIC_BASE_URL}${notification?.image}`,
                }}
              />
              <div className="flex flex-col gap-1">
                <p className="w-[100px] font-bold flex flex-row gap-8 justify-between">
                  <span>{notification?.header}</span>
                </p>
                <p className="flex flex-row gap-4 justify-between">
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
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
