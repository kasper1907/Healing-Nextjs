"use client";
import { createContext, useContext, useState } from "react";
// Creating the user context
const TabsContext = createContext({});

// Making the function which will wrap the whole app using Context Provider
export default function TabsContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dashboardTabsValue, setDashboardTabsValue] = useState<any>("1");
  const [userTabsValue, setUserTabsValue] = useState<any>("1");

  return (
    <TabsContext.Provider
      value={{
        dashboardTabsValue,
        setDashboardTabsValue,
        userTabsValue,
        setUserTabsValue,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

// Make useTabsContext Hook to easily use our context throughout the application
export function useTabsContext() {
  return useContext(TabsContext);
}
