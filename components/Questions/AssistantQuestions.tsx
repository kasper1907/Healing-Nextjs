"use client";
import { postRequest } from "@/services/service";
import { Box, Container, Typography } from "@mui/material";
import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AssistantQuestions: any = ({ report, questions }: any) => {
  const [values, setValues] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const newQuestionsFormat = questions?.map((question: any) => {
      return {
        question_Id: question?.question_Id,
        title: question?.title,
        type: question?.type,
        report_id: report?.id,
        answer: "",
      };
    });

    setValues(newQuestionsFormat);
  }, [questions, report?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    // check if no any question is answered then throw a toast with error message
    if (values?.every((question: any) => question?.answer == "")) {
      toast.warning("Please Answer at least one question");
      return;
    }

    setLoading(true);

    const newValues = values?.map((question: any) => {
      return {
        question_Id: question?.question_Id,
        report_id: report?.id,
        answer: question?.answer,
      };
    });

    const res = await postRequest(
      `Dashboard/AnswerReport_Assistant/${report?.id}`,
      {
        reportAnswers: newValues,
      }
    );

    if (res.status == "201") {
      toast.success("Answers Submitted Successfully, Redirecting Now...");
      setTimeout(() => {
        router.push("/dashboard/Groups");
      }, 1000);
    } else {
      toast.error(res?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography
          color={"primary"}
          variant="h6"
          className="text-right w-full !font-[Tajawal] !mb-4 !mr-2"
        >
          التقرير رقم #{report?.report_num}
        </Typography>
        <Typography
          color={"primary"}
          variant="h6"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
          className="text-right flex flex-row-reverse w-full !font-[Tajawal] !mb-4 !mr-2"
        >
          <span>{report?.client_name}</span>
          <Image
            alt="client_img"
            src={process.env.NEXT_PUBLIC_BASE_URL + `${report?.client_image}`}
            width={50}
            height={50}
            className="rounded-full"
          />
        </Typography>
        <form onSubmit={handleSubmit}>
          {values?.map((question: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "background.paper",
                  px: 4,
                  py: 6,
                  mb: 4,
                  borderRadius: "20px",
                  direction: "rtl",
                }}
                className="flex flex-col  justify-center"
              >
                <div className="question !font-[Tajawal] text-[#10458C] font-semibold">
                  {question?.title}
                </div>

                <div className="answers">
                  {question?.type == "text" && (
                    <Textarea
                      variant="underlined"
                      className="mt-2 !font-[Tajawal]"
                      labelPlacement="outside"
                      placeholder="اكتب اجابتك..."
                      value={question?.answer}
                      onValueChange={(value) => {
                        const newValues: any = [...values];
                        newValues[index].answer = value;
                        setValues(newValues);
                      }}
                    />
                  )}
                  {question?.type == "singleChoice" && (
                    <RadioGroup
                      label=""
                      orientation="horizontal"
                      className="mt-2 !font-[Tajawal]"
                      value={question?.answer}
                      onValueChange={(value) => {
                        const newValues: any = [...values];
                        newValues[index].answer = value;
                        setValues(newValues);
                      }}
                    >
                      <Radio value="Yes" className="!font-[Tajawal]">
                        نعم
                      </Radio>
                      <Radio value="No" className="!font-[Tajawal]">
                        لا
                      </Radio>
                    </RadioGroup>
                  )}
                </div>
              </Box>
            );
          })}
          <div className="w-full flex justify-center items-center mb-4">
            <Button
              className="w-[200px] !font-[Tajawal] mb-4"
              color="primary"
              variant="shadow"
              type="submit"
              isLoading={loading}
            >
              ارسال
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AssistantQuestions;
