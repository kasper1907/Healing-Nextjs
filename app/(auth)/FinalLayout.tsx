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
  // console.log(i18n.resolvedLanguage);
  const languagesFonts: any = {
    ar: "Tajawal, sans-serif !important",
    en: "Roboto, sans-serif !important",
  };
  return (
    <html
      lang={i18n.resolvedLanguage}
      dir={i18n.resolvedLanguage == "en" ? "ltr" : "rtl"}
      style={{
        fontFamily: languagesFonts[i18n.resolvedLanguage],
      }}
    >
      <Head>
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <link rel="icon" href="/images/healing-logo.svg" sizes="any" />
      <body style={{ padding: "0", margin: "0" }}>
        <ThemeProvider theme={theme}>
          <Toaster />
          <React.Suspense fallback={<div>Loading...</div>}>
            {children}
          </React.Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default FinalLayout;
