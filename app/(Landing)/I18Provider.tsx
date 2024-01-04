"use client";
import React from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/Theme/theme";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Landing/Footer/page";
import "../globals.css";
const I18Provider = ({
  children,
  accessToken,
}: {
  children: React.ReactNode;
  accessToken: string | undefined;
}) => {
  return (
    <html
      style={{
        fontFamily: "Tajawal, sans-serif !important",
      }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/images/healing-logo.svg" sizes="any" />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,100;1,200;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ padding: "0", margin: "0" }}>
        <main className="flex h-fit min-h-screen flex-col items-center justify-between bg-[#f5f2ec]">
          <Navbar accessToken={accessToken} />
          {children}
          <Footer />{" "}
        </main>
      </body>
    </html>
  );
};

export default I18Provider;
