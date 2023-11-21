import Dropzone from "@/utils/Dropzone";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import signUpStyles from "@/styles/sass/Dashboard/Forms/main.module.scss";

import { Button, Grid } from "@mui/material";

const Upload = ({
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
    <div data-aos="fade-right" className={styles.pageWrapper}>
      <div className={styles.dropZoneWrapper}>
        <Dropzone />
      </div>

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
            className={signUpStyles.backBtn}
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
          <Button onClick={handleSubmit} className={signUpStyles.nextBtn}>
            {currentIndex === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Upload;
