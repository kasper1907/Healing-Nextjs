import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
// import "../globals.css";
import "@/styles/sass/main.sass";
import Navbar from "@/components/shared/Navbar";
import Head from "next/head";
import { Suspense } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Footer from "@/components/Landing/Footer/page";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
