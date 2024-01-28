import React from "react";
import styles from "@/styles/sass/IndividualSessions/main.module.scss";
import { Container, Grid } from "@mui/material";
import SectionHeader from "../../shared/SectionHeader/page";
import DrSessionCard from "./DrSessionCard/page";
import SessionCard from "./DrSessionCard/SessionCard.tsx/page";

const IndividualSessions = () => {
  return (
    <div className={styles.IndividualSessions}>
      <Container className={styles.container}>
        <SectionHeader Label="جلسات فرديه" isCentered={true} secondary={true} />
        <DrSessionCard />
        <Grid
          container
          columnSpacing={{ sm: 2 }}
          rowSpacing={3}
          sx={{ width: "100%", marginTop: "40px" }}
        >
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
            md={6}
          >
            <SessionCard
              bannerSrc={"/images/TherapySessions1/Dr-Card-header1.svg"}
              logoSrc={"/images/TherapySessions1/session1.svg"}
              header={"التلعثم"}
              text={
                "هي جلسة فردية تسطتيع من خلالها الإفصاح ومشاعرك بكل حرية وإنطلاق وبدون حرج ويساعدك دكتور أحمد على "
              }
              sessionId={14}
            />
          </Grid>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
            md={6}
          >
            <SessionCard
              bannerSrc={"/images/TherapySessions1/Dr-Card-header2.svg"}
              logoSrc={"/images/TherapySessions1/session2.svg"}
              header={"الأشعة المقطعية على الدماغ"}
              text={
                "هي جلسة فردية تسطتيع من خلالها الإفصاح ومشاعرك بكل حرية وإنطلاق وبدون حرج ويساعدك دكتور أحمد على "
              }
              sessionId={15}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IndividualSessions;
