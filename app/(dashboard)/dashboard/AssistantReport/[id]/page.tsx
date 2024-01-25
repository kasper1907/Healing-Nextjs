import AssistantQuestions from "@/components/Questions/AssistantQuestions";
import ClientQuestions from "@/components/Questions/ClientQuestions";
import { getOne } from "@/services/service";
import { Box, Container } from "@mui/material";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Message } from "primereact/message";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  console.log(params);
  const AssistantReport: any = await getOne(
    `Dashboard/getAssistantReport/${params.id}`
  );
  console.log(AssistantReport);

  if (AssistantReport?.status == "error") {
    return (
      <div className="w-full text-center mt-4">
        <Message
          severity="error"
          text={
            AssistantReport?.message + " Please Try Again Later" ||
            "An Error Exists! Please Try Again Later"
          }
        />
      </div>
    );
  }
  return (
    <AssistantQuestions
      report={AssistantReport?.data}
      questions={AssistantReport?.data?.questions}
    />
  );
};

export default Page;
