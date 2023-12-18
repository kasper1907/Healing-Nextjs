"use client";
import useCookie from "react-use-cookie";
export const Logout = () => {
  document.cookie = `SID=; expires=u, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.localStorage.removeItem("userData");
  return true;
};
