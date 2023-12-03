"use client";
import { createContext, useContext, useState } from "react";
// Creating the user context
const UserContext = createContext({});

// Making the function which will wrap the whole app using Context Provider
export default function UserContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>({});

  return (
    <UserContext.Provider
      value={{
        setCurrentUser,
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
  return useContext(UserContext);
}
