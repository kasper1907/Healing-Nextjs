"use server";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";
import { baseUrl } from "./endpoints";
import { cookies } from "next/dist/client/components/headers";

export const getCookie = async () => {
  const accessToken = cookies().get("SID")?.value;
  return accessToken;
};

export const postRequest: any = async (
  url: any,
  data: any,
  handleSuccess: any
) => {
  const accessToken = await getCookie();

  let body;
  let contentType;
  if (data instanceof FormData) {
    body = data;
    contentType = "multipart/form-data";
  } else {
    body = JSON.stringify(data);
    contentType = "application/json";
  }
  console.log("body", data);
  console.log(url);

  try {
    const res = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": contentType,
      },
    });

    return {
      status: res.status,
      data: res?.data,
    };
  } catch (e: any) {
    return { status: e?.response?.status, data: e?.response?.data };
  }
};
export const updateRequest: any = async ({
  id,
  endpoint,
  data,
  handleSuccess,
}: any) => {
  const accessToken = await getCookie();

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
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
  const accessToken = await getCookie();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const accessToken = cookies().get("SID")?.value;
  // console.log(accessToken);
  try {
    const res = await axios.get(`${baseUrl}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        contentType: "application/json",
      },
    });
    console.log("res", res);
    return res.data;
  } catch (e: any) {
    return e.message;
  }
};
