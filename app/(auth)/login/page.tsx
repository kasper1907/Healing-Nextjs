"use client";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import React, { FormEvent, FormEventHandler, useState } from "react";
import styles from "@/styles/sass/Pages/Login/Login.module.scss";
// import styles from "styles/sass/Pages";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { postRequest } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import useCookie from "react-use-cookie";
import AuthProvider from "@/components/Dashboard/AuthProvider/page";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const AUTHENTICATION_COOKIE_NAME = "SID";

const AUTHENTICATION_COOKIE_OPTIONS = {
  sameSite: true,
  secure: process.env.NODE_ENV !== "development",
  maxAge: ONE_DAY_IN_MS,
};

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies([AUTHENTICATION_COOKIE_NAME]);
  const [userToken, setUserToken] = useCookie("SID");

  // const [userData, setUserData] = React.useState({
  //   username: "Dr.ahmed",
  //   password: "ahmed1234",
  // });
  const [userData, setUserData] = React.useState({
    username: "Michael_micheal",
    password: "m93120",
  });

  // const []

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData.username || !userData.password)
      // return toast.warning("Please fill all fields");
      setLoading(true);
    const { status, data } = await postRequest(endPoints.auth, userData);
    if (status == 200) {
      toast.success("Login Successfully");

      const userRole = await data?.data?.role;
      if (userRole == "User") {
        // router.push(
        //   `/dashboard/users/userDetails?id=${data?.data?.user_id}&groupId=${data?.data?.group_id}`
        // );
        router.push("/Profile");
      } else {
        router.push("/dashboard/Groups");
      }
      setUserToken(data?.accessToken);
    } else {
      toast.error("Invalid username or password");
    }
    // if (res.data.status == "success" && res.data.statusCode == 200) {
    //   //console.log(res.data.statusCode);
    //   //console.log(res.data.status);
    //   //console.log(res.data.SID);
    //   //console.log(res?.data?.data?.role);
    //   toast.success("Login Successfully");
    //   document.cookie = `SID=${res.data.SID}`;
    //   setCookie(
    //     AUTHENTICATION_COOKIE_NAME,
    //     res.data.SID,
    //     AUTHENTICATION_COOKIE_OPTIONS
    //   );

    //   window.localStorage.setItem("userData", JSON.stringify(res.data.data));
    //   if (res?.data?.data?.role == "User") {
    //     router.push(
    //       `/dashboard/users/userDetails?id=${res.data?.data.user_id}&groupId=${res.data.data.group_id}`
    //     );
    //   } else {
    //     router.push("/dashboard");
    //   }
    // }
    // if (res.status == "error" && res.statusCode == 400) {
    //   toast.error("Invalid username or password");
    // }
    setLoading(false);
  };
  return (
    <AuthProvider>
      <Grid
        container
        sx={{ height: "100vh", direction: "ltr", background: "#FFF" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
        >
          <Image
            src="/images/Login/Login-banner.svg"
            alt="login-banner"
            fill
            style={{ maxWidth: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#F8F8F8",
            padding: { xs: "40px 0px", md: "40px" },
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <Image
            src={"/images/healing-logo.svg"}
            alt="healing logo"
            width={153}
            height={74}
          />

          <div style={{ width: "100%" }}>
            <Container>
              <form className={styles.formWrapper} onSubmit={handleLogin}>
                <span className={styles.formText}>Welcome Back</span>

                <div className={styles.welcomeText}>
                  <span>Sign in to</span>
                  <span>Healing Center.</span>
                </div>

                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      value={userData.username}
                      onChange={(e: any) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      fullWidth
                      autoFocus
                      label="Email"
                      id="custom-css-outlined-input1"
                      sx={{
                        "& .MuiInputBase-root": {
                          background: "#FFF",
                          borderRadius: "10px",
                          border: "none",
                        },
                        "& .MuiFormControl-root ": {
                          backgroundColor: "#FFF !important",
                          borderRadius: "12px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      position: "relative",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      id="custom-css-outlined-input"
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={(e: any) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          background: "#FFF",
                          borderRadius: "10px",
                          border: "none",
                        },
                      }}
                    />
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(30%)",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FaRegEye
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(30%)",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" className={styles.signInBtn}>
                      {loading ? "Loading ..." : "Sign in"}
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Link className={styles.link} href="/pages/forget-password">
                      forgot password ?
                    </Link>
                    <div className={styles.singupLink}>
                      <span>Dont have an account ?</span>
                      <Link href="/pages/signup">Sign up</Link>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        </Grid>
      </Grid>
    </AuthProvider>
  );
};

export default Page;
