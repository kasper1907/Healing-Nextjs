"use server";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
// import { mutate } from "swr";
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
export const updateRequest: any = async ({ id, endpoint, data }: any) => {
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
    return {
      status: res.status,
      data: res?.data,
    };
  } catch (e: any) {
    return { status: e?.response?.status, data: e?.response?.data };
  }
};
export const deleteRequest: any = async ({ id, endpoint }: any) => {
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
    return {
      status: res.status,
      data: res?.data,
    };
  } catch (e: any) {
    return { status: e?.response?.status, data: e?.response?.data };
  }
};
export const getOne: any = async (endPoint: any, body: any) => {
  const accessToken = cookies().get("SID")?.value;
  try {
    const res = await axios.get(`${baseUrl}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        contentType: "application/json",
      },
    });
    return res.data;
  } catch (e: any) {
    return e.message;
  }
};

export const patchRequest: any = async ({ id, endpoint, data }: any) => {
  const accessToken = await getCookie();
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`);
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return {
      status: res.status,
      data: res?.data,
    };
  } catch (e: any) {
    return { status: e?.response?.status, data: e?.response?.data };
  }
};
