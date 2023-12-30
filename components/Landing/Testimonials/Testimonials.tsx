"use client";
import React from "react";
import styles from "@/styles/sass/Testimonials/Testimonials.module.scss";
import SectionHeader from "../../shared/SectionHeader/page";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const Testimonials = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.Testimonials}>
      <Container>
        <SectionHeader
          Label={t("Testimonials")}
          secondary={false}
          isCentered={true}
        />
        <Grid container className={styles.container}>
          <Grid item xs={12} md={6}>
            <Image
              src={"/images/quote.svg"}
              width={55}
              height={55}
              alt="Quote"
            />

            <Grid container>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  {t(
                    "I started to feel a great improvement after 3 or 4 sessions... and the improvement rate now, after completing the sessions, I can say 98%."
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  {t(
                    "I have been suffering from severe pain in the spine for 25 years, but after I attended the sessions, thank God, I completely recovered."
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  {t(
                    "I felt like I was living my life. Life became of high quality and I continued to see beauty in all things. Even my relationship with my family was completely different."
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  {t(
                    "The course for me was a terrible transition and I discovered that I was missing out on life"
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src={"images/Testimonials.svg"}
              alt="TestimonialsImg"
              width={500}
              height={500}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Testimonials;
