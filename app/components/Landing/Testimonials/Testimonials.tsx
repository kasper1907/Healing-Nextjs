import React from "react";
import styles from "../../../styles/sass/Testimonials/Testimonials.module.scss";
import SectionHeader from "../../shared/SectionHeader/page";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
const Testimonials = () => {
  return (
    <div className={styles.Testimonials}>
      <Container>
        <SectionHeader
          Label="اراء العملاء"
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
                  بدأت أحس بتحسن كبير من بعد 3 أو 4 جلسة... ونسبة التحسن دلوقتي
                  بعد الانتهاء من الجلسات أقدر أقول 98%
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  أنا بقالى 25 سنة بعانى من ألم شديد في العمود الفقري ولكن بعد
                  ما حضرت الجلسات الحمدلله تعافيت تمامًا
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  شعرت أننى أعيش حياتى، الحياة أصبحت بجودة عالية وبقيت بشوف
                  الجمال في كل الأشياء وحتى علاقتي بأهلي اختلفت تمامًا
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.testimonialCard}>
                  الكورس بالنسبة له كان نقلة رهيبه وإكتشفت إني كنت أفتقد الحياة
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
