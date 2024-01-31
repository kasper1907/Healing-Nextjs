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
  Nationalities2,
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
  const [selected, setSelected] = useState<any>("");
  const [selectedNationality, setSelectedNationality] = useState<any>("");
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (!formData.dateOfBirth)
      return toast.info("Please Choose Your BirthDate");
    if (!formData.timeOfBirth)
      return toast.info("Please Choose Your BirthTime");
    if (!formData.placeOfBirth)
      return toast.info("Please Choose Your BirthPlace");
    if (!formData.Nationality)
      return toast.info("Please Choose Your nationality");
    steps[currentIndex].isCompleted = true;
    handleNext();
  };

  useEffect(() => {
    if (formData?.placeOfBirth !== "") {
      const country = Object.keys(placeOfBirthObject).find(
        (key) => placeOfBirthObject[key] === formData?.placeOfBirth
      );
      setSelected(country);
    }
    if (formData?.Nationality !== "") {
      const nationality = Object.keys(Nationalities).find(
        (key) => Nationalities[key] === formData?.Nationality
      );
      setSelectedNationality(nationality);
    }
  }, [formData]);

  return (
    <div data-aos="fade-right" className={`!bg-[#f8f8f8] ${styles.main}`}>
      <Grid
        alignContent={"center"}
        rowSpacing={4}
        spacing={{ xs: 0, md: 4 }}
        container
        sx={{
          margin: "0 !important",
          marginBottom: "70px",
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
              selected={selected}
              onSelect={(code) => {
                const country: any = placeOfBirthObject[code] || "";
                setSelected(code);
                setFormData({ ...formData, placeOfBirth: country });
              }}
              searchable={true}
              placeholder={t("Select Place Of Birth")}
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={placeOfBirthObject}
              className="NationalitiesSelect !color-[#000]"
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
              selected={selectedNationality}
              onSelect={(el) => {
                const nationality: any = Nationalities[el] || "";
                setSelectedNationality(el);
                setFormData({ ...formData, Nationality: nationality });
              }}
              countries={Nationalities2}
              searchable={true}
              placeholder={t("Select Your Nationality")}
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={Nationalities}
              className="NationalitiesSelect !color-[#000]"
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
