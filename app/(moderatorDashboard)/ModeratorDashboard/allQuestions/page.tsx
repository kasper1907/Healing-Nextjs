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
  Chip,
  Button,
  useDisclosure,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
} from "@nextui-org/react";
import { Tooltip, Typography } from "@mui/material";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { FcHighPriority, FcOk } from "react-icons/fc";
import ActionsMenu from "@/components/ModeratorDashboard/MembersList/Actions";
import Image from "next/image";
import { isArabic } from "@/utils/checkLanguage";
import GroupsTableActions from "@/components/ModeratorDashboard/MembersList/GroupsTableActions";
import AllReportsActionsMenu from "@/components/ModeratorDashboard/AllReports/TableActions";
import { HiDotsVertical } from "react-icons/hi";
import EditQuestion from "@/components/ModeratorDashboard/Question/EditQuestion";
import CreateQuestion from "@/components/ModeratorDashboard/Question/CreateQuestion";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [currentItem, setCurrentItem] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [groupsList, setGroupsList] = React.useState([]);
  const { data, isLoading } = useSWR(`Dashboard/getQuestions`, getOne, {
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
    let filteredQuestions = [...groupsList];

    if (hasSearchFilter) {
      filteredQuestions = filteredQuestions.filter((question: any) =>
        question?.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredQuestions;
  }, [groupsList, filterValue, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

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
        All Questions
      </Typography>
      <div className="flex flex-col md:flex-row justify-between items-center mb-0 md:mb-4">
        <Input
          isClearable
          className="w-full sm:max-w-[44%] mb-4"
          placeholder="Search by Question Title..."
          startContent={<SearchIcon />}
          value={filterValue}
          style={{
            fontFamily: isArabic(filterValue) ? "Tajawal" : "Roboto",
          }}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />

        <div>
          {" "}
          <Button
            color={undefined}
            style={{
              borderColor: "#10458C",
              color: "#10458C",
            }}
            onClick={() => {
              onOpen2();
            }}
            variant="bordered"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            }
          >
            Add New Question
          </Button>
        </div>
      </div>
      <Table
        isStriped
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="report_num">Title</TableColumn>
          <TableColumn key="client_name">Type</TableColumn>
          <TableColumn key="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <div className="w-full flex justify-center items-center">
                <CircularProgress size="sm" /> Loading data...
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
                  fontFamily: isArabic(item?.title) ? "Tajawal" : "inherit",
                }}
              >
                <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                  <span>{item?.title}</span>
                </div>
              </TableCell>
              <TableCell
                style={{
                  fontFamily: isArabic(item?.type) ? "Tajawal" : "inherit",
                }}
              >
                <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                  <span>{item?.type}</span>
                </div>
              </TableCell>

              <TableCell>
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
                  <DropdownMenu
                    disabledKeys={["delete"]}
                    aria-label="Action event example"
                  >
                    <DropdownItem
                      key="edit"
                      onClick={() => {
                        onOpen();
                        setCurrentItem(item);
                      }}
                    >
                      Edit Questions
                    </DropdownItem>

                    <DropdownItem
                      onClick={() => {
                        onOpen();
                      }}
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditQuestion
        item={currentItem}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <CreateQuestion
        item={currentItem}
        isOpen={isOpen2}
        onOpen={onOpen2}
        onClose={onClose2}
      />
    </>
  );
}
