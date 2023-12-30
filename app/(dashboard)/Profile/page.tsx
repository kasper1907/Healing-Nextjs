import ProfileMain from "@/components/Profile/ProfileMain";
import { getOne } from "@/services/service";
import React from "react";

const Page = async () => {
  const socket = await new WebSocket("ws://localhost:8080?user_id=5000");
  // socket.onopen = () => {
  //   console.log("connected");
  // };
  return <ProfileMain />;
};

export default Page;
