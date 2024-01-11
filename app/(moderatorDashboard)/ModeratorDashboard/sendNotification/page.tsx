"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useSWR from "swr";
import { getOne, postRequest } from "@/services/service";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";
import { Box, Typography } from "@mui/material";
import { isArabic } from "@/utils/checkLanguage";
export default function Page({ isOpen, onOpen, onOpenChange, user }: any) {
  const [userToken, setUserToken] = useCookie("SID");
  const [loading, setLoading] = useState(false);
  const [Notification, setNotification] = useState({
    header: "",
    body: "",
    groupId: "",
    courseId: user?.course_id,
  });

  const decodedToken = jwt.decode(userToken) as any;

  const { data: AllGroups, isLoading } = useSWR(`Groups`, getOne);

  const handleSendNotification = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await postRequest(`Notifications/Send`, Notification);
    if (res.status == 201) {
      onOpenChange();
      setNotification({
        header: "",
        body: "",
        groupId: "",
        courseId: user?.course_id,
      });
      toast.success("Notification Sent Successfully");
    } else {
      toast.error(res?.data?.message);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSendNotification}>
      <Typography className="flex flex-col gap-1">
        Send A Custom Notification
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mb: 4,
          mt: 2,
        }}
      >
        <Input
          autoFocus
          label="header"
          placeholder="Enter Notification Header"
          variant="bordered"
          value={Notification?.header}
          onChange={(e) => {
            setNotification({
              ...Notification,
              header: e.target.value,
            });
          }}
        />

        <Textarea
          label="Description"
          variant="bordered"
          placeholder="Enter your description"
          disableAnimation
          disableAutosize
          classNames={{
            input: "resize-y min-h-[80px]",
          }}
          value={Notification?.body}
          onChange={(e) => {
            setNotification({
              ...Notification,
              body: e.target.value,
            });
          }}
        />

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            label={isLoading ? "Loading Groups..." : "Select A Group"}
            className=""
            value={Notification?.groupId}
            onChange={(e) => {
              setNotification({
                ...Notification,
                groupId: e.target.value,
              });
            }}
          >
            {AllGroups?.data?.map((group: any) => (
              <SelectItem
                style={{
                  fontFamily: isArabic(group?.group_name)
                    ? "Tajawal"
                    : "Roboto",
                }}
                key={group.id}
                value={group.id}
              >
                {group?.group_name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" color="primary" isLoading={loading}>
          Send
        </Button>
      </Box>
    </form>
  );
}
