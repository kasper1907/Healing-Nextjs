import Image from "next/image";
import Landing from "./components/Landing/Landing";
import TherapySession1 from "./components/Landing/TherapySessions1/page";
import IndividualSessions from "./components/Landing/IndividualSessions/page";
import Testimonials from "./components/Landing/Testimonials/Testimonials";
import ContactUs from "./components/Landing/ContactUs/page";

export default async function Home() {
  return (
    <main className="flex h-fit min-h-screen flex-col items-center justify-between bg-[#f5f2ec]">
      <Landing />
      <TherapySession1 />
      <IndividualSessions />
      <Testimonials />
      <ContactUs />
    </main>
  );
}
