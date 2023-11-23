import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import { StyledSelect } from "@/components/shared/DateTimePickers/StyledSelect";
import ActionsButtons from "./ActionsButtons";
import CountrySelect from "../shared/Select/SelectCountry";
import { useTranslation } from "react-i18next";

const PersonalInfo = ({
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
    if (
      formData.gender !== ""
      //&&
      // formData.hand !== "" &&
      // formData.height !== "" &&
      // formData.weight !== "" &&
      // formData.maritalStatus !== "" &&
      // formData.jobTitle !== "" &&
      // formData.countryOfLiving !== "" &&
      // formData.boys !== "" &&
      // formData.girls !== ""
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
            <FormControl fullWidth>
              <InputLabel id="select-label">
                {t("Select Your Gender")}
              </InputLabel>
              <Select
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                labelId="select-label"
                id="demo-simple-select-autowidth"
                value={formData?.gender}
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
                autoWidth
                label={t("Select Your Gender")}
              >
                <MenuItem value="">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value={"Male"}>{t("Male")}</MenuItem>
                <MenuItem value={"Female"}>{t("Female")}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <FormControl fullWidth>
              <InputLabel id="select-label">
                {t("Select Your Special Hand")}
              </InputLabel>
              <Select
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                labelId="select-label"
                id="demo-simple-select-autowidth"
                value={formData?.hand}
                onChange={(e) => {
                  setFormData({ ...formData, hand: e.target.value });
                }}
                autoWidth
                label={t("Select Your Special Hand")}
              >
                <MenuItem value="">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value={"Right"}>{t("Right")}</MenuItem>
                <MenuItem value={"Left"}>{t("Left")}</MenuItem>
              </Select>
            </FormControl>
          </div>{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Height (cm)")}
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
              placeholder={t("Enter Your Height in (cm)")}
              value={formData.height}
              onChange={(e: any) => {
                setFormData({ ...formData, height: e.target.value });
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
              {t("Weight (kg)")}
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
              placeholder={t("Enter Your Weight in (kg)")}
              value={formData.weight}
              onChange={(e: any) => {
                setFormData({ ...formData, weight: e.target.value });
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Marital Status")}
            </InputLabel>
            <FormControl fullWidth>
              <InputLabel id="select-label">
                {t("Select Your Marital Status")}
              </InputLabel>
              <Select
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                labelId="select-label"
                id="demo-simple-select-autowidth"
                value={formData?.maritalStatus}
                onChange={(e: any) => {
                  setFormData({ ...formData, maritalStatus: e.target.value });
                }}
                autoWidth
                label={t("Select Your Marital Status")}
              >
                <MenuItem value="">
                  <em>{t("None")}</em>
                </MenuItem>
                <MenuItem value={"Single"}>{t("Single")}</MenuItem>
                <MenuItem value={"Engaged"}>{t("Engaged")}</MenuItem>
                <MenuItem value={"Married"}>{t("Married")}</MenuItem>
                <MenuItem value={"Divorced"}>{t("Divorced")}</MenuItem>
              </Select>
            </FormControl>
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
              {t("Job Title")}
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
              placeholder={t("Enter Your Job Title")}
              value={formData.jobTitle}
              onChange={(e: any) => {
                setFormData({ ...formData, jobTitle: e.target.value });
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              position: "relative",
            }}
            className={styles.inputWrapper}
          >
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Country Of Living")}
            </InputLabel>
            {/* <ReactFlagsSelect
              selected={formData?.countryOfLiving}
              onSelect={(code) =>
                setFormData({ ...formData, countryOfLiving: code })
              }
              searchable={true}
              placeholder="Select Place Of Birth"
              showOptionLabel={true}
              showSecondaryOptionLabel={true}
              showSecondarySelectedLabel={true}
              customLabels={placeOfBirthObject}
              className="NationalitiesSelect"
            /> */}
            <CountrySelect />
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
              {t("Number Of Boys (if Exist)")}
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
              placeholder={t("Enter Number Of Boys (if Exist)")}
              fullWidth
              variant="outlined"
              value={formData.boys}
              onChange={(e: any) => {
                setFormData({ ...formData, boys: e.target.value });
              }}
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
              {t("Number Of Girls")}
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
              placeholder={t("Enter Number Of Girls (if Exist)")}
              fullWidth
              variant="outlined"
              value={formData.girls}
              onChange={(e: any) => {
                setFormData({ ...formData, girls: e.target.value });
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

export default PersonalInfo;
