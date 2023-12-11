import React, { useEffect } from "react";
import { useTabsContext } from "../../TabsContext";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/Profile/Profile.module.scss";
import dropZoneStyles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";

import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import { endPoints } from "@/services/endpoints";
import { getOne, postRequest } from "@/services/service";
import { UserDetails } from "@/models/User";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import jwt from "jsonwebtoken";
import Dropzone from "@/utils/Dropzone";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
export const CssTextField: any = styled(TextField as any)({
  "& label.Mui-focused": {
    color: "#10458c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      backgroundColor: "#FFF !important",
      borderRadius: "12px",
      width: "100%",
    },
    "&:hover fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "& .MuiInputBase-input": {
      zIndex: 22,
    },
  },
});

export const StyledDatePicker: any = styled(DatePicker as any)({
  "& .MuiSvgIcon-root": {
    zIndex: 22,
  },
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& label.Mui-focused": {
    color: "#10458c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      backgroundColor: "#FFF !important",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "100%",
    },
    "&:hover fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "& .MuiInputBase-input": {
      zIndex: 22,
    },
  },
});

const EditProfile = () => {
  const [userToken, setUserToken] = useCookie("accessToken", "0");
  const { userTabsValue, setUserTabsValue }: any = useTabsContext();
  const [userData, setUserData] = React.useState({} as UserDetails);
  const [newData, setNewData] = React.useState({} as UserDetails);
  const [files, setFiles] = React.useState([] as any);
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const decodedToken = jwt.decode(userToken?.toString()) as any;
  const { data, isLoading } = useSWR(
    endPoints.getUser(decodedToken?.data?.user_id as string),
    getOne
  );

  const user: UserDetails = data?.data;

  let defaultUserData = {
    full_name: user?.full_name || "",
    email: user?.email || "",
    country: user?.country || "",
    phone: user?.phone || "",
    date_of_birth: user?.date_of_birth || "",
    time_of_birth: user?.time_of_birth || "",
    weight: user?.weight || "",
    height: user?.height || "",
    job_title: user?.job_title || "",
    social_status: user?.social_status || "",
    number_of_boys: user?.number_of_boys || "",
    number_of_girls: user?.number_of_girls || "",
  };
  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    setUserData({
      full_name: user?.full_name || "",
      email: user?.email || "",
      country: user?.country || "",
      phone: user?.phone || "",
      date_of_birth: user?.date_of_birth || "",
      time_of_birth: user?.time_of_birth || "",
      weight: user?.weight || "",
      height: user?.height || "",
      job_title: user?.job_title || "",
      social_status: user?.social_status || "",
      number_of_boys: user?.number_of_boys || "",
      number_of_girls: user?.number_of_girls || "",
    } as UserDetails);
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("file", files[0]);

    const res = await postRequest(
      endPoints.updateUser(decodedToken?.data?.user_id),
      formData,
      () => {
        toast.success("Your Data Updated Successfully");
        let mutateEndPoint = endPoints.getUser(decodedToken?.data?.user_id);
        mutate(mutateEndPoint);
      }
    );
    let test = await res.accessToken;

    if (res.status == "success") {
      if (res.accessToken != undefined) {
        setUserToken(test?.toString());
        // mutate(endPoints.getUser(decodedToken?.data?.user_id));
      }
    }
    setLoading(false);
  };

  return (
    <div data-aos="fade-right" className={styles.EditProfilePage}>
      <form onSubmit={handleSubmit}>
        <Typography
          sx={{
            gap: 1,
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
          }}
          color={"primary"}
        >
          <FaArrowLeft
            style={{ cursor: "pointer" }}
            onClick={() => setUserTabsValue(1)}
          />
          Account Information
        </Typography>
        <Typography
          sx={{ color: "#000", fontSize: "0.9rem", fontWeight: "200" }}
          color={"primary"}
        >
          Update your account information
        </Typography>

        <Grid container sx={{ mt: 4 }} spacing={2}>
          <Grid item xs={12}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Full Name
            </InputLabel>
            <CssTextField
              value={userData?.full_name}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter First Name"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1 }}>
              Birth Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <StyledDatePicker
                  value={dayjs(userData?.date_of_birth)}
                  onChange={(e: any) => {
                    setUserData((prev) => ({
                      ...prev,
                      date_of_birth: e,
                    }));
                  }}
                  sx={{ width: "100%" }}
                  fullWidth
                  placeholder="Birth Date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Image
              src={"/images/Dashboard/Vector-Phone.svg"}
              width={20}
              height={20}
              alt={"sms"}
              style={{
                position: "absolute",
                right: "15px",
                top: "70%",
                transform: "translateY(-50%)",
                zIndex: "22",
              }}
            />
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Phone
            </InputLabel>
            <CssTextField
              value={userData?.phone}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              fullWidth
              type="tel"
              placeholder="Enter Phone Number"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ position: "relative" }}>
            <Image
              src={"/images/Dashboard/sms.svg"}
              width={20}
              height={20}
              alt={"sms"}
              style={{
                position: "absolute",
                right: "15px",
                top: "70%",
                transform: "translateY(-50%)",
                zIndex: "22",
              }}
            />
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Email
            </InputLabel>
            <CssTextField
              value={userData?.email}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Email"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Country
            </InputLabel>
            <CssTextField
              value={userData?.country}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Country"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Weight
            </InputLabel>
            <CssTextField
              value={userData?.weight}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  weight: e.target.value,
                }));
              }}
              fullWidth
              type="number"
              placeholder="Enter Weight"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Marital Status
            </InputLabel>
            <CssTextField
              value={userData?.social_status}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  social_status: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Marital Status"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Job Title
            </InputLabel>
            <CssTextField
              value={userData?.job_title}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  job_title: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Job Title"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Boys Number
            </InputLabel>
            <CssTextField
              value={userData?.number_of_boys}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  number_of_boys: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Boys Number"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel sx={{ fontSize: "0.9rem", ml: 1, mb: 1 }}>
              Girls Number
            </InputLabel>
            <CssTextField
              value={userData?.number_of_girls}
              onChange={(e: any) => {
                setUserData((prev) => ({
                  ...prev,
                  number_of_girls: e.target.value,
                }));
              }}
              fullWidth
              placeholder="Enter Girls Number"
              id="custom-css-outlined-input"
              sx={{
                "& .MuiFormControl-root ": {
                  backgroundColor: "#FFF !important",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={dropZoneStyles.dropZoneWrapper}>
              <Dropzone
                files={files}
                setFiles={setFiles}
                isSubmitExternal={true}
              />
            </div>
          </Grid>
        </Grid>

        <div className="w-full mt-8 flex gap-2 items-center justify-center">
          <Button
            sx={{
              backgroundColor: "transparent !important",
              color: "#10458c !important",
              padding: "8px 32px",
              borderRadius: "8px",
              border: "1px solid #10458c !important",
            }}
            onClick={() => setUserTabsValue(1)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#10458c !important",
              color: "#FFF",
              padding: "8px 32px",
              borderRadius: "8px",
            }}
            type="submit"
            className="main-btn"
            disabled={JSON.stringify(defaultUserData) === JSON.stringify(user)}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
