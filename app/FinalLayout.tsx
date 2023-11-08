"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/Landing/Footer/page";

const FinalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <>
      {pathName == "/pages/login" ? (
        children
      ) : (
        <div style={{ direction: "rtl" }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </>
  );
};

export default FinalLayout;
