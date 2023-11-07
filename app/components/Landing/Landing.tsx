"use client";
import React from "react";
import styles from "../../styles/sass/Landing/landing.module.scss";
import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import StyledButton from "../shared/StyledButton";
import { useMediaQuery } from "@mui/material";
const Landing = () => {
  const isMediumScreen = useMediaQuery("(max-width: 900px)");
  const isSmallScreen = useMediaQuery("(max-width: 772px)");
  return (
    <>
      <Image
        src={
          isSmallScreen
            ? "/images/mobile-landing-background.svg"
            : "/images/Landing-1-bg.svg"
        }
        alt="landing-background"
        width={100}
        height={100}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "fit-content",
          position: "absolute",
          maxHeight: isSmallScreen ? "100vh" : "auto",
        }}
        className="h-fit"
      />
      <Container fixed={true}>
        <Grid
          sx={{
            minHeight: { xs: "fit-content", lg: "calc(100vh - 80px)" },
          }}
          container
          className={`w-full flex ${styles.Landing}`}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              height: { xs: "fit-content", md: "auto" },
              fontWeight: { xs: "500", lg: "400" },
              lineHeight: { xs: "1.5" },
            }}
            className="w-full flex flex-col items-end justify-center pt-5 pb-5 lg:pt-20 lg:pb-20 relative"
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
              {isMediumScreen ? (
                <>
                  <span className={styles.LandingTitle}>اتزانك وراحتك</span>
                  <span>
                    {" "}
                    هو هدفنا الأول ومساعنا دائما للارتقاء بجوده حياتك
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.LandingTitle}>اتزانك وراحتك</span>
                  <span>
                    هو هدفنا الأول <br /> ومساعنا دائما للارتقاء بجوده حياتك
                  </span>
                </>
              )}
            </h2>

            <Box
              sx={{ display: { xs: "none", md: "block" }, mt: 6 }}
              className={styles.Landing_Description}
            >
              <h2 className={styles.LandingText}>
                <span className={styles.LandingTitle}>Healing Center</span>
                هو مركز مُتخصص في التدريبات الشعورية للوصول إلى عالم متكامل من
                الوعي بالذات للارتقاء بجودة الحياة أفضل.{" "}
              </h2>

              <Grid container sx={{ mt: 6 }} rowSpacing={2}>
                <Grid item xs={12} md={6} className="flex justify-center ">
                  <StyledButton label="اكتشف المزيد" isPrimary={true} />
                </Grid>
                <Grid item xs={12} md={6} className="flex justify-center">
                  <StyledButton label="طلب المساعده" isPrimary={false} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", height: { xs: "fit-content", md: "auto" } }}
            className="flex flex-col items-center justify-center"
          >
            <Box
              sx={{
                width: { xs: "255px", md: "100%" },
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={"/images/Group 14898.svg"}
                width={450}
                height={250}
                alt="section2-bg"
                style={{
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: { xs: "block", md: "none" }, zIndex: 2, mt: 2 }}
          >
            <h2 className={styles.LandingText}>
              <span className={styles.LandingTitle}>Healing Center</span>
              هو مركز مُتخصص في التدريبات الشعورية للوصول إلى عالم متكامل من
              الوعي بالذات للارتقاء بجودة الحياة أفضل.{" "}
            </h2>

            <Grid container sx={{ mt: { xs: 2, lg: 6 }, mb: 2 }} rowSpacing={2}>
              <Grid item xs={6} className="flex justify-center ">
                <StyledButton label="اكتشف المزيد" isPrimary={true} />
              </Grid>
              <Grid item xs={6} className="flex justify-center">
                <StyledButton label="طلب المساعده" isPrimary={false} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
