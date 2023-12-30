import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "../globals.css";
import "@/styles/sass/main.sass";

import { cookies } from "next/dist/client/components/headers";
import I18Provider from "./I18Provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Welcome To Healing",
  description: "Created By MTN Dev Team",
  keywords: "healing, mental health, therapy, counseling",
  icons: ["/images/healing-logo.svg"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await cookies().get("SID")?.value;
  return <I18Provider accessToken={accessToken}>{children}</I18Provider>;
}
