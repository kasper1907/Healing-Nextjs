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
  Chip,
  CircularProgress,
} from "@nextui-org/react";
import { isArabic } from "@/utils/checkLanguage";
import Image from "next/image";

export default function ReportsTable({ Reports, handleAddTab }: any) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  let reports = Reports[0]?.reports;
  let MemoizedReports = React.useMemo(() => {
    let reportsWithKeys = reports?.map((item: any, idx: number) => {
      return { ...item, key: idx };
    });
    return reportsWithKeys;
  }, [reports]);

  const pages = Math.ceil(MemoizedReports.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return MemoizedReports.slice(start, end);
  }, [page, MemoizedReports]);

  return (
    <Table
      className="w-full h-[95%] max-h-[430px]"
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "w-full  mt-4",
      }}
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="report_num">Report Number</TableColumn>
        <TableColumn key="client_name">Client</TableColumn>
        <TableColumn key="course">Course</TableColumn>

        <TableColumn key="Actions">Actions</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          !reports?.length ? (
            <div className="w-full flex justify-center items-center">
              <CircularProgress size="sm" /> Loading Reports...
            </div>
          ) : (
            "No Reports found"
          )
        }
        items={items || []}
      >
        {(item: any) => (
          <TableRow
            style={{
              borderBottom: "1px solid #EEE",
            }}
            key={item.name}
          >
            <TableCell>{item.ReportId}</TableCell>
            <TableCell
              style={{
                fontFamily: isArabic(item?.report_num) ? "Tajawal" : "inherit",
              }}
            >
              <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                <span>{item?.report_num}</span>
              </div>
            </TableCell>
            <TableCell style={{ fontFamily: "Tajawal" }}>
              <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                <span>{item.client_name}</span>
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + item?.clientImage}
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
            <TableCell style={{ fontFamily: "Tajawal" }}>
              <div className="w-full flex flex-row-reverse justify-end gap-2 items-center">
                <span className="!font-[Tajawal]">
                  {Reports[0]?.course_name}
                </span>
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL2 + Reports[0]?.logo}
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
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleAddTab(item?.ReportId);
                }}
              >
                View
              </span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
