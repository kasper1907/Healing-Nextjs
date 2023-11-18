import React, { useEffect } from "react";
import { useTabsContext } from "../../TabsContext";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/Profile/Profile.module.scss";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Image from "next/image";

const CssTextField: any = styled(TextField as any)({
  "& label.Mui-focused": {
    color: "#10458c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      backgroundColor: "#FFF !important",
      borderRadius: "12px",
      width: "100%",
    },
    "&:hover fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "& .MuiInputBase-input": {
      zIndex: 22,
    },
  },
});

const EditProfile = () => {
  const StyledDatePicker: any = styled(DatePicker as any)({
    "& .MuiSvgIcon-root": {
      zIndex: 22,
    },
    "& .MuiTextField-root": {
      width: "100%",
    },
    "& label.Mui-focused": {
      color: "#10458c",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        backgroundColor: "#FFF !important",
        borderRadius: "12px",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#10458c",
        color: "#10458c !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#10458c",
        color: "#10458c !important",
      },
      "& .MuiInputBase-input": {
        zIndex: 22,
      },
    },
  });

  const { userTabsValue, setUserTabsValue }: any = useTabsContext();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div data-aos="fade-right" className={styles.EditProfilePage}>
      <Typography sx={{ fontSize: "1.2rem" }} color={"primary"}>
        Account Information
      </Typography>
      <Typography
        sx={{ color: "#000", fontSize: "0.9rem", fontWeight: "200" }}
        color={"primary"}
      >
        Update your account information
      </Typography>

      <Grid container sx={{ mt: 4 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            First Name
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter First Name"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Last Name
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Last Name"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1 }}>Email</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <StyledDatePicker
                sx={{ width: "100%" }}
                fullWidth
                label="Birth Date"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Image
            src={"/images/Dashboard/Vector-phone.svg"}
            width={20}
            height={20}
            alt={"sms"}
            style={{
              position: "absolute",
              right: "15px",
              top: "70%",
              transform: "translateY(-50%)",
              zIndex: "22",
            }}
          />
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Phone
          </InputLabel>
          <CssTextField
            fullWidth
            type="tel"
            label="Enter Phone Number"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ position: "relative" }}>
          <Image
            src={"/images/Dashboard/sms.svg"}
            width={20}
            height={20}
            alt={"sms"}
            style={{
              position: "absolute",
              right: "15px",
              top: "70%",
              transform: "translateY(-50%)",
              zIndex: "22",
            }}
          />
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Email
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Email"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Country
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Country"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Weight
          </InputLabel>
          <CssTextField
            fullWidth
            type="number"
            label="Enter Weight"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Marital Status
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Marital Status"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Job Title
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Job Title"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Boys Number
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Boys Number"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
            Girls Number
          </InputLabel>
          <CssTextField
            fullWidth
            label="Enter Girls Number"
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
              },
            }}
          />
        </Grid>
      </Grid>

      <div className="w-full mt-8 flex items-center justify-center">
        <Button
          sx={{
            backgroundColor: "#10458c !important",
            color: "#FFF",
            padding: "8px 32px",
            borderRadius: "8px",
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
