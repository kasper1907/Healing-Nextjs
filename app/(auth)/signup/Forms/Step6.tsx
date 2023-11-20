import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
const Step6 = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    steps[currentIndex].isCompleted = true;
    handleNext();
  };
  return (
    <div data-aos="fade-right">
      Step6
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

export default Step6;
