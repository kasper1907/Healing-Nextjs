export const Logout = () => {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.localStorage.removeItem("userData");
  return true;
};
