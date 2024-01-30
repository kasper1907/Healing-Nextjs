"use client";
import { postRequest } from "@/services/service";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Button, Chip, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

//Swiper:
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 h-[120px]">
      <Button
        variant="flat"
        color="default"
        className="flex-1 h-10"
        onClick={() => swiper.slidePrev()}
      >
        Prev
      </Button>
      <Button
        variant="flat"
        color="primary"
        className="flex-1"
        onClick={() => swiper.slideNext()}
      >
        Next
      </Button>
    </div>
  );
};

const DoctorQuestions_View: any = ({ report, questions, isExpanded }: any) => {
  const [values, setValues] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const newQuestionsFormat = questions?.map((question: any) => {
      return {
        question_Id: question?.question_Id,
        question_for: question?.question_for,
        title: question?.title,
        type: question?.type,
        report_id: report?.id,
        answer: question?.answer,
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
        <Grid
          container
          direction={"row-reverse"}
          style={{ fontFamily: "Tajawal" }}
        >
          <Grid
            item
            xs={12}
            md={isExpanded ? 3 : 12}
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Typography
              color={"primary"}
              variant="h6"
              className="text-right w-full !font-[Tajawal] !mb-4 !mr-2"
            >
              التقرير رقم #{report?.report_num}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={isExpanded ? 3 : 12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Chip variant="flat" color="primary">
              {moment(report?.created_at).format("YYYY-MM-DD hh:mm A")}
            </Chip>
            <Typography
              color={"primary"}
              variant="h6"
              className="text-right w-fit !font-[Tajawal] "
            >
              : التاريخ
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={isExpanded ? 3 : 12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Chip variant="flat" color="primary">
              <span className={"!font-[Tajawal]"}>
                {report?.is_completed ? "مكتمل" : "غير مكتمل"}
              </span>
            </Chip>
            <Typography
              color={"primary"}
              variant="h6"
              className="text-right w-fit !font-[Tajawal] "
            >
              : الحاله
            </Typography>
          </Grid>
        </Grid>

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
        <div
          className="flex items-center gap-2  mb-4"
          style={{ direction: "rtl" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#e4d4f4]"></span>
            <span className="!font-[Tajawal]">اسئله العميل</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#D1F4E0]"></span>
            <span className="!font-[Tajawal]">اسئله المساعد</span>
          </div>
        </div>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {values?.map((question: any, index: number) => {
            return (
              <SwiperSlide key={question.id}>
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
                    {question?.title} -{" "}
                    {question?.question_for == "assistant" ? (
                      <Chip variant="flat" color="success">
                        <span className="!font-[Tajawal]">سؤال للمساعد</span>
                      </Chip>
                    ) : (
                      <Chip variant="flat" color="secondary">
                        <span className="!font-[Tajawal]">سؤال للعميل</span>
                      </Chip>
                    )}
                  </div>

                  <div className="answers">
                    {question?.type == "text" && (
                      <Textarea
                        variant="underlined"
                        className="mt-2 !font-[Tajawal]"
                        labelPlacement="outside"
                        rows={1}
                        placeholder="اكتب اجابتك..."
                        value={question?.answer}
                        readOnly
                      />
                    )}
                    {question?.type == "singleChoice" && (
                      <RadioGroup
                        label=""
                        orientation="horizontal"
                        className="mt-2 !font-[Tajawal]"
                        value={question?.answer}
                        isReadOnly={true}
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
              </SwiperSlide>
            );
          })}
          <SwiperNavButtons />
        </Swiper>
      </Container>
    </>
  );
};

export default DoctorQuestions_View;
