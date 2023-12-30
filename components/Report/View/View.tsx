"use client";
import { getOne } from "@/services/service";
import { CircularProgress } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import "@/styles/reports/main.css";
import { MdErrorOutline } from "react-icons/md";
import Image from "next/image";

const ViewReport = ({
  tableName,
  userSelections,
  Table,
  userId,
  groupId,
}: any) => {
  //   const searchParams = useSearchParams();
  //   const userId = searchParams.get("id");
  //   const groupId = searchParams.get("groupId");

  const { data: User, isLoading: UserLoading } = useSWR(
    `Users/getOne/${userId}`,
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const {
    data: Data,
    isLoading,
    error,
  } = useSWR(`Reports/getClientReport/${User?.data?.password}`, getOne, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (isNaN(userId as any)) {
    return (
      <div className="w-full h-screen flex gap-8 flex-col items-center justify-center">
        <Image
          src={"/images/Reports/400.svg"}
          width={200}
          height={200}
          alt="400"
        />
        <p className="text-red-500">
          عذرا لقد حدث خطأ ما. برجاء المحاوله في وقت لاحق
        </p>
      </div>
    );
  }
  let data: any = null;
  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-row items-center justify-center">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!Data?.data?.length) {
    return (
      <div className="w-full h-screen flex gap-8 flex-col items-center justify-center">
        <Image
          src={"/images/Reports/404.svg"}
          width={200}
          height={200}
          alt="404"
        />
        <p className="text-red-500">لا يوجد تقرير للمستخدم !</p>
      </div>
    );
  }

  return (
    <table className="table table-striped">
      <thead className="table-header">
        <tr style={{ width: "100%" }}>
          <th style={{ width: "10%" }}>النسيج</th>
          <th style={{ width: "6%" }}>الجدول</th>
          <th style={{ width: "15%" }}>الوظيفة والتماهي الوظيفي</th>
          <th style={{ width: "15%" }}>التماهي السلوكي</th>
          <th style={{ width: "15%" }}>التماهي الشعوري</th>
          <th style={{ width: "15%" }}>اعراض اضطراب النسيج</th>
          <th style={{ width: "11%" }}>مركز التحكم العصبي</th>
          <th style={{ width: "8%" }}>حالة الصدمة</th>
          <th style={{ width: "4%" }}>الفص</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {Data?.data?.length > 0
          ? Data?.data?.map((el: any, idx: any) => {
              return (
                <tr key={idx} style={{ width: "100%" }}>
                  <th scope="row" style={{ width: "10%" }}>
                    {el?.name_texture}
                  </th>
                  <td style={{ width: " 6%" }}>
                    <p>{el?.tableNameArabic}</p>
                  </td>
                  <td style={{ width: " 15%" }}>
                    <p>{el?.functional}</p>
                  </td>
                  <td style={{ width: " 15%" }}>
                    <p>{el?.behavioral}</p>
                  </td>
                  <td style={{ width: " 15%" }}>
                    <p>{el?.emotional}</p>
                  </td>
                  <td style={{ width: " 15%" }}>
                    <p>{el?.side_effect}</p>
                  </td>
                  <td style={{ width: " 11%" }}>
                    <p>{el?.control_center}</p>
                  </td>
                  <td style={{ width: "8%" }}>
                    <p>{el?.status}</p>
                  </td>
                  <td style={{ width: "4%" }}>
                    <p>{el?.place}</p>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default ViewReport;
