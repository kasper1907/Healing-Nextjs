"use client";

import React, { SVGProps } from "react";
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
  Input,
} from "@nextui-org/react";
import { Tooltip, Typography } from "@mui/material";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { FcHighPriority, FcOk } from "react-icons/fc";
import ActionsMenu from "@/components/ModeratorDashboard/MembersList/Actions";
import Image from "next/image";
import { isArabic } from "@/utils/checkLanguage";
import GroupsTableActions from "@/components/ModeratorDashboard/MembersList/GroupsTableActions";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default function Page() {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [groupsList, setGroupsList] = React.useState([]);
  const { data, isLoading } = useSWR(`Groups/GetAllGroups`, getOne, {
    onSuccess: (data) => {
      let dataWithKey = data?.data?.map((item: any, idx: any) => {
        return { ...item, key: idx + 1 };
      });
      setGroupsList(dataWithKey);
    },
  });

  const hasSearchFilter = Boolean(filterValue);
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const rowsPerPage = 11;

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...groupsList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user: any) =>
          user?.group_name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user?.course_name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [groupsList, filterValue, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  // console.log("filteredItems", filteredItems);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);
  return (
    <>
      {/* <img src=" https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=sdsd" /> */}
      <Typography
        color={"primary"}
        variant="h6"
        sx={{ mb: 2, ml: 2, fontWeight: "400" }}
      >
        Therapy Groups
      </Typography>
      <Input
        isClearable
        className="w-full sm:max-w-[44%] mb-4"
        placeholder="Search by group name or by course name..."
        startContent={<SearchIcon />}
        value={filterValue}
        style={{
          fontFamily: isArabic(filterValue) ? "Tajawal" : "Roboto",
        }}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
      <Table
        isStriped
        aria-label="Example table with client side pagination"
        // bottomContent={bottomContent}
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
          <TableColumn key="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <div className="w-full flex justify-center items-center">
                <CircularProgress size="sm" /> Loading Groups...
              </div>
            ) : (
              "No Groups found"
            )
          }
          items={filteredItems || []}
        >
          {(item: any) => (
            <TableRow
              style={{
                borderBottom: "1px solid #EEE",
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
                {item?.therapists?.length > 0 ? (
                  <AvatarGroup isBordered>
                    {item?.therapists?.map((el: any, idx: number) => (
                      <Tooltip key={idx} title={el?.user_name}>
                        <Avatar
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}files/static_assets/male-av.jpg`}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                ) : (
                  "No Therapists"
                )}
              </TableCell>

              <TableCell>
                {item?.assistants?.length > 0 ? (
                  <AvatarGroup isBordered>
                    {item?.assistants?.map((el: any, idx: number) => (
                      <Tooltip key={idx} title={el?.user_name}>
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
              <TableCell>
                <GroupsTableActions item={item} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
