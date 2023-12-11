"use client";

import { ReactNode, createContext, useState } from "react";

const VideoContext = createContext({});

const UseVideoContextProvider = ({ children }: { children: ReactNode }) => {
  const [Video, setVideo] = useState<any>({ name: "test" });
  return (
    <VideoContext.Provider
      value={{
        Video,
        setVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { UseVideoContextProvider, VideoContext };
