import Dropzone from "@/utils/Dropzone";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import signUpStyles from "@/styles/sass/Dashboard/Forms/main.module.scss";

import { Button, Grid } from "@mui/material";
import ActionsButtons from "./ActionsButtons";
import AttachFiles from "./AttachFiles";

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
        <AttachFiles />
      </div>

      <ActionsButtons
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        currentIndex={currentIndex}
        steps={steps}
      />
    </div>
  );
};

export default Upload;
