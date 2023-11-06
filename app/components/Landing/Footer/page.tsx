import React from "react";
import styles from "../../../styles/sass/Footer/Footer.module.scss";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import { BsYoutube } from "react-icons/bs";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <Grid container className={styles.footerGrid}>
          <Grid item className={styles.GridItem} xs={5}>
            <hr />
          </Grid>
          <Grid item className={styles.GridItem} xs={2}>
            <Grid container>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-10px",
                }}
                xs={4}
              >
                <Image
                  src="/images/facebook.svg"
                  alt="social-logo"
                  width={21}
                  height={14}
                  style={{ transform: "rotate(90deg)", cursor: "pointer" }}
                />{" "}
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-10px",
                }}
                xs={4}
              >
                <Image
                  src="/images/instagram.svg"
                  alt="social-logo"
                  width={21}
                  height={14}
                  style={{ transform: "rotate(90deg)", cursor: "pointer" }}
                />{" "}
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-10px",
                }}
                xs={4}
              >
                <Image
                  src="/images/youtube.svg"
                  alt="social-logo"
                  width={21}
                  height={14}
                  style={{ transform: "rotate(90deg)", cursor: "pointer" }}
                />{" "}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.GridItem} xs={5}>
            <hr />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
