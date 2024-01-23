"use client";
import { CircularProgress } from "@nextui-org/react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(255 255 255 / 50%)",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <CircularProgress size="sm" aria-label="Loading..." />
      Loading...
    </div>
  );
};

export default LoadingScreen;
