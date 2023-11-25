import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { CssTextField } from "@/components/Dashboard/UserMain/EditProfile/page";
import ReactFlagsSelect from "react-flags-select";
import Aos from "aos";
import "aos/dist/aos.css";
import "./signup.css";
import { customLabels } from "@/constants/Countries";
import { toast } from "sonner";
import { checkPhoneNumberLength } from "@/utils/validPhoneNumber";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import ActionsButtons from "./ActionsButtons";

const ContactInfo = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  formData,
  setFormData,
}: any) => {
  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (
      formData.firstName !== ""
      // &&
      // formData.lastName !== "" &&
      // formData.email !== "" &&
      // selected !== "" &&
      // formData.phone !== ""
    ) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    } else {
      toast.warning(t("Please fill all fields"));
    }
  };

  return (
    <div data-aos="fade-right" className={styles.main}>
      <Grid
        alignContent={"center"}
        rowSpacing={4}
        spacing={{ xs: 0, md: 4 }}
        container
        sx={{
          margin: "0 !important",
          maxWidth: "100%",
        }}
      >
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("First Name")}
            </InputLabel>
            <TextField
              autoComplete="off"
              sx={{
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                  borderRadius: "10px",
                },
              }}
              fullWidth
              variant="outlined"
              placeholder={`${t("Enter Your First Name")}`}
              value={formData.firstName}
              onChange={(e: any) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Last Name")}
            </InputLabel>
            <TextField
              autoComplete="off"
              sx={{
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                  borderRadius: "10px",
                },
              }}
              fullWidth
              variant="outlined"
              placeholder={`${t(`Enter Your Last Name`)}`}
              value={formData.lastName}
              onChange={(e: any) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
          </div>{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Email")}
            </InputLabel>
            <TextField
              autoComplete="off"
              sx={{
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                  borderRadius: "10px",
                },
              }}
              fullWidth
              variant="outlined"
              placeholder={t("Enter Your Email")}
              value={formData.email}
              onChange={(e: any) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              position: "relative",
            }}
            className={styles.inputWrapper}
          >
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Country")}
            </InputLabel>

            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              searchable={true}
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={customLabels}
              className="codeSelect"
              placeholder={t("Select Country")}
            />
            {/* <CountryCodeSelect /> */}

            <TextField
              autoComplete="off"
              sx={{
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                  borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                  paddingRight:
                    i18n.resolvedLanguage === "ar" ? "140px" : "130px",
                  paddingLeft: selected ? "140px" : "170px",
                },
              }}
              fullWidth
              variant="outlined"
              placeholder={t("Enter Your Phone Number")}
              value={formData?.phone}
              onChange={(e: any) => {
                if (isNaN(e.target.value)) {
                  toast.warning(t("Please enter numbers only"));
                } else {
                  checkPhoneNumberLength(e.target.value)
                    ? setFormData({ ...formData, phone: e.target.value })
                    : null;
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
      <ActionsButtons
        handleSubmit={handleSubmit}
        // handleBack={handleBack}
        currentIndex={currentIndex}
        steps={steps}
      />
    </div>
  );
};

export default ContactInfo;
