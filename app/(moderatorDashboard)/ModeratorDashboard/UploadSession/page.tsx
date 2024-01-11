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

  const decodedToken = jwt.decode(userToken) as any;

  const { data: ModeratorGroups, isLoading } = useSWR(`Groups`, getOne);
  const [loading, setLoading] = useState(false);
  const [Session, setSession] = useState({
    title: "",
    date: "",
    group_id: "",
    link: "",
  });

  const handleUploadVideo = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await postRequest(`Videos/uploadSessionVideo`, Session);
    if (res.status == 200) {
      setSession({
        title: "",
        date: "",
        group_id: "",
        link: "",
      });
      toast.success("Session Saved Successfully");
    } else {
      toast.error(res?.data?.message);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleUploadVideo}>
      <Typography className="flex flex-col gap-1">
        Upload A Session Video
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
        {" "}
        <Input
          autoFocus
          label="Video Title"
          placeholder="Enter Video Title"
          variant="bordered"
          value={Session?.title}
          onChange={(e) => {
            setSession({
              ...Session,
              title: e.target.value,
            });
          }}
        />
        <Input
          autoFocus
          label="Video Date"
          placeholder="Enter Video Date"
          variant="bordered"
          value={Session?.date}
          onChange={(e) => {
            setSession({
              ...Session,
              date: e.target.value,
            });
          }}
        />
        <Input
          autoFocus
          label="Video Link"
          placeholder="Enter Video Link"
          variant="bordered"
          value={Session?.link}
          onChange={(e) => {
            setSession({
              ...Session,
              link: e.target.value,
            });
          }}
        />
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            label={
              ModeratorGroups?.status == "error"
                ? ModeratorGroups?.message
                : "Choose A Group"
            }
            className=""
            value={Session?.group_id}
            onChange={(e) => {
              setSession({
                ...Session,
                group_id: e.target.value,
              });
            }}
          >
            {ModeratorGroups?.data?.map((group: any) => (
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
