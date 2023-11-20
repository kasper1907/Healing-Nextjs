"use client";
import React from "react";
import styles from "@/styles/sass/ContactUs/Contact.module.scss";
import { Container, Grid, TextField } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import Image from "next/image";
import StyledButton from "../../shared/StyledButton";
const ContactUs = () => {
  return (
    <div className={styles.ContactUs}>
      <Container>
        <Grid container className={styles.container}>
          <Grid item xs={12} md={6}>
            <h2 className={styles.ContactUsHeader}>
              ابق علي <br /> تواصل معنا{" "}
            </h2>
            <p className={styles.ContactP}>
              لدينا فريق متخصص للإجابة علي أي استفسارات
            </p>

            <div className={styles.address}>
              <h4>العنوان</h4>
              <div className={styles.iconAndText}>
                <Image
                  src="/images/location.svg"
                  width={24}
                  height={24}
                  alt="Location_icon"
                />
                <span>
                  ٤١ محمد توفيق دياب، المنطقة السادسة، مدينة نصر، <br /> محافظة
                  القاهرة{" "}
                </span>
              </div>
            </div>

            <div className={styles.address}>
              <h4>تواصل معنا علي</h4>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className={styles.iconAndText}>
                    <Image
                      src="/images/phone.svg"
                      width={24}
                      height={24}
                      alt="Location_icon"
                    />
                    <span className="mt-1">+21 xxx xxx xxx</span>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={styles.iconAndText}>
                    <Image
                      src="/images/email.svg"
                      width={24}
                      height={24}
                      alt="Location_icon"
                    />
                    <span className="mt-1">info@managethenow.com</span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.contactFormContainer}>
              <h2 className={styles.formHeader}>تواصل معنا</h2>
              <form
                onSubmit={(e) => {
                  console.log("Form Submitter");
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label="الاسم"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label="رقم الهاتف"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label="استفسارك"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={8}
                    />
                  </Grid>

                  <Grid item xs={12} className="flex justify-center">
                    <StyledButton
                      isPrimary={true}
                      label="إرسال"
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
