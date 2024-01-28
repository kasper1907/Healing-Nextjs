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
import Loading from "@/app/(dashboard)/loading";
import { Progress } from "@nextui-org/react";

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
  const [loadingChangeLang, setLoadingChangeLang] = React.useState(false);
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
    setLoadingChangeLang(true);
    setTimeout(() => {
      setLoadingChangeLang(false);
    }, 1000);
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
  // console.log(sessionData);
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
              : Step6
            : Step6,
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
    problem_desc: "",
    date_of_problem: dayjs(),
    sideEffects: "",
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

  const stepperProgress: any = {
    0: 15,
    1: 30,
    2: 45,
    3: 60,
    4: 75,
    5: 90,
    6: 95,
    7: 100,
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

  if (loadingChangeLang) {
    return <Loading />;
  }

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
        height: "calc(100vh - 96px)",
      }}
    >
      <Box sx={{ width: "100%", background: "#f8f8f8" }}>
        <Stepper
          className="stepper"
          sx={{
            "& .MuiStepLabel-root ": {
              gap: "5px",
            },
            "& .MuiStep-root ": {
              minWidth: "100px",
            },
            border: "0 solid",
            boxShadow:
              i18n.resolvedLanguage == "en"
                ? "inset -3px -2px 6px 0px #cfcdcd"
                : "inset 3px -2px 6px 0px #cfcdcd",
            background: `#FFF`,
            position: "relative",
            left: "0",
            top: "0",
            padding: "20px 0px",
            maxWidth: "100vw",
            zIndex: "2",
            overflowX: "auto",
            overflowY: "hidden",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            width: "100%",
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
        <Progress
          aria-label="Downloading..."
          size="md"
          value={stepperProgress[activeStep]}
          color="primary"
          radius="none"
          showValueLabel={false}
          className="w-full"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "260px",
            // marginTop: "95px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Container
              sx={{
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
        {activeStep === steps2.length ? ( // <React.Fragment data-aos="fade-right">
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
            className="flex items-center flex-col gap-2 w-full h-full mt-6 "
          >
            <Typography sx={{ mt: 1, mb: 2 }} color={"primary"}>
              {t("Registration Completed!")}
            </Typography>
            <Typography
              sx={{ mt: 1, mb: 2, textAlign: "center" }}
              color={"primary"}
            >
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
