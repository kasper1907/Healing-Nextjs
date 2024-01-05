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
} from "@nextui-org/react";
import { users } from "./data";
import { Tooltip, Typography } from "@mui/material";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { FcHighPriority, FcOk } from "react-icons/fc";
import ActionsMenu from "./Actions";
import Image from "next/image";

export default function App() {
  const [page, setPage] = React.useState(1);
  const [membersList, setMembersList] = React.useState([]);
  const { data: Members, isLoading } = useSWR(`Dashboard`, getOne, {
    onSuccess: (data) => {
      let dataWithKey = data?.data?.map((item: any, idx: any) => {
        return { ...item, key: idx + 1 };
      });
      setMembersList(dataWithKey);
    },
  });

  const rowsPerPage = 11;

  const pages = Math.ceil(membersList?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return membersList?.slice(start, end);
  }, [page, membersList]);

  return (
    <>
      <Typography
        color={"primary"}
        variant="h6"
        sx={{ mb: 2, ml: 2, fontWeight: "400" }}
      >
        Members List
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
          <TableColumn key="name">Client Name</TableColumn>
          <TableColumn key="phone">Phone</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="course">Course</TableColumn>
          {/* <TableColumn key="username">Username</TableColumn>
          <TableColumn key="password">Password</TableColumn> */}
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="bct">BCT</TableColumn>
          <TableColumn key="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: any) => (
            <TableRow
              style={{
                borderBottom: "1px solid #EEE",
                background: item.key % 2 == 0 ? "#F5F5F5" : "",
              }}
              key={item.name}
            >
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.full_name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell style={{ fontFamily: "Tajawal" }}>
                <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                  <span>{item.CourseName}</span>
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
              {/* <TableCell>{item.UserName}</TableCell>
              <TableCell>{item.Password}</TableCell> */}
              <TableCell>
                {item.Aceeptby == 0
                  ? "Not Accepted"
                  : "Accepted By " + item?.Aceeptby}
              </TableCell>
              <TableCell>
                {item?.BCTS ? (
                  <Tooltip title="Uploaded The BCT Scan">
                    <Image
                      src={"/images/success.svg"}
                      width={15}
                      height={15}
                      alt="success"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Client Doesn't Uploaded The BCT Scan">
                    <Image
                      src={"/images/error.svg"}
                      width={15}
                      height={15}
                      alt="success"
                    />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <ActionsMenu item={item} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
