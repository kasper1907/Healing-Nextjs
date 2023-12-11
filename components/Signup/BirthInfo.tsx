import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { Button, Grid, InputLabel } from "@mui/material";
import {
  CssTextField,
  StyledDatePicker,
} from "@/components/Dashboard/UserMain/EditProfile/page";
import ReactFlagsSelect from "react-flags-select";
import Aos from "aos";
import "aos/dist/aos.css";
import "./signup.css";
import {
  Nationalities,
  customLabels,
  placeOfBirthObject,
} from "@/constants/Countries";
import { toast } from "sonner";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StyledTimePicker } from "@/components/shared/DateTimePickers/TimePicker";
import { useTranslation } from "react-i18next";
import ActionsButtons from "./ActionsButtons";

const BirthInfo = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    // ////console.log(formData.dateOfBirth);
    // ////console.log(formData.timeOfBirth);
    // ////console.log(formData.placeOfBirth);
    // ////console.log(formData.Nationality);
    if (
      formData.dateOfBirth !== ""
      //  &&
      // formData.timeOfBirth !== "" &&
      // formData.placeOfBirth !== "" &&
      // formData.Nationality !== ""
    ) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    } else {
      toast.warning("Please fill all fields");
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
              {t("Date Of Birth")}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formData?.dateOfBirth}
                onChange={(e: any) => {
                  setFormData({ ...formData, dateOfBirth: e });
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
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Time Of Birth")}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledTimePicker
                value={formData?.timeOfBirth}
                onChange={(e: any) => {
                  setFormData({ ...formData, timeOfBirth: e });
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": { padding: "0" },
                }}
                defaultValue={dayjs("2022-04-17T15:30")}
              />
            </LocalizationProvider>
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
              {t("Place Of Birth")}
            </InputLabel>
            <ReactFlagsSelect
              selected={formData?.placeOfBirth}
              onSelect={(code) =>
                setFormData({ ...formData, placeOfBirth: code })
              }
              searchable={true}
              placeholder={t("Select Place Of Birth")}
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={placeOfBirthObject}
              className="NationalitiesSelect"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              position: "relative",
            }}
            className={styles.inputWrapper}
          >
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Nationality")}
            </InputLabel>
            <ReactFlagsSelect
              selected={formData?.Nationality}
              onSelect={(code) =>
                setFormData({ ...formData, Nationality: code })
              }
              countries={["US", "GB", "FR", "DE", "IT", "ES"]}
              searchable={true}
              placeholder={t("Select Your Nationality")}
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={Nationalities}
              className="NationalitiesSelect"
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

export default BirthInfo;
