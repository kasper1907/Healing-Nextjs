"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/Landing/Footer/page";

const FinalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  if (pathName == "/pages/login") {
    return children;
  }

  if (pathName == "/pages/login") {
    return (
      <React.Fragment>
        <Navbar />
        {children}
        <Footer />
      </React.Fragment>
    );
  }
};

export default FinalLayout;
