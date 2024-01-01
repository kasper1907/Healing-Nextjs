"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  Container,
  Grid,
  Link,
  Skeleton,
} from "@mui/material";
import BirthInfo from "../../../components/Signup/BirthInfo";
import ContactInfo from "../../../components/Signup/ContactInfo";
import Image from "next/image";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import PersonalInfo from "../../../components/Signup/PersonlaInfo";
import Test1 from "../../../components/Signup/ColorTest";
import dayjs from "dayjs";
import ColorTest2 from "../../../components/Signup/ShapeTest";
import ShapeTest from "../../../components/Signup/ShapeTest";
import Step6 from "../../../components/Signup/Step6";
import Aos from "aos";
import "aos/dist/aos.css";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import { useSearchParams } from "next/navigation";
import { sessions } from "@/constants/Sessions";
import { Error as ErrorComponent } from "@/components/shared/Error/page";
import Upload from "../../../components/Signup/Upload";
import BrainCTQuestions from "@/components/Signup/BrainCTQuestions/page";
import { useTranslation } from "react-i18next";
import { SignUpForm } from "@/models/SignUp";
import CardsSkeleton from "@/components/Dashboard/Loading/CardsSkeleton";
import { TfiWorld } from "react-icons/tfi";
import ColorTest from "../../../components/Signup/ColorTest";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";

type Session = {
  ar_name: string;
  en_name: string;
  type: string;
  id: string | number;
  image: string;
  sessionId?: string | any;
  logo: string;
  course_name: string;
};

