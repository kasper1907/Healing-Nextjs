import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "../globals.css";
import "@/styles/sass/main.sass";

import { cookies } from "next/dist/client/components/headers";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Landing/Footer/page";

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
          <Toaster />
          {children}
          <Footer />{" "}
        </main>
      </body>
    </html>
  );
}
