import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledDatePicker } from "@/components/Dashboard/UserMain/EditProfile/page";
import { SignUpForm } from "@/models/SignUp";
import { FcInfo } from "react-icons/fc";
import Specific_Problem from "./Specific_Problem";

const BrainCTQuestions = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: {
  handleNext: any;
  steps: any;
  setSteps: any;
  currentIndex: any;
  handleBack: any;
  formData: SignUpForm;
  setFormData: any;
}) => {
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
          <div style={{ width: "100%" }} className={styles.inputWrapper}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Session type</InputLabel>
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
                value={formData?.sessionType}
                onChange={(e) => {
                  setFormData({ ...formData, sessionType: e.target.value });
                }}
                autoWidth
                label="Select Session type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Exploratory"}>Exploratory</MenuItem>
                <MenuItem value={"Specific_Problem"}>Specific Problem</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>

        <Grid item xs={12}>
          {formData?.sessionType == "Exploratory" ? (
            <div data-aos="fade-right" className="flex flex-col gap-2">
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <FcInfo />
                <Typography color={"primary"}>
                  A general reading of the layers of the brain that control your
                  choices and behaviors, and providing an appropriate treatment
                  proposal
                </Typography>
              </Box>

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
                label="What are your expectations for the results of the session ? (your goals from the session)"
              />
            </div>
          ) : null}

          {formData?.sessionType == "Specific_Problem" && (
            <Specific_Problem formData={formData} setFormData={setFormData} />
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          item
          xs={6}
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
          xs={6}
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

export default BrainCTQuestions;
