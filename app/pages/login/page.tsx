"use client";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "../../styles/sass/Pages/Login/Login.module.scss";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "next/link";
const page = () => {
  const CssTextField = styled(TextField)({
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

  return (
    <Grid container sx={{ height: "100vh", direction: "ltr" }}>
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
            <form className={styles.formWrapper}>
              <span className={styles.formText}>Welcome Back</span>

              <div className={styles.welcomeText}>
                <span>Sign in to</span>
                <span>Healing Center.</span>
              </div>

              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <CssTextField
                    fullWidth
                    label="Email"
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
                  <CssTextField
                    fullWidth
                    label="Password"
                    id="custom-css-outlined-input"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button className={styles.signInBtn}>Sign in</Button>
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
                    Forgot Password ?
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
  );
};

export default page;
