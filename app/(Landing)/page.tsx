"use server";
import ContactUs from "@/components/Landing/ContactUs/page";
import IndividualSessions from "@/components/Landing/IndividualSessions/page";
import Landing from "@/components/Landing/Landing";
import Testimonials from "@/components/Landing/Testimonials/Testimonials";
import TherapySession1 from "@/components/Landing/TherapySessions1/page";

export default async function Home() {
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
