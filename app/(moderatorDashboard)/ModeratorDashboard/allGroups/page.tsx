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
} from "@nextui-org/react";
import { Tooltip, Typography } from "@mui/material";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { FcHighPriority, FcOk } from "react-icons/fc";
import ActionsMenu from "@/components/ModeratorDashboard/MembersList/Actions";
import Image from "next/image";
import { isArabic } from "@/utils/checkLanguage";
import GroupsTableActions from "@/components/ModeratorDashboard/MembersList/GroupsTableActions";

export default function Page() {
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

  const rowsPerPage = 11;

  const pages = Math.ceil(groupsList?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return groupsList?.slice(start, end);
  }, [page, groupsList]);
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
          <TableColumn key="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <div className="w-full flex justify-center items-center">
                <CircularProgress size="sm" /> Fetching Groups...
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