export default function Page() {
  const { t, i18n } = useTranslation();
  const Languages: any = {
    en: { nativeName: "English" },
    ar: { nativeName: "Arabic" },
  };
  const searchParams = useSearchParams();
  const sessionId: string | any = searchParams.get("sessionId");
  const [steps2, setSteps2] = React.useState<any>([]);

  const { data, isLoading } = useSWR(endPoints.getCourses, getOne, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: sessionData, isLoading: sessionLoading } = useSWR(
    endPoints.getCourseById(sessionId!),
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const Courses = data?.data;

  const currentSession: Session | undefined = Courses?.find(
    (s: Session) => s.id == sessionId
  )!;

  React.useEffect(() => {
    Aos.init();
  }, []);

  const handleLangItemClick = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  const currentTime = new Date();

  // Set the time part of the date
  currentTime.setHours(dayjs().hour());
  currentTime.setMinutes(dayjs().minute());
  currentTime.setSeconds(dayjs().second());

  const customStep = () => {
    if (sessionData != undefined) {
      if (sessionData?.data?.category_id == 2) {
        return {
          label: "Brain CT Questions",
          component: BrainCTQuestions,
          sectionText: "Answer the following questions",
        };
      } else {
        return {
          label: "Medical Data",
          component: Step6,
          sectionText: "Enter Your Medical Information",
        };
      }
    }
  };

  React.useEffect(() => {
    const steps = [
      {
        label: "Contact",
        component: ContactInfo,
        isCompleted: false,
        sectionText: "Enter your contact information",
      },
      {
        label: "Birth Info",
        component: BirthInfo,
        isCompleted: false,
        sectionText: "Enter your birth information",
      },
      {
        label: "Personal info",
        component: PersonalInfo,
        sectionText: "Enter your personal information",
      },
      {
        label: "Color Test",
        component: ColorTest,
        sectionText: "Solve This Color Test",
      },
      {
        label: "Shape Test",
        component: ShapeTest,
        sectionText: "Solve This Shape Test",
      },
      {
        label: "Brain CT Questions",
        component:
          sessionData?.data?.category_id != undefined
            ? sessionData?.data?.category_id === "2"
              ? BrainCTQuestions
              : sessionData?.data?.category_id === "1"
              ? Step6
              : null
            : null,
        sectionText: "Answer the following questions",
      },
      {
        label: "Upload Documents",
        component: Upload,
        sectionText: "Upload your documents",
      },
    ];

    setSteps2(steps);
  }, [sessionData?.data?.category_id]);
  // const steps = (sessionId: string | null) => [
  //   {
  //     label: "Contact",
  //     component: ContactInfo,
  //     isCompleted: false,
  //     sectionText: "Enter your contact information",
  //   },
  //   {
  //     label: "Birth Info",
  //     component: BirthInfo,
  //     isCompleted: false,
  //     sectionText: "Enter your birth information",
  //   },
  //   {
  //     label: "Personal info",
  //     component: PersonalInfo,
  //     sectionText: "Enter your personal information",
  //   },
  //   {
  //     label: "Color Test",
  //     component: ColorTest,
  //     sectionText: "Solve This Color Test",
  //   },
  //   {
  //     label: "Shape Test",
  //     component: ShapeTest,
  //     sectionText: "Solve This Shape Test",
  //   },
  //   {
  //     label: "Brain CT Questions",
  //     component:
  //       sessionData?.data?.category_id != undefined
  //         ? sessionData?.data?.category_id === "2"
  //           ? BrainCTQuestions
  //           : sessionData?.data?.category_id === "1"
  //           ? Step6
  //           : null
  //         : null,
  //     sectionText: "Answer the following questions",
  //   },
  //   {
  //     label: "Upload Documents",
  //     component: Upload,
  //     sectionText: "Upload your documents",
  //   },
  // ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [currentStep, setCurrentStep] = React.useState<any>(0);
  // const [steps2, setSteps2] = React.useState<any>(steps(sessionId));
  const [formData, setFormData] = React.useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    dateOfBirth: dayjs(),
    timeOfBirth: dayjs(),
    placeOfBirth: "",
    Nationality: "",
    gender: "",
    hand: "",
    height: "",
    weight: "",
    maritalStatus: "",
    jobTitle: "",
    country: { label: "", value: "", flag: "" },
    boys: "",
    girls: "",
    colorTest: ["", "", "", "", ""],
    shapeTest: ["", "", "", "", "", "", ""],
    sessionType: "",
    expectations: "",
    //Medical Data:
    organic_Psychological_complaint: "",
    date_of_Organic_Psychological_complaint: dayjs(),
    medical_diagnosis: "",
    type_of_complaint: "",
    // description_of_complaint: "",
    // symptoms_of_complaint: "",
    // complaint_start_date: "",
  });
  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  React.useEffect(() => {
    setCurrentStep(steps2[0]);
  }, [steps2, sessionData?.data?.category_id]);

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
    setCurrentStep(steps2[0]);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          height: "100vh",
          background: "#F8F8F8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!sessionId || !currentSession) {
    return (
      <div className="flex flex-row items-center justify-center w-full h-screen bg-[#F8F8F8]">
        <ErrorComponent msg={`No Session Found With ID: ${sessionId}`} />
      </div>
    );
  }

  return (
    <div
      style={{
        // padding: "60px",
        background: "#F8F8F8",
        minHeight: "100vh",
        height: "fit-content",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper
          sx={{
            "& .MuiStepLabel-root ": {
              gap: "5px",
            },
            background: `#FFF`,
            position: "fixed",
            left: "0",
            top: "0",
            padding: "20px 0px",
            maxWidth: "100vw",
            boxShadow: "0px 0px 20px #10458c1f",
            zIndex: "2",

            overflow: { xs: "scroll", md: "unset" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: "3px", md: "" },
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
                <StepLabel {...labelProps}>{t(label?.label)}</StepLabel>
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
          <Box sx={{ width: "100%" }}>
            <Container
              sx={{
                marginTop: { xs: "250px", md: "115px" },
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={`https://mtnhealingcenter.com/healing-center/${currentSession?.logo}`}
                width={150}
                height={150}
                alt="page-header_img"
              />

              <Button
                className={styles.langBtn}
                onClick={() =>
                  i18n.resolvedLanguage == "en"
                    ? handleLangItemClick("ar")
                    : handleLangItemClick("en")
                }
              >
                <TfiWorld />

                {i18n.resolvedLanguage == "en" && "Ar"}
                {i18n.resolvedLanguage == "ar" && "En"}
              </Button>
            </Container>
          </Box>
          {/* <button
            style={{
              background: "#FFF",
              padding: "20px",
            }}
            onClick={() => handleLangItemClick("ar")}
          >
            العربية
          </button> */}
          {/* {Object.keys(Languages).map((lang) => (
            <button
              key={lang}
              style={{
                fontWeight: i18n.language === lang ? "bold" : "normal",
              }}
              type="submit"
              onClick={() => {
                i18n.changeLanguage(lang);
              }}
              disabled={i18n.resolvedLanguage === lang}
            >
              {Languages[lang].nativeName}
            </button>
          ))} */}

          <Typography
            variant="h4"
            fontSize={29}
            color={"primary"}
            sx={{ mb: 1, fontFamily: "unset" }}
          >
            {activeStep === steps2.length
              ? t("Registeration is Done!")
              : t("Create An Account")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "#92929d", fontSize: "19px", margin: "0" }}
          >
            {currentStep?.sectionText ? t(currentStep?.sectionText) : ""}
          </Typography>
        </div>
        {activeStep === steps2.length ? (
          // <React.Fragment data-aos="fade-right">
          //   <Typography sx={{ mt: 2, mb: 1 }}>
          //     All steps completed - you&apos;re finished
          //   </Typography>
          //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          //     <Box sx={{ flex: "1 1 auto" }} />
          //     <Button onClick={handleReset}>Reset</Button>
          //   </Box>
          // </React.Fragment>
          <div
            data-aos="zoom-in"
            className="flex items-center flex-col gap-2 w-full h-full"
          >
            <Typography sx={{ mt: 1, mb: 2 }} color={"primary"}>
              {t("Registeration Completed!")}
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }} color={"primary"}>
              {t(
                "You will Receive A Whatsapp Message Soon With Your Username and Password"
              )}
            </Typography>
            <Image
              style={{
                marginLeft: "120px",
              }}
              src={"/images/Dashboard/steps_completed.svg"}
              width={250}
              height={250}
              alt="Done"
            />
            <Button variant="outlined" sx={{ mb: 10 }}>
              <Link href="/" sx={{ textDecoration: "none" }}>
                {t("Go Back")}
              </Link>
            </Button>
          </div>
        ) : (
          <React.Fragment>
            <Container sx={{ margin: "auto", padding: "0 !important" }}>
              <Box sx={{ mt: 2, mb: 1 }}>
                {/* Step {activeStep + 1} */}
                {currentStep?.component ? (
                  <currentStep.component
                    steps={steps2}
                    setSteps={setSteps2}
                    currentIndex={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    formData={formData}
                    setFormData={setFormData}
                  />
                ) : (
                  <Grid sx={{ mt: 4 }} spacing={4} container>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ borderRadius: "10px", mb: 2, width: "100%" }}
                        height={10}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
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
