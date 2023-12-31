"use client";
import ContactUs from "@/components/Landing/ContactUs/page";
import IndividualSessions from "@/components/Landing/IndividualSessions/page";
import Landing from "@/components/Landing/Landing";
import Testimonials from "@/components/Landing/Testimonials/Testimonials";
import TherapySession1 from "@/components/Landing/TherapySessions1/page";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../(dashboard)/loading";
import LandingLoading from "@/components/Dashboard/Loading/LandingLoading";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div>
        <LandingLoading />
      </div>
    );
  }
  return (
    <>
      <Landing />
      <TherapySession1 />
      <IndividualSessions />
      <Testimonials />
      <ContactUs />
    </>
  );
}
