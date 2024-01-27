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
import { Box, InputLabel, Typography } from "@mui/material";
import { isArabic } from "@/utils/checkLanguage";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
export default function Page({ isOpen, onOpen, onOpenChange, user }: any) {
  const [userToken, setUserToken] = useCookie("SID");

  const decodedToken = jwt.decode(userToken) as any;

  const { data: ModeratorGroups, isLoading } = useSWR(`Groups`, getOne);
  const [loading, setLoading] = useState(false);
  const [Session, setSession] = useState({
    title: "",
    date: dayjs(),
    group_id: 0,
    link: "",
  });

  const handleUploadVideo = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await postRequest(`Videos/uploadSessionVideo`, Session);

    if (res.status == 200) {
      setSession({
        title: "",
        date: dayjs(),
        group_id: 0,
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
        <InputLabel>Session Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={dayjs(Session?.date)}
              onChange={(e) => {
                setSession({
                  ...Session,
                  date: e as any,
                });
              }}
              sx={{
                width: "100%",
                mt: "-15px",
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  marginTop: "-8px",
                  border: "1px solid #EEE",
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <InputLabel>Video Link</InputLabel>
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
        <InputLabel>Related Group</InputLabel>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            label={
              ModeratorGroups?.status == "error"
                ? ModeratorGroups?.message
                : "Choose A Group"
            }
            className="!font-[Tajawal]"
            value={Session?.group_id}
            onChange={(e) => {
              setSession({
                ...Session,
                group_id: +e.target.value,
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
