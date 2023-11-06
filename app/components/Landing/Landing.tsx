import React from "react";
import styles from "../../styles/sass/Landing/landing.module.scss";
import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import StyledButton from "../shared/StyledButton";

const Landing = () => {
  return (
    <>
      <Container fixed={true}>
        <Grid container className={`w-full flex ${styles.Landing}`}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex" }}
            className="w-full flex flex-col items-end justify-center pt-20 pb-20 relative"
          >
            <Image
              src="/images/content-background-shape.svg"
              fill
              alt="Section1-bg"
              style={{
                opacity: "0.7",
                filter: "blur(65px)",
                transform: "rotate(180deg)",
              }}
              className="absolute top-0 left-0 w-full h-full"
            />
            <h2 className={styles.LandingText}>
              <span className={styles.LandingTitle}>اتزانك وراحتك</span>
              هو هدفنا الأول <br /> ومساعنا دائما للارتقاء بجوده حياتك
            </h2>
            <h2 className={styles.LandingText}>
              <span className={styles.LandingTitle}>Healing Center</span>
              هو مركز مُتخصص في التدريبات الشعورية للوصول إلى عالم متكامل من
              الوعي بالذات للارتقاء بجودة الحياة أفضل.{" "}
            </h2>

            <Grid container sx={{ mt: 6 }} rowSpacing={2}>
              <Grid item xs={12} md={6} className="flex justify-center ">
                {/* <StyledButton text={"اكتشف المزيد"} isPrimary={true} /> */}
                <StyledButton label="اكتشف المزيد" isPrimary={true} />
              </Grid>
              <Grid item xs={12} md={6} className="flex justify-center">
                {/* <StyledButton text={"طلب المساعده"} isPrimary={false} /> */}
                <StyledButton label="طلب المساعده" isPrimary={false} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex" }}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={"/images/Group 14898.svg"}
              width={450}
              height={250}
              alt="section2-bg"
              style={{
                maxWidth: "100%",
                zIndex: 1,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
