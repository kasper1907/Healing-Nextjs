import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/sass/main.sass";
import Navbar from "./components/shared/Navbar";
import Head from "next/head";
import { Suspense } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Footer from "./components/Landing/Footer/page";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Loading = () => {
    return <div>Loading...</div>;
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
