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
import { toast } from "sonner";
import useSWR from "swr";

const Page = () => {
  const [Groups, setGroups] = React.useState([]);
  const [Course, setCourse] = React.useState<any>({});
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
  console.log(Member);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!Member.user_id || !Member.group_id)
      return toast.error("Please Fill All Fields");
    setLoading(true);
    console.log(
      `Dashboard/AddMemberToGroup/${Member.user_id}/${Member.group_id}`
    );
    const res = await postRequest(
      `Dashboard/AddMemberToGroup/${Member.user_id}/${Member.group_id}`,
      { courseId: Member.course_id }
    );

    if (res.status == "201") {
      toast.success("Member Added Successfully");
      setLoading(false);
    } else {
      toast.error(res.data.message || "Something Went Wrong");
      setLoading(false);
    }
  };

  const handleUsesCourseAndCourseGroups = async (e: any) => {
    const User = await getOne(`Users/getOne/${e}`);
    const CourseId = User?.data?.course_id;

    let Groups = await getOne(`Groups/GetByCourseID/${CourseId}`);
    Groups = Groups?.data;

    let Course = await getOne(`Courses/getOne/${CourseId}`);
    Course = Course?.data;
    setCourse(Course);
    setGroups(Groups);
    setMember({ ...Member, course_id: CourseId, user_id: e });
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

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <div className="h-12 flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
              value={Member?.user_id}
              onSelectionChange={(e) => {
                setMember({ ...Member, user_id: e as string }),
                  handleUsesCourseAndCourseGroups(e);
              }}
              className="h-12"
              classNames={{}}
              placeholder="Search for a Client"
              defaultItems={Clients?.data}
            >
              {(item: any) => (
                <AutocompleteItem key={item.id}>
                  {item.full_name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Input
            style={{
              fontFamily: "Tajawal",
            }}
            readOnly
            value={Course?.course_name || "برجاء اختيار العميل اولا"}
          />
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            value={Member?.group_id}
            isMultiline={false}
            selectionMode="single"
            onSelectionChange={(e) => {
              setMember({
                ...Member,
                group_id: Array.from(new Set(e))[0] as string,
              });
            }}
            items={Groups || []}
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
