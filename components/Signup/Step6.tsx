import { Button, Grid, InputLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledDatePicker } from "@/components/Dashboard/UserMain/EditProfile/page";
import { useTranslation } from "react-i18next";
import ActionsButtons from "./ActionsButtons";
const Step6 = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    steps[currentIndex].isCompleted = true;
    handleNext();
  };
  return (
    <div data-aos="fade-right">
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Organic / Psychological Complaint")}
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
              placeholder={t("Enter Your Organic / Psychological Complaint")}
              value={formData.organic_Psychological_complaint}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  organic_Psychological_complaint: e.target.value,
                });
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Date of Organic / Psychological complaint")}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formData?.date_of_Organic_Psychological_complaint}
                onChange={(e: any) => {
                  setFormData({
                    ...formData,
                    date_of_Organic_Psychological_complaint: e,
                  });
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": { padding: "0" },
                }}
                fullWidth
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Medical diagnosis (optional)")}
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
              placeholder={t("Enter Your Organic / Psychological Complaint")}
              value={formData.organic_Psychological_complaint}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  organic_Psychological_complaint: e.target.value,
                });
              }}
            />
          </div>
        </Grid>
      </Grid>
      <ActionsButtons
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        currentIndex={currentIndex}
        steps={steps}
      />
    </div>
  );
};

export default Step6;
