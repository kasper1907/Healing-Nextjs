"use client";
import React from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "sonner";
import { theme } from "@/utils/Theme/theme";
import Head from "next/head";
import Link from "next/link";
import "./main.css";

const FinalLayout = ({ children }: { children: React.ReactNode }) => {
  const { i18n }: any = useTranslation();
  const languagesFonts: any = {
    ar: "Tajawal, sans-serif !important",
    en: "Roboto, sans-serif !important",
  };

  return (
    <html
      lang={i18n.resolvedLanguage}
      dir={
        i18n.resolvedLanguage == "en"
          ? "ltr"
          : i18n.resolvedLanguage == "ar"
          ? "rtl"
          : ""
      }
      style={{
        fontFamily: languagesFonts[i18n.resolvedLanguage],
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
      <link rel="icon" href="/images/healing-logo.svg" sizes="any" />
      <body style={{ padding: "0", margin: "0" }}>
        <ThemeProvider theme={theme}>
          <Toaster richColors={true} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default FinalLayout;
