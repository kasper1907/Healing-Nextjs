import DashboardNavbar from "@/components/Dashboard/Navbar/page";
import "../globals.css";
import "@/styles/sass/Dashboard/main.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/utils/Theme/theme";
import { Toaster } from "sonner";
import TabsContextComponent from "@/components/Dashboard/TabsContext";
import { Suspense } from "react";
export const metadata = {
  title: "Healing Dashboard",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/healing-logo.svg" sizes="any" />
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
      </head>
      <body style={{ padding: "0", margin: "0", background: "#F8F8F8" }}>
        <CssBaseline />
        <TabsContextComponent>
          <ThemeProvider theme={theme}>
            <DashboardNavbar />
            <Toaster />
            {children}
          </ThemeProvider>
        </TabsContextComponent>
      </body>
    </html>
  );
}
