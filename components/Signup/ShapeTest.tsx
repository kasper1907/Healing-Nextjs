import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { toast } from "sonner";
import Aos from "aos";
import "aos/dist/aos.css";
import ActionsButtons from "./ActionsButtons";
import { useTranslation } from "react-i18next";
import VerificationCodeInput from "../shared/VerficationInput/page";
import InputForShapeTest from "../shared/VerficationInput/VerficationForShapeTest";

const ShapeTest = ({
  handleNext,
  steps,
  formData,
  setSteps,
  currentIndex,
  handleBack,
  setFormData,
}: any) => {
  const [showNext, setShowNext] = React.useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (showNext) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    } else {
      toast.warning(t("Please fill all fields"));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      data-aos="fade-right"
    >
      <Typography
        color={"primary"}
        style={{
          fontFamily: "Tajawal",
          fontSize: "20px",
        }}
      >
        رتب أرقام المربعات من المفضل للأقل تفضيلاً
      </Typography>
      <Image
        src={"/images/Dashboard/shape_test.jpg"}
        width={400}
        height={600}
        alt="Shape-Test"
      />

      <InputForShapeTest
        setShowNext={setShowNext}
        code={formData?.shapeTest}
        formData={formData}
        setCode={setFormData}
      />
      <Grid
        container
        flexDirection={lang == "en" ? "row" : "row-reverse"}
        sx={{ mt: 4 }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: lang == "en" ? "flex-end" : "flex-start",
            padding: "5px",
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
            {t("Back")}
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: lang == "en" ? "flex-start" : "flex-end",
            padding: "5px",
          }}
          item
          xs={6}
          md={6}
        >
          <Button
            disabled={showNext ? false : true}
            onClick={handleSubmit}
            className={styles.nextBtn}
          >
            {currentIndex === steps.length - 1 ? t("Finish") : t("Next")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShapeTest;
