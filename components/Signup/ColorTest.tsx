import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { toast } from "sonner";
import Aos from "aos";
import "aos/dist/aos.css";
import ActionsButtons from "./ActionsButtons";
import VerificationCodeInput from "../shared/VerficationInput/page";
import { useTranslation } from "react-i18next";

const ColorTest = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  const [showNext, setShowNext] = React.useState(false);
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage;
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = () => {
    if (showNext) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    } else {
      toast.warning("Please fill all fields");
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
        src={"/images/Dashboard/color_test.jpg"}
        width={400}
        height={400}
        alt="Color-Test1"
      />
      {/* <ReactCodeInput
        fields={5}
        className="custom-class"
        onComplete={(e) => {
          // console.log(e);
          setShowNext(true);
        }}
        onChange={(e) => {
          if (e.length == 0) {
            setShowNext(false);
          }
        }}
      /> */}
      <VerificationCodeInput
        setShowNext={setShowNext}
        code={formData?.colorTest}
        formData={formData}
        setCode={setFormData}
        type="colorTest"
      />
      {/* <ActionsButtons
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        currentIndex={currentIndex}
        steps={steps}
      /> */}

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

export default ColorTest;
