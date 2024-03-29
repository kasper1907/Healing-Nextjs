import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { SignUpForm } from "@/models/SignUp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledDatePicker } from "@/components/Dashboard/UserMain/EditProfile/page";
import { useTranslation } from "react-i18next";

const Specific_Problem = ({
  formData,
  setFormData,
}: {
  formData: SignUpForm;
  setFormData: any;
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <div data-aos="fade-right">
        <div
          style={{ width: "100%", marginTop: "30px" }}
          className={styles.inputWrapper}
        >
          <FormControl fullWidth>
            <InputLabel id="select-label">
              {t("Select Complaint Type")}
            </InputLabel>
            <Select
              sx={{
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "&. MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&. MuiPaper-root MuiPaper-elevation": {
                  left: 0,
                  width: "100%",
                },
              }}
              labelId="select-label"
              id="demo-simple-select-autowidth"
              value={formData?.type_of_complaint}
              onChange={(e) => {
                setFormData({ ...formData, type_of_complaint: e.target.value });
              }}
              autoWidth
              label={t("Select Complaint Type")}
            >
              <MenuItem value="">
                <em>{t("None")}</em>
              </MenuItem>
              <MenuItem value={"Organic"}>{t("Organic")}</MenuItem>
              <MenuItem value={"Psychological"}>{t("Psychological")}</MenuItem>
              <MenuItem value={"Relations"}>{t("Relations")}</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container sx={{ width: "100%", mt: 4 }}>
          <Grid xs={12}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              {t("Date Of Complaint")}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formData?.date_of_problem}
                onChange={(e: any) => {
                  setFormData({ ...formData, date_of_problem: e });
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": { padding: "0" },
                }}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>

          <Grid xs={12}>
            <TextField
              sx={{
                mt: 4,
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  // border: "none !important",
                  borderRadius: "10px",
                },
              }}
              value={formData.problem_desc}
              onChange={(e) => {
                setFormData({ ...formData, problem_desc: e.target.value });
              }}
              multiline
              rows={5}
              fullWidth
              label={t("Description of the complaint")}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              sx={{
                mt: 4,
                backgroundColor: "#FFF !important",
                borderRadius: "12px",
                border: "none !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  // border: "none !important",
                  borderRadius: "10px",
                },
              }}
              value={formData.sideEffects}
              onChange={(e) => {
                setFormData({ ...formData, sideEffects: e.target.value });
              }}
              multiline
              fullWidth
              rows={5}
              label={t("Side Effects of the complaint")}
            />
          </Grid>

          {formData?.type_of_complaint == "Relations" ? (
            <Grid xs={12}>
              <TextField
                sx={{
                  mt: 4,
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "10px",
                  },
                }}
                value={formData.medical_diagnosis}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    medical_diagnosis: e.target.value,
                  });
                }}
                multiline
                rows={2}
                fullWidth
                label={t("Is there a medical diagnosis?")}
              />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </Box>
  );
};

export default Specific_Problem;
