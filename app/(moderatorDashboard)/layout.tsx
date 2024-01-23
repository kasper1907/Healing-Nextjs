import DashboardNavbar from "@/components/Dashboard/Navbar/page";
import "../globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/utils/Theme/theme";
import { Toaster } from "sonner";
import TabsContextComponent from "@/components/Dashboard/TabsContext";
import { Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import { UseUserContextProvider } from "@/contexts/mainContext";
import { UseVideoContextProvider } from "@/contexts/VideoContext";
import AuthProvider from "@/components/Dashboard/AuthProvider/page";
import { cookies } from "next/dist/client/components/headers";
import PrelineScript from "@/components/PrelineScript";
import LayoutWrapper from "./ModeratorDashboard/LayoutWrapper";
export const metadata = {
  title: "Healing Dashboard",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await cookies().get("SID")?.value;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/healing-logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          padding: "0",
          margin: "0",
          background: "#FFF",
          overflowX: "hidden",
          minHeight: "100vh",
          height: "fit-content",
          fontFamily: "Roboto",
        }}
      >
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <UseUserContextProvider>
            <AuthProvider>
              <Toaster richColors={true} />
              <LayoutWrapper>{children}</LayoutWrapper>
            </AuthProvider>
          </UseUserContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
