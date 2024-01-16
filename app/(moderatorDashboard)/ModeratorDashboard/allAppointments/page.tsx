"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  CircularProgress,
  AvatarGroup,
  Avatar,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Input,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Grid, InputLabel, Tooltip, Typography } from "@mui/material";
import { getOne, patchRequest } from "@/services/service";
import useSWR, { mutate } from "swr";
import { FcHighPriority, FcOk } from "react-icons/fc";
import ActionsMenu from "@/components/ModeratorDashboard/MembersList/Actions";
import Image from "next/image";
import { isArabic } from "@/utils/checkLanguage";
import GroupsTableActions from "@/components/ModeratorDashboard/MembersList/GroupsTableActions";
import { HiDotsVertical } from "react-icons/hi";
import UpdateDialog from "@/components/shared/UpdateDialog/UpdateDialog";
import DeleteDialog from "@/components/ModeratorDashboard/GroupsList/Delete";
import moment from "moment";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { toast } from "sonner";

export const Actions = ({
  item,
  openDialog,
  isOpenDialog,
  closeDialog,
  openDeleteDialog,
  isOpenDeleteDialog,
  closeDeleteDialog,
}: any) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          style={{
            userSelect: "none",
            background: "transparent",
            minWidth: 0,
            width: "fit-content",
            padding: 0,
          }}
          variant="light"
        >
          <HiDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event example">
        <DropdownItem
          key="edit"
          onClick={() => {
            openDialog();
          }}
        >
          Edit
        </DropdownItem>

        <DropdownItem
          onClick={() => {
            openDeleteDialog();
          }}
          key="deny"
          className="text-danger"
          color="danger"
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const UpdateForm = ({ item, values, setValues }: any) => {
  return (
    <>
      <Input
        type="text"
        label="Meeting Link"
        defaultValue={item?.meeting_link}
        value={values?.meeting_link}
        onChange={(e) => {
          setValues({ ...values, meeting_link: e.target.value });
        }}
        placeholder="Enter Meeting Link"
      />

      <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: "-10px" }}>
        Select Appointment Date
      </InputLabel>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={dayjs(values?.session_date)}
            onChange={(e: any) => {
              setValues({
                ...values,
                session_date: e,
              });
            }}
            sx={{ width: "100%", mt: "-10px" }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: "-10px" }}>
        Select Appointment Time
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            value={dayjs(values.session_time)}
            onChange={(e: any) => {
              setValues({
                ...values,
                session_time: e,
              });
            }}
            sx={{ width: "100%", mb: 2 }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <Input
        isReadOnly
        type="text"
        label="Group Name"
        variant="bordered"
        defaultValue={item?.group_name}
        className="w-full mt-2"
      />
    </>
  );
};
export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentRow, setCurrentRow] = React.useState({} as any);
  const {
    isOpen: isOpenDeleteDialog,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();

  const [page, setPage] = React.useState(1);
  const [groupsList, setGroupsList] = React.useState([]);

  const { data, isLoading } = useSWR(`Dashboard/getAllAppointments`, getOne, {
    onSuccess: (data) => {
      let dataWithKey = data?.data?.map((item: any, idx: any) => {
        return { ...item, key: idx + 1 };
      });
      setGroupsList(dataWithKey);
    },
  });

  const rowsPerPage = 11;

  const pages = Math.ceil(groupsList?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return groupsList?.slice(start, end);
  }, [page, groupsList]);

  const handleClickActions = (item: any) => {
    onOpen();
    setCurrentRow(item);
  };

  // Update Appointment Functions // El mfrood a3ml custom hook bs mksl xD
  const [values, setValues] = React.useState<any>({
    meeting_link: "",
    session_date: dayjs(),
    session_time: dayjs(),
  });

  React.useEffect(() => {
    setValues({
      meeting_link: currentRow?.meeting_link,
      session_date: currentRow?.session_date,
      session_time: currentRow?.session_time,
    });
  }, [currentRow]);

  const handleSubmit = async () => {
    console.log(values);
    const res = await patchRequest({
      id: currentRow?.id,
      endpoint: `appointments/updateAppointment`,
      data: {
        meeting_link: values?.meeting_link,
        session_date: values?.session_date,
        session_time: new Date(values?.session_time),
      },
    });

    if (res.status == 200) {
      toast.success("Appointment Updated Successfully");
      mutate(`Dashboard/getAllAppointments`);
      onClose();
    } else {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      {/* <img src=" https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=sdsd" /> */}
      <Typography
        color={"primary"}
        variant="h6"
        sx={{ mb: 2, ml: 2, fontWeight: "400" }}
      >
        Appointments
      </Typography>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="name">Group Name</TableColumn>
          <TableColumn key="number">Group Number</TableColumn>
          <TableColumn key="course">Course</TableColumn>
          <TableColumn key="therapists">Therapists</TableColumn>
          <TableColumn key="assistants">Assistants</TableColumn>
          <TableColumn key="Link">Meeting Link</TableColumn>
          <TableColumn key="date">Meeting Date</TableColumn>
          <TableColumn key="time">Meeting Time</TableColumn>
          <TableColumn key="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <div className="w-full flex justify-center items-center">
                <CircularProgress size="sm" /> Getting Appointments...
              </div>
            ) : (
              "No Groups found"
            )
          }
          items={items || []}
        >
          {(item: any) => (
            <TableRow
              style={{
                borderBottom: "1px solid #EEE",
                background: item.key % 2 == 0 ? "#F5F5F5" : "",
              }}
              key={item.name}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell
                style={{
                  fontFamily: isArabic(item?.group_name)
                    ? "Tajawal"
                    : "inherit",
                }}
              >
                <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                  <span>{item?.group_name}</span>
                </div>
              </TableCell>
              <TableCell>
                {item.group_number ? item.group_number : "No Name Found"}
              </TableCell>
              <TableCell style={{ fontFamily: "Tajawal" }}>
                <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                  <span>{item.course_name}</span>
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL2 + item?.logo}
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
                </div>
              </TableCell>

              <TableCell>
                <Tooltip title={item?.therapist_name}>
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}files/static_assets/male-av.jpg`}
                  />
                </Tooltip>
              </TableCell>

              <TableCell>
                {item?.assistant_names?.length > 0 ? (
                  <AvatarGroup isBordered>
                    {item?.assistant_names?.map((el: any, idx: number) => (
                      <Tooltip key={idx} title={el}>
                        <Avatar
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}files/static_assets/male-av.jpg`}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                ) : (
                  <div style={{ fontFamily: "Roboto" }}>N/A</div>
                )}
              </TableCell>
              <TableCell>{item?.meeting_link}</TableCell>
              <TableCell>
                {moment(item?.session_date).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>
                {moment(item?.session_time)?.format("hh:mm A")}
              </TableCell>

              <TableCell>
                <Actions
                  openDialog={() => {
                    handleClickActions(item);
                  }}
                  isOpenDialog={isOpen}
                  closeDialog={onClose}
                  item={item}
                  values={values}
                  setValues={setValues}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UpdateDialog
        title="Update Appointment Details"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        Form={UpdateForm}
        item={currentRow}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        onOpen={openDeleteDialog}
        onClose={closeDeleteDialog}
      />
    </>
  );
}
