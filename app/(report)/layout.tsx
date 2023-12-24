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
import NEXTUiProvider from "./NextUIProvider";
export const metadata = {
  title: "BCT Report",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/healing-logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          padding: "0",
          margin: "0",
          background: "#F8F8F8",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        <UseUserContextProvider>
          <AuthProvider>
            <Toaster richColors={true} />
            <NEXTUiProvider>{children}</NEXTUiProvider>
          </AuthProvider>
        </UseUserContextProvider>
      </body>
    </html>
  );
}
