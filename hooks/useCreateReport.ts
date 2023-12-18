"use client";
import { postRequest } from "@/services/service";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateReport = ({
  userSelections,
  tableName,
  setOpen,
  setUserSelections,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const createReport = async (e: any) => {
    console.log("Submit Form");
    e.preventDefault();
    setLoading(true);
    let postBody = {
      TableName: tableName,
      SelectedValues: userSelections,
    };

    let selectedValuesOnly = userSelections.filter((item: any) => {
      return item.status?.length > 0 || item.place?.length > 0;
    });
    if (selectedValuesOnly.length == 0) {
      toast.warning("برجاء اختيار البيانات المراد تقريرها");
      setLoading(false);
      return;
    }
    const res = await postRequest("Reports/createReports", postBody);
    if (res.status == 201) {
      setSuccess(true);
      setError(false);
      toast.success("تم انشاء التقرير بنجاح");
      setOpen(false);
      setUserSelections([]);
    } else {
      setError(true);
      setSuccess(false);
      toast.error(res?.data?.message || res?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return {
    createReport,
    loading,
    error,
    success,
  };
};
