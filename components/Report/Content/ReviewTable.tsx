import { getOne } from "@/services/service";
import { CircularProgress } from "@nextui-org/react";
import React from "react";
import useSWR from "swr";

const ReviewTable = ({ tableName, userSelections, Table }: any) => {


  const { data, isLoading, error } = useSWR(
    `Reports/getAllStaticData/${tableName}`,
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">
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


  const combinedArray = userSelections.map((userSelection: any) => {
    if (userSelection.status != "" || userSelection.place != "") {
      const staticData = data?.data.find(
        (data: any) => data.B_id === userSelection.B_id
      );
      return { ...userSelection, ...staticData };
    } else {
      return;
    }
  });

  const test = new Set(combinedArray);
  const finalData = Array.from(test);
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
        {finalData?.length > 0
          ? finalData?.map((el: any, idx: any) => {
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

export default ReviewTable;
