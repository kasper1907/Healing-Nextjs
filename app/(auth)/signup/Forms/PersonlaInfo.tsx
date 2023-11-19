import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  CssTextField,
  StyledDatePicker,
} from "@/components/Dashboard/UserMain/EditProfile/page";
import ReactFlagsSelect from "react-flags-select";
import Aos from "aos";
import "aos/dist/aos.css";
import "../signup.css";
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

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (
      formData.gender !== "" &&
      formData.hand !== "" &&
      formData.height !== "" &&
      formData.weight !== "" &&
      formData.maritalStatus !== "" &&
      formData.jobTitle !== "" &&
      formData.countryOfLiving !== "" &&
      formData.boys !== "" &&
      formData.girls
    ) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    } else {
      toast.warning("Please fill all the fields");
    }
  };

  return (
    <div data-aos="fade-right" className={styles.main}>
      <Grid
        alignContent={"center"}
        rowSpacing={4}
        spacing={4}
        container
        sx={{
          margin: "0 !important",
        }}
      >
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Gender
            </InputLabel>
            <FormControl fullWidth>
              <StyledSelect
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.gender}
                // label="Age"
                onChange={(e: any) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </StyledSelect>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Special Hand
            </InputLabel>
            <FormControl fullWidth>
              <StyledSelect
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.hand}
                // label="Age"
                onChange={(e: any) => {
                  setFormData({ ...formData, hand: e.target.value });
                }}
              >
                <MenuItem value={"Right"}>Right</MenuItem>
                <MenuItem value={"Left"}>Left</MenuItem>
              </StyledSelect>
            </FormControl>
          </div>{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Height (cm)
            </InputLabel>
            <CssTextField
              value={formData.height}
              onChange={(e: any) => {
                setFormData({ ...formData, height: e.target.value });
              }}
              fullWidth
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
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
              Weight (kg)
            </InputLabel>
            <CssTextField
              value={formData.weight}
              onChange={(e: any) => {
                setFormData({ ...formData, weight: e.target.value });
              }}
              fullWidth
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Marital Status
            </InputLabel>
            <FormControl fullWidth>
              <StyledSelect
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "&. MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                id="demo-simple-select"
                value={formData?.maritalStatus}
                onChange={(e: any) => {
                  setFormData({ ...formData, maritalStatus: e.target.value });
                }}
              >
                <MenuItem value={"Single"}>Single</MenuItem>
                <MenuItem value={"Engaged"}>Engaged</MenuItem>
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Divorced"}>Divorced</MenuItem>
              </StyledSelect>
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
              Job Title
            </InputLabel>
            <CssTextField
              value={formData.jobTitle}
              onChange={(e: any) => {
                setFormData({ ...formData, jobTitle: e.target.value });
              }}
              fullWidth
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
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
              Country Of Living
            </InputLabel>
            <ReactFlagsSelect
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
              Number Of Boys (if Exist)
            </InputLabel>
            <CssTextField
              value={formData.boys}
              onChange={(e: any) => {
                setFormData({ ...formData, boys: e.target.value });
              }}
              fullWidth
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
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
              Number Of Girls
            </InputLabel>
            <CssTextField
              value={formData.girls}
              onChange={(e: any) => {
                setFormData({ ...formData, girls: e.target.value });
              }}
              fullWidth
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </div>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 4 }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          item
          xs={12}
          md={6}
        >
          <Button
            color="error"
            disabled={currentIndex === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className={styles.backBtn}
            variant="outlined"
          >
            Back
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          item
          xs={12}
          md={6}
        >
          <Button onClick={handleSubmit} className={styles.nextBtn}>
            {currentIndex === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInfo;
