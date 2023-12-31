"use client";
import React from "react";
import styles from "@/styles/sass/ContactUs/Contact.module.scss";
import { CircularProgress, Container, Grid, TextField } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import Image from "next/image";
import StyledButton from "../../shared/StyledButton";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { postRequest } from "@/services/service";
const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<any>({
    client_name: "",
    client_phone: "",
    Questionnaire: "",
  });

  const handleSubmit = async () => {
    if (
      !userData.client_name ||
      !userData.client_phone ||
      !userData.Questionnaire
    ) {
      return toast.warning(t("Please fill all fields"));
    } else {
      setLoading(true);
      const res = await postRequest("ContactUs/Create", userData);

      if (res.status == 201) {
        toast.success(t("Your message has been sent successfully"));
        setUserData({
          client_name: "",
          client_phone: "",
          Questionnaire: "",
        });
      } else {
        toast.error(t("Something went wrong"));
      }
      setLoading(false);
    }
  };
  return (
    <div className={`${styles.ContactUs} contact`}>
      <Container>
        <Grid container className={styles.container}>
          <Grid item xs={12} md={6}>
            <h2 className={styles.ContactUsHeader}>
              {t("Stay on")} <br /> {t("a Contact With Us")}{" "}
            </h2>
            <p className={styles.ContactP}>
              {t("We are here to answer any question you may have about our")}
            </p>

            <div className={styles.address}>
              <h4>{t("Address")}</h4>
              <div className={styles.iconAndText}>
                <Image
                  src="/images/location.svg"
                  width={24}
                  height={24}
                  alt="Location_icon"
                />
                <span>
                  {t("41 Muhammad Tawfiq Diab, Sixth District, Nasr City,")}{" "}
                  <br /> {t("Cairo, Egypt")}{" "}
                </span>
              </div>
            </div>

            <div className={styles.address}>
              <h4>{t("Contact us on")}</h4>
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
              <h2 className={styles.formHeader}>{t("Contact Us")}</h2>
              <form onSubmit={(e) => {}}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label={t("Name")}
                      variant="outlined"
                      fullWidth
                      value={userData.client_name}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          client_name: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label={t("Phone Number")}
                      variant="outlined"
                      fullWidth
                      value={userData.client_phone}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          client_phone: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      id="outlined-basic"
                      dir="rtl"
                      lang="en"
                      label={t("Your Question")}
                      // label="استفسارك"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={8}
                      value={userData.Questionnaire}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          Questionnaire: e.target.value,
                        });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} className="flex justify-center">
                    <StyledButton
                      isLink={false}
                      isPrimary={true}
                      // label="إرسال"
                      label={
                        loading ? (
                          <CircularProgress size={18} sx={{ color: "#FFF" }} />
                        ) : (
                          t("Send")
                        )
                      }
                      fullWidth={true}
                      onClick={handleSubmit}
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
