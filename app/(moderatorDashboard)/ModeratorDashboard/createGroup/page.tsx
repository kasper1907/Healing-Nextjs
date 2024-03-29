"use client";
import { StyledDatePicker } from "@/components/Dashboard/UserMain/EditProfile/page";
import { getOne, postRequest } from "@/services/service";
import { Grid, InputLabel, Typography } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

type GroupAssistants = {
  courseId: string;
  groupName: string;
  groupNumber: string;
  groupAssistant: string;
  groupTherapists: string;
};
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [Groups, setGroups] = React.useState([]);
  const { data: Courses, isLoading } = useSWR(`Courses/`, getOne);
  const { data: Assistants } = useSWR(`Users/GetByUserStatus/4`, getOne);
  const [groupData, setGroupData] = useState<GroupAssistants>({
    courseId: "",
    groupName: "",
    groupNumber: "",
    groupAssistant: "",
    groupTherapists: "",
  });
  const { data: Therapists } = useSWR(`Dashboard/GetTherapists/`, getOne);
  const { data: Clients, isLoading: LoadingClients } = useSWR(
    `Dashboard/`,
    getOne
  );

  const handleGetGroups = async (e: any) => {
    const res = await getOne(`Groups/GetByCourseID/${e.target.value}`);
    console.log(res);
    if (res.status == "success") {
      setGroups(res.data);
    } else {
      setGroups([]);
    }
  };

  if (isLoading || LoadingClients)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  let groupNumbers = [
    {
      id: 1,
      name: "8",
    },
    {
      id: 2,
      name: "24",
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!groupData.courseId || !groupData.groupName || !groupData.groupNumber)
      return toast.error("Please fill all fields");
    setLoading(true);
    let newGroupData = {
      courseId: groupData.courseId,
      groupName: groupData.groupName,
      groupNumber: groupData.groupNumber,
      Assistants: groupData.groupAssistant?.split(","),
      Therapists: groupData.groupTherapists?.split(","),
    };
    const res = await postRequest(`Dashboard/CreateGroup`, newGroupData);
    setLoading(false);
    if (res.status == 200) {
      toast.success("Group Created Successfully");
      setGroupData({
        courseId: "",
        groupName: "",
        groupNumber: "",
        groupAssistant: "",
        groupTherapists: "",
      });
    } else {
      toast.error(res.data.message || "Something went wrong");
    }
  };

  // console.log(groupData?.groupAssistant?.join(","));

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          color={"primary"}
          variant="h6"
          sx={{ mb: 2, ml: 2, fontWeight: "400" }}
        >
          Create New Therapy Group
        </Typography>{" "}
      </Grid>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid item xs={12} md={12}>
          <Select
            items={Courses?.data}
            aria-label="Select Course"
            onChange={(e) => {
              handleGetGroups(e),
                setGroupData({ ...groupData, courseId: e.target.value });
            }}
            placeholder="Select Course"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            value={groupData.courseId}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 font-[Tajawal]"
                >
                  <div className="flex flex-col">
                    <span>{item.data.course_name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.course_name}>
                <div className="flex gap-2 items-center font-[Tajawal]">
                  <div className="flex flex-col">
                    <span className="text-small">{user.course_name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Select
            items={groupNumbers}
            aria-label="Select Group Number"
            onChange={(e) => {
              handleGetGroups(e),
                setGroupData({ ...groupData, groupNumber: e.target.value });
            }}
            placeholder="Select Group Number"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            value={groupData.groupNumber}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 font-[Tajawal]"
                >
                  <div className="flex flex-col">
                    <span>{item.data.name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(group: any) => (
              <SelectItem key={group.name} textValue={group.name}>
                <div className="flex gap-2 items-center font-[Tajawal]">
                  <div className="flex flex-col">
                    <span className="text-small">{group.name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Input
            type="text"
            value={groupData.groupName}
            onChange={(e) =>
              setGroupData({ ...groupData, groupName: e.target.value })
            }
            label="Group Name"
          />
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            label="Group Therapists (you can select multiple Therapists)"
            isMultiline={true}
            selectionMode="multiple"
            items={Therapists?.data || []}
            value={groupData.groupTherapists}
            onChange={(e) => {
              setGroupData({
                ...groupData,
                groupTherapists: e.target.value,
              });
            }}
            placeholder="Select a Therapist"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item: any) => (
                    <Chip key={item.key}>{item.data.user_name}</Chip>
                  ))}
                </div>
              );
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.user_name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.user_name}
                    className="flex-shrink-0"
                    size="sm"
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "files/static_assets/male-av.jpg"
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.user_name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Select
            items={Assistants?.data}
            label="Group Assistant (you can select multiple Assistants)"
            variant="bordered"
            isMultiline={true}
            value={groupData.groupAssistant}
            onChange={(e) => {
              setGroupData({ ...groupData, groupAssistant: e.target.value });
            }}
            selectionMode="multiple"
            placeholder="Select Assistants"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "min-h-unit-12 py-2",
            }}
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item: any) => (
                    <Chip key={item.key}>{item.data.user_name}</Chip>
                  ))}
                </div>
              );
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.user_name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user?.user_name}
                    className="flex-shrink-0"
                    size="sm"
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "files/static_assets/male-av.jpg"
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.user_name}</span>
                    <span className="text-tiny text-default-400">
                      {"Assistant"}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            isLoading={loading}
            type="submit"
            color="primary"
            style={{ width: "200px" }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Page;
