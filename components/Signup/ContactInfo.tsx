import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";
import { Grid, InputLabel, TextField } from "@mui/material";
import { CssTextField } from "@/components/Dashboard/UserMain/EditProfile/page";
import ReactFlagsSelect from "react-flags-select";
import Aos from "aos";
import "aos/dist/aos.css";
import "./signup.css";
import { customLabels } from "@/constants/Countries";
import { toast } from "sonner";
import { checkPhoneNumberLength } from "@/utils/validPhoneNumber";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import ActionsButtons from "./ActionsButtons";
import { boolean, number, object, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
//@ts-ignore
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";

const ContactInfo = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  formData,
  setFormData,
}: any) => {
  const [selected, setSelected] = useState<any>("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  useEffect(() => {
    Aos.init();
  }, []);

  interface FormData {
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
  }

  useEffect(() => {
    if (formData?.countryCode !== "") {
      const code = Object.keys(customLabels).find(
        (key) => customLabels[key].secondary === formData?.countryCode
      );
      setSelected(code);
    }
  }, [formData]);

  const handleSelect = (code: any) => {
    setCountryCode(code);
  };
  useEffect(() => {
    if (countryCode) {
      const secondaryLabel: any = customLabels[countryCode]?.secondary;
      setSelected(countryCode);
      setFormData({ ...formData, countryCode: secondaryLabel });
    }
  }, [countryCode, selected]);

  const validationSchema = object().shape({
    firstName: string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters"),
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    lastName: string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters"),
    phone: number()
      .typeError("Phone must be a number")
      .required("Enter Phone Number.")
      .min(11, "Too little"),
    // .max(12, "Large Phone Number!"),
    // selectOption: string().required("Please select an option"),
    // agreeToTerms: boolean().oneOf([true], "Please agree to terms"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: formData?.firstName || "",
      lastName: formData?.lastName || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData({ ...formData, ...data });
    steps[currentIndex].isCompleted = true;
    handleNext();
  };

  return (
    <div data-aos="fade-right" className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          alignContent={"center"}
          rowSpacing={4}
          spacing={{ xs: 0, md: 4 }}
          container
          sx={{
            margin: "0 !important",
            maxWidth: "100%",
          }}
        >
          <Grid item xs={12} md={6}>
            <div className={styles.inputWrapper}>
              <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
                {t("First Name")}
              </InputLabel>
              <TextField
                {...register("firstName")}
                type="text"
                autoComplete="off"
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                    borderRadius: "10px",
                  },
                }}
                fullWidth
                variant="outlined"
                placeholder={`${t("Enter Your First Name")}`}
              />
              {errors.firstName && (
                <p className="text-xs italic text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.inputWrapper}>
              <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
                {t("Last Name")}
              </InputLabel>
              <TextField
                autoComplete="off"
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                    borderRadius: "10px",
                  },
                }}
                {...register("lastName")}
                fullWidth
                variant="outlined"
                placeholder={`${t(`Enter Your Last Name`)}`}
              />
              {errors.lastName && (
                <p className="text-xs italic text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.inputWrapper}>
              <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
                {t("Email")}
              </InputLabel>
              <TextField
                {...register("email")}
                autoComplete="off"
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                    borderRadius: "10px",
                  },
                }}
                fullWidth
                variant="outlined"
                placeholder={t("Enter Your Email")}
              />
              {errors.email && (
                <p className="text-xs italic text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                position: "relative",
              }}
              className={styles.inputWrapper}
            >
              <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
                {t("Country")}
              </InputLabel>

              <ReactFlagsSelect
                selected={selected}
                onSelect={handleSelect}
                searchable={true}
                showOptionLabel={true}
                showSecondaryOptionLabel={true}
                showSecondarySelectedLabel={true}
                customLabels={customLabels}
                className="codeSelect !color-[#000]"
                placeholder={t("Select Country")}
              />

              <TextField
                autoComplete="off"
                sx={{
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    paddingRight:
                      i18n.resolvedLanguage === "ar" ? "140px" : "130px",
                    paddingLeft: selected ? "140px" : "170px",
                  },
                }}
                {...register("phone")}
                fullWidth
                variant="outlined"
                placeholder={t("Enter Your Phone Number")}
              />
            </div>
            {errors.phone && (
              <p className="text-xs italic text-red-500">
                {errors.phone.message}
              </p>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid
            sx={{ justifyContent: "flex-end", display: "flex" }}
            item
            xs={12}
            md={6}
          >
            {" "}
            <Button variant="flat" color="danger" className="w-[200px] mt-4">
              Back
            </Button>{" "}
          </Grid>
          <Grid
            sx={{ justifyContent: "flex-start", display: "flex" }}
            item
            xs={12}
            md={6}
          >
            <Button
              variant="flat"
              color="primary"
              type="submit"
              className="w-[200px] mt-4 !bg-[#10458C] text-white"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default React.memo(ContactInfo);
