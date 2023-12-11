import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";
import { baseUrl } from "./endpoints";

export const postRequest: any = async (
  url: any,
  data: any,
  handleSuccess: any
) => {
  console.log(url);
  let body;
  let contentType;
  if (data instanceof FormData) {
    body = data;
    contentType = "multipart/form-data";
  } else {
    body = JSON.stringify(data);
    contentType = "application/json";
  }
  try {
    const res = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${document.cookie}`,
      },
    });
    //console.log(res);
    if (res.status == 201) {
      handleSuccess ? handleSuccess(res.data.data) : "";
    }
    const result = await res;
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
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
      }
    );
    // //console.log(res)
    return res;
  } catch (e: any) {
    return toast.error(e.message);
  }
};
export const deleteRequest: any = async ({
  id,
  endpoint,
  handleSuccess,
  mutateEndPoint,
}: any) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
      }
    );
    if (res.status == 200 || res.status == 204) {
      toast.success("Item deleted successfully");
      mutate(mutateEndPoint);
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
    return e.message;
  }
};
