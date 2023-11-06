import React from "react";
import SectionHeader from "../../shared/SectionHeader/page";
import { Container, Grid } from "@mui/material";
import TherapyCard from "../../shared/TherapyCard/page";
import { therapySessions } from "@/app/constants/TherapySessions1";
import Image from "next/image";

const TherapySession1 = () => {
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
        <SectionHeader isCentered={true} title={"جلسات الاتزان شفاء"} />
        <p className={`section-p w-full text-center`}>
          نحن في جلسات الاتزان شفاء نقدم لك تدريبات الدعم الشعوري المتخصصة
          لتساعدك على التعافي من الاضطرابات الجسدية والشعورية
        </p>
        <SectionHeader
          isCentered={true}
          secondary={true}
          title={"جلسات جماعية "}
        />

        <Grid
          container
          spacing={3}
          rowSpacing={8}
          justifyContent={"center"}
          className="mb-10"
        >
          {therapySessions?.length > 0
            ? therapySessions?.map((therapySession: TherapySession, index) => {
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
                      name={therapySession?.name}
                      img={therapySession?.imgSrc}
                    />
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </Container>
    </div>
  );
};

export default TherapySession1;
