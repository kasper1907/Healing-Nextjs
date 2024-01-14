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
  CircularProgress,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const [Groups, setGroups] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { data: Courses, isLoading } = useSWR(`Courses/`, getOne);
  const { data: Assistants } = useSWR(`Users/GetByUserStatus/4`, getOne);
  const { data: Therapists } = useSWR(`Dashboard/GetTherapists/`, getOne);
  const { data: Clients, isLoading: LoadingClients } = useSWR(
    `Dashboard/`,
    getOne
  );

  const [Member, setMember] = React.useState({
    user_id: "",
    group_id: "",
    course_id: "",
  });

  const handleGetGroups = async (e: any) => {
    const res = await getOne(`Groups/GetByCourseID/${e.target.value}`);
    if (res.status == "success") {
      setGroups(res.data);
    } else {
      setGroups([]);
    }
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toggleLoading();
    console.log(
      `Dashboard/AddMemberToGroup/${Member.user_id}/${Member.group_id}`
    );
    const res = await postRequest(
      `Dashboard/AddMemberToGroup/${Member.user_id}/${Member.group_id}`,
      { courseId: Member.course_id }
    );
    console.log(res);
    if (res.status == "success") {
      // window.location.reload();
    }
    toggleLoading();
  };

  if (isLoading || LoadingClients)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  return (
    <Grid container>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography
            color={"primary"}
            variant="h6"
            sx={{ mb: 2, ml: 2, fontWeight: "400" }}
          >
            Add Member To Group
          </Typography>{" "}
        </Grid>

        <Grid item xs={12} md={12}>
          <Select
            items={Courses?.data}
            value={Member?.course_id}
            aria-label="Select Course"
            onChange={(e) => {
              handleGetGroups(e),
                setMember({ ...Member, course_id: e.target.value });
            }}
            placeholder="Select Course"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
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
        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            value={Member?.group_id}
            onChange={(e) => setMember({ ...Member, group_id: e.target.value })}
            items={Groups}
            placeholder={
              Groups?.length > 0
                ? "Select A Group"
                : "No Groups Found For This Course"
            }
            labelPlacement="outside"
            aria-label="Select A Group"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 font-[Tajawal]"
                >
                  <div className="flex flex-col">
                    <span>{item.data.group_name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.group_name}>
                <div className="flex gap-2 items-center font-[Tajawal]">
                  <div className="flex flex-col">
                    <span className="text-small">{user.group_name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <div className="h-12 flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
              value={Member?.user_id}
              onChange={(e) =>
                setMember({ ...Member, user_id: e.target.value })
              }
              className="h-12"
              classNames={{}}
              placeholder="Search for a Client"
              defaultItems={Clients?.data}
            >
              {(item: any) => (
                <AutocompleteItem key={item.full_name}>
                  {item.full_name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            type="submit"
            isLoading={loading}
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
