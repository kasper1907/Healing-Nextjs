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

const Specific_Problem = ({
  formData,
  setFormData,
}: {
  formData: SignUpForm;
  setFormData: any;
}) => {
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
            <InputLabel id="select-label">Select Complaint Type</InputLabel>
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
              label="Select Complaint Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Organic"}>Organic</MenuItem>
              <MenuItem value={"Psychological"}>Psychological</MenuItem>
              <MenuItem value={"Relations"}>Relations</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Grid container sx={{ width: "100%", mt: 4 }}>
          <Grid xs={12}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Date Of Birth
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
              multiline
              rows={5}
              fullWidth
              label="Description of the complaint"
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
              multiline
              fullWidth
              rows={5}
              label="Symptoms of complaint"
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
                    // border: "none !important",
                    borderRadius: "10px",
                  },
                }}
                multiline
                rows={2}
                fullWidth
                label="Is there a medical diagnosis?"
              />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </Box>
  );
};

export default Specific_Problem;
