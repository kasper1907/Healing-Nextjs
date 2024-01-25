import ClientQuestions from "@/components/Questions/ClientQuestions";
import { getOne } from "@/services/service";
import { Box, Container } from "@mui/material";
import { Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

const Page = async () => {
  const ClientReport: any = await getOne("Dashboard/getClientReport");
  console.log(ClientReport);
  return (
    <ClientQuestions
      report={ClientReport?.data}
      questions={ClientReport?.data?.questions}
    />
  );
};

export default Page;
