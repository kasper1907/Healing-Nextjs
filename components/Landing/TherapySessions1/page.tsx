"use client";
import React, { useState } from "react";
import SectionHeader from "../../shared/SectionHeader/page";
import { Container, Grid, useMediaQuery } from "@mui/material";
import TherapyCard from "../../shared/TherapyCard/page";
import { therapySessions } from "@/constants/TherapySessions1";
import Image from "next/image";
import { useTransition } from "react";
import LargeDialog from "../../shared/Dialogs/LargeDialog/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "@/styles/sass/TherapyCard/Slider.scss";
const TherapySession1 = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={"/images/TherapySessions1/content-background-shape.svg"}
        fill
        alt="TherapySessions1Background"
        style={{
          objectFit: "none",
          position: "absolute",
          opacity: "0.7",
          top: "100px",
          filter: "blur(30px)",
        }}
      />
      <Container>
        <SectionHeader
          Label={"جلسات الاتزان شفاء"}
          isCentered={true}
          secondary={false}
        />
        <p className={`section-p w-full text-center`}>
          نحن في جلسات الاتزان شفاء نقدم لك تدريبات الدعم الشعوري المتخصصة
          لتساعدك على التعافي من الاضطرابات الجسدية والشعورية
        </p>
        <SectionHeader
          Label={"جلسات جماعية "}
          isCentered={true}
          secondary={true}
        />
        {isSmallScreen ? (
          <div style={{ direction: "ltr" }}>
            <Swiper
              slidesPerView={1.2}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper1"
            >
              {therapySessions?.length > 0
                ? therapySessions?.map(
                    (therapySession: TherapySession, idx: number) => {
                      return (
                        <SwiperSlide key={idx}>
                          <TherapyCard
                            idx={idx}
                            name={therapySession?.name}
                            img={therapySession?.imgSrc}
                          />
                        </SwiperSlide>
                      );
                    }
                  )
                : ""}
            </Swiper>
          </div>
        ) : (
          <Grid
            container
            spacing={3}
            rowSpacing={8}
            justifyContent={"center"}
            className="mb-10"
          >
            {therapySessions?.length > 0
              ? therapySessions?.map(
                  (therapySession: TherapySession, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}
                        className="flex justify-center"
                      >
                        <TherapyCard
                          idx={index}
                          sessionId={therapySession?.sessionId}
                          name={therapySession?.name}
                          img={therapySession?.imgSrc}
                        />
                      </Grid>
                    );
                  }
                )
              : ""}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default TherapySession1;
