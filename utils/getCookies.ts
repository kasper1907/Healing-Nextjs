export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie name matches the provided name
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

// Example: Get the value of a cookie named 'myCookie'
