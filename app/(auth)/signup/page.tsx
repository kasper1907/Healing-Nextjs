"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { toast } from "sonner";
import BirthInfo from "./Forms/BirthInfo";
import ContactInfo from "./Forms/ContactInfo";
import Image from "next/image";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import PersonalInfo from "./Forms/PersonlaInfo";
import Test1 from "./Forms/Test1";

const steps = [
  "Contact",
  "Birth Info",
  "Personal info",
  "Boxes Arrangement 1",
  "Boxes Arrangement 2",
  "Medical data",
  "Upload Documents",
];

const steps2Array = [
  {
    label: "Contact",
    component: ContactInfo,
    isCompleted: false,
  },
  {
    label: "Birth Info",
    component: BirthInfo,
    isCompleted: false,
  },
  {
    label: "Personal info",
    component: PersonalInfo,
  },
  {
    label: "Boxes Arrangement 1",
    component: Test1,
  },
  {
    label: "Boxes Arrangement 2",
    component: BirthInfo,
  },
  {
    label: "Medical data",
    component: BirthInfo,
  },
  {
    label: "Upload Documents",
    component: BirthInfo,
  },
];

export default function Page() {
  // console.log("steps", steps2Array);

  const [activeStep, setActiveStep] = React.useState(3);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [currentStep, setCurrentStep] = React.useState<any>(3);
  const [steps2, setSteps2] = React.useState<any>(steps2Array);
  const [formData, setFormData] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    Nationality: "",
    gender: "",
    hand: "",
    height: "",
    weight: "",
    maritalStatus: "",
    jobTitle: "",
    countryOfLiving: "",
    boys: "",
    girls: "",
    boxes1: [],
    boxes2: [],
    sessionType: "",
    expectations: "",
    type_of_complaint: "",
    description_of_complaint: "",
    symptoms_of_complaint: "",
    complaint_start_date: "",
  });
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  React.useEffect(() => {
    setCurrentStep(steps2[3]);
  }, [steps2]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setCurrentStep(steps2[activeStep + 1]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep(steps2[activeStep - 1]);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // console.log("activeStep", activeStep);

  return (
    <div
      style={{
        padding: "60px",
        background: "#F8F8F8",
        minHeight: "100vh",
        height: "fit-content",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper
          sx={{
            display: "none",
          }}
          activeStep={activeStep}
        >
          {steps2.map((label: any, index: any) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label?.label} {...stepProps}>
                <StepLabel {...labelProps}>{label?.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Image
            src="/images/Dashboard/brain ct.svg"
            width={200}
            height={200}
            alt="page-header_img"
          />
          <Typography
            variant="h4"
            fontSize={29}
            color={"primary"}
            sx={{ mb: 1 }}
          >
            Create An Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "#92929d", fontSize: "19px" }}
          >
            Enter your personal information
          </Typography>
        </div>
        {activeStep === steps2.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Container sx={{ margin: "auto" }}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
                {currentStep?.component && (
                  <currentStep.component
                    steps={steps2}
                    setSteps={setSteps2}
                    currentIndex={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </Typography>
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  color="error"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className={styles.backBtn}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext} className={styles.nextBtn}>
                  {activeStep === steps2.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box> */}
            </Container>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
