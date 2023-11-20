import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { Button, Grid, InputLabel } from "@mui/material";
import { CssTextField } from "@/components/Dashboard/UserMain/EditProfile/page";
import ReactFlagsSelect from "react-flags-select";
import Aos from "aos";
import "aos/dist/aos.css";
import "../signup.css";
import { customLabels } from "@/constants/Countries";
import { toast } from "sonner";
import { checkPhoneNumberLength } from "@/utils/validPhoneNumber";

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

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      selected !== "" &&
      formData.phone !== ""
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
        spacing={4}
        container
        sx={{
          margin: "0 !important",
        }}
      >
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              First Name
            </InputLabel>
            <CssTextField
              value={formData.firstName}
              onChange={(e: any) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
              fullWidth
              label="Enter First Name
"
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
              Last Name
            </InputLabel>
            <CssTextField
              value={formData.lastName}
              onChange={(e: any) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
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
          </div>{" "}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputWrapper}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Email
            </InputLabel>
            <CssTextField
              value={formData.email}
              onChange={(e: any) => {
                setFormData({ ...formData, email: e.target.value });
              }}
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
              Country
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
            />
            <CssTextField
              fullWidth
              value={formData?.phone}
              onChange={(e: any) => {
                if (isNaN(e.target.value)) {
                  toast.warning("Please enter numbers only");
                } else {
                  checkPhoneNumberLength(e.target.value)
                    ? setFormData({ ...formData, phone: e.target.value })
                    : null;
                }
              }}
              autoComplete={"off"}
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
                "& .MuiInputBase-input": {
                  paddingLeft: selected ? "140px" : "170px",
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
            // onClick={handleBack}
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

export default ContactInfo;
