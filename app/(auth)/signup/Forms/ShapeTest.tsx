import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import ReactCodeInput from "react-verification-code-input";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { toast } from "sonner";
import Aos from "aos";
import "aos/dist/aos.css";

const ShapeTest = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  const [showNext, setShowNext] = React.useState(false);

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
        src={"/images/Dashboard/shape_test.jpg"}
        width={400}
        height={600}
        alt="Shape-Test"
      />
      <ReactCodeInput
        fields={7}
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
      />

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
          <Button
            disabled={showNext ? false : true}
            onClick={handleSubmit}
            className={styles.nextBtn}
          >
            {currentIndex === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShapeTest;
