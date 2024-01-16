"use client";
import { StyledDatePicker } from "@/components/Dashboard/UserMain/EditProfile/page";
import { getOne, postRequest } from "@/services/service";
import { isArabic } from "@/utils/checkLanguage";
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
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";

const Page = () => {
  const [Groups, setGroups] = React.useState([]);
  const [GroupAssistants, setGroupAssistants] = React.useState([]);
  const [GroupTherapists, setGroupTherapists] = React.useState([]);
  const { data: Courses, isLoading } = useSWR(`Courses/`, getOne);
  const { data: Assistants } = useSWR(`Users/GetByUserStatus/4`, getOne);
  const { data: Therapists } = useSWR(`Dashboard/GetTherapists/`, getOne);
  const { data: Clients, isLoading: LoadingClients } = useSWR(
    `Dashboard/`,
    getOne
  );

  const [loading, setLoading] = React.useState(false);
  const [appointment, setAppointment] = React.useState({
    courseId: "",
    group_id: "",
    therapist_id: "",
    assistant_id: "",
    session_date: dayjs(),
    session_time: dayjs(),
    meeting_link: "",
    isMultipleAssistants: false,
  });

  const handleGetGroups = async (e: any) => {
    const res = await getOne(`Groups/GetByCourseID/${e.target.value}`);
    if (res.status == "success") {
      setGroups(res.data);
    } else {
      setGroups([]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !appointment.courseId ||
      !appointment.group_id ||
      !appointment.therapist_id ||
      !appointment.assistant_id ||
      !appointment.session_date ||
      !appointment.session_time ||
      !appointment.meeting_link
    ) {
      toast.warning("Please Fill All Fields");
      return;
    }

    setLoading(true);
    const res = await postRequest(`Dashboard/createAppointment`, appointment);
    if (res.status == 201) {
      setAppointment({
        courseId: "",
        group_id: "",
        therapist_id: "",
        assistant_id: "",
        session_date: dayjs(),
        session_time: dayjs(),
        meeting_link: "",
        isMultipleAssistants:
          appointment.assistant_id?.split(",")?.length > 1 ? true : false,
      });
      toast.success("Appointment Created Successfully");
    } else {
      toast.error(res?.data?.message);
    }
    setLoading(false);
  };

  const handleGetGroupAssistants = async (id: any) => {
    const res = await getOne(`Dashboard/GetGroupAssistants/${id}`);
    if (res.status == "success") {
      let arrayWithKeys = res.data.map((item: any) => {
        return {
          key: item.assistantId,
          ...item,
        };
      });

      setGroupAssistants(arrayWithKeys);
    } else {
      setGroupAssistants([]);
    }
  };
  const handleGetGroupTherapists = async (id: any) => {
    const res = await getOne(`Dashboard/getGroupTherapists/${id}`);
    if (res.status == "success") {
      let arrayWithKeys = res.data.map((item: any) => {
        return {
          key: item.therapistId,
          ...item,
        };
      });

      setGroupTherapists(arrayWithKeys);
    } else {
      setGroupTherapists([]);
    }
  };

  if (isLoading || LoadingClients)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            color={"primary"}
            variant="h6"
            sx={{ mb: 2, ml: 2, fontWeight: "400" }}
          >
            Create New Appointment
          </Typography>{" "}
        </Grid>

        <Grid item xs={12} md={12}>
          <Select
            items={Courses?.data}
            value={appointment.courseId}
            aria-label="Select Course"
            onChange={(e) => {
              handleGetGroups(e),
                setAppointment({
                  ...appointment,
                  courseId: e.target.value,
                });
            }}
            placeholder="Select Course"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div key={item.key} className="flex items-center gap-2 ">
                  {appointment.courseId?.length > 0 ? (
                    <div
                      className={`${
                        isArabic(item.data.course_name)
                          ? "font-[Tajawal]"
                          : "font-[Roboto]"
                      } flex flex-col`}
                    >
                      <span>{item.data.course_name}</span>
                    </div>
                  ) : (
                    "Select A Course"
                  )}
                </div>
              ));
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.course_name}>
                <div className="flex gap-2 items-center font-[Tajawal]">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={process.env.NEXT_PUBLIC_BASE_URL2 + user?.logo}
                      width={30}
                      height={30}
                      alt="Course Logo"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        background: "#fff",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 5px #0000001A",
                      }}
                    />
                    <span className="text-small">{user.course_name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            items={Groups}
            value={appointment.group_id}
            onChange={(e) => {
              handleGetGroupAssistants(e.target.value),
                handleGetGroupTherapists(e.target.value),
                setAppointment({
                  ...appointment,
                  group_id: e.target.value,
                });
            }}
            placeholder="Select A Group"
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
                  {appointment.group_id?.length > 0 ? (
                    <div
                      className={`${
                        isArabic(item.data.group_name)
                          ? "font-[Tajawal]"
                          : "font-[Roboto]"
                      } flex flex-col`}
                    >
                      {" "}
                      <span>{item.data.group_name}</span>
                    </div>
                  ) : (
                    "Select A Group"
                  )}
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
          <Select
            isMultiline={true}
            selectionMode="multiple"
            items={GroupAssistants || []}
            value={appointment.assistant_id}
            onChange={(e) => {
              setAppointment({
                ...appointment,
                assistant_id: e.target.value,
              });
            }}
            placeholder={
              GroupAssistants?.length
                ? "Select An Assistant"
                : "No Assistants Found"
            }
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            // renderValue={(items) => {
            //   return items.map((item: any) => (
            //     <div key={item.key} className="flex items-center gap-2">
            //       {appointment.assistant_id?.length > 0 ? (
            //         <>
            //           <Avatar
            //             alt={item.data.user_name}
            //             className="flex-shrink-0"
            //             size="sm"
            //             src={
            //               process.env.NEXT_PUBLIC_BASE_URL +
            //               "files/static_assets/male-av.jpg"
            //             }
            //           />
            //           <div className="flex flex-col">
            //             <span>{item.data.user_name}</span>
            //           </div>
            //         </>
            //       ) : (
            //         "Please Select An Assistant"
            //       )}
            //     </div>
            //   ));
            // }}

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
              <SelectItem key={user.id}>
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

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            items={GroupTherapists}
            value={appointment.therapist_id}
            onChange={(e) => {
              setAppointment({
                ...appointment,
                therapist_id: e.target.value,
              });
            }}
            placeholder="Select a Therapist"
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div key={item.key} className="flex items-center gap-2">
                  {appointment.therapist_id?.length > 0 ? (
                    <>
                      <Avatar
                        alt={item.data.user_name}
                        className="flex-shrink-0"
                        size="sm"
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          "files/static_assets/male-av.jpg"
                        }
                      />
                      <div className="flex flex-col">
                        <span>{item.data.user_name}</span>
                      </div>
                    </>
                  ) : (
                    "Select A Therapist"
                  )}
                </div>
              ));
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

        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1 }}>
            Select Appointment Date
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={appointment.session_date}
                onChange={(e: any) => {
                  setAppointment({
                    ...appointment,
                    session_date: e,
                  });
                }}
                sx={{ width: "90%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1 }}>
            Select Appointment Time
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                value={appointment.session_time}
                onChange={(e: any) => {
                  setAppointment({
                    ...appointment,
                    session_time: e,
                  });
                }}
                sx={{ width: "90%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Input
            type="text"
            style={{
              fontFamily: isArabic(appointment.meeting_link)
                ? "Tajawal"
                : "Roboto",
            }}
            value={appointment.meeting_link}
            onChange={(e) => {
              setAppointment({
                ...appointment,
                meeting_link: e.target.value,
              });
            }}
            label="Meeting Link"
          />
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
      </Grid>
    </form>
  );
};

export default Page;
