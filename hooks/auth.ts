import { getCookie } from "@/utils/getCookies";
import { cookies } from "next/dist/client/components/headers";

export const isLoggedIn = async (
  SID?: string,
  pathname?: string
): Promise<boolean> => {
  const token = await getCookie("SID");

  // If they have no access token, they are not authenticated.
  if (!token) return false;
  // const userPages = [
  //   "/dashboard/users/userDetails",
  //   "/dashboard/clients",
  //   "/dashboard/clients/[id]",
  // ];

  // If they have, we must ensure it's still valid. It might be expired or invalidated!
  // To do so, normally, we'd call the authentication backend, though, for this example
  // we'll simulate the API call by setting a timeout that resolves after a short delay.
  return new Promise((resolve) => {
    return setTimeout(() => resolve(true), 500);
  });
};
