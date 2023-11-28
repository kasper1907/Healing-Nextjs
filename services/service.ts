import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";
import { baseUrl } from "./endpoints";

export const postRequest: any = async (
  url: any,
  data: any,
  handleSuccess: any
) => {
  try {
    const res = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.data;
    return result;
  } catch (e: any) {
    return toast.error(e.message);
  }
};
export const updateRequest: any = async ({
  id,
  endpoint,
  data,
  handleSuccess,
}: any) => {
  try {
    const res = await axios.put(`${endpoint}/${id}`, data);
    // console.log(res)
    if (res.status == 200) {
      handleSuccess(data);
      mutate(endpoint);
    }
  } catch (e: any) {
    return toast.error(e.message);
  }
};
export const deleteRequest: any = async ({
  id,
  endpoint,
  handleSuccess,
}: any) => {
  try {
    const res = await axios.delete(`${endpoint}/${id}`);
    if (res.status == 200) {
      toast.success("Item deleted successfully");
      mutate(endpoint);
    } else {
      toast.error("Something went wrong");
    }
  } catch (e: any) {
    return toast.error(e.message);
  }
};
export const getOne: any = async (endPoint: any) => {
  try {
    const res = await axios.get(`${baseUrl}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${document.cookie}`,
      },
    });
    return res.data;
  } catch (e: any) {
    return toast.error(e.message);
  }
};