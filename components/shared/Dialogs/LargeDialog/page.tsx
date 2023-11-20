"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Grid from "@mui/material/Grid";
import styles from "@/styles/sass/Dialog/Dialog.module.scss";
import Image from "next/image";
import StyledButton from "../../StyledButton";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

import "@/styles/sass/Dialog/DialogSlider.scss";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function LargeDialog({
  open,
  setOpen,
  item,
  linkUrl,
  query,
  isBtnLink,
  sessionId,
}: any) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            width: "fit-content",
            maxWidth: "100% !important",
            background: "transparent",
            boxShadow: "none",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Swiper
            pagination={{
              clickable: true,
            }}
            slidesPerView={!isSmallScreen ? 2 : 1}
            spaceBetween={30}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Grid
                item
                sx={{
                  display: "flex",
                  width: "520px",
                  justifyContent: "center",
                }}
                xs={12}
                md={6}
              >
                <div className={styles.largeDialogContent}>
                  <div className={styles.dialogHeader}>
                    <Image
                      src={item?.img}
                      width={100}
                      height={100}
                      alt="DrAhmedSignature"
                    />
                    <div className={styles.headerText}>
                      <h2>{item?.name}</h2>
                      <p>مجموعة علاجية (24) فرد</p>
                    </div>
                  </div>
                  <div className={styles.ListContainer}>
                    <ul>
                      <li>عدد الحضور فى الجلسات من 24 إلى 30 فرد</li>
                      <li>تبدأ الجلسة عند إكتمال العدد</li>
                      <li>مدة الجلسة ساعة ونصف تشمل 12 جلسة</li>
                      <li>
                        متابعة يومية مع المساعد العلاجي ( 10 دقائق على الواتس
                        اب)
                      </li>
                      <li>جلسة أسبوعية مدتها نصف ساعة مع ال ُمرشد العلاجى</li>
                    </ul>
                  </div>
                  <div className={styles.buttonContainer}>
                    <StyledButton
                      isLink={isBtnLink}
                      url={linkUrl}
                      query={query}
                      isPrimary={true}
                      label="اشترك الأن"
                      fullWidth={false}
                    />
                  </div>
                </div>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid
                item
                sx={{
                  display: "flex",
                  width: "520px",
                  justifyContent: "center",
                }}
                xs={12}
                md={6}
              >
                <div className={styles.largeDialogContent}>
                  <div className={styles.dialogHeader}>
                    <Image
                      src={item?.img}
                      width={100}
                      height={100}
                      alt="DrAhmedSignature"
                    />
                    <div className={styles.headerText}>
                      <h2>{item?.name}</h2>
                      <p>مجموعة علاجية (8) أفراد</p>
                    </div>
                  </div>
                  <div className={styles.ListContainer}>
                    <ul>
                      <li>عدد الحضور فى الجلسات من 24 إلى 30 فرد</li>
                      <li>تبدأ الجلسة عند إكتمال العدد</li>
                      <li>مدة الجلسة ساعة ونصف تشمل 12 جلسة</li>
                      <li>
                        متابعة يومية مع المساعد العلاجي ( 10 دقائق على الواتس
                        اب)
                      </li>
                      <li>جلسة أسبوعية مدتها نصف ساعة مع ال ُمرشد العلاجى</li>
                    </ul>
                  </div>
                  <div className={styles.buttonContainer}>
                    <StyledButton
                      isLink={isBtnLink}
                      url={linkUrl}
                      query={query}
                      isPrimary={true}
                      label="اشترك الأن"
                      fullWidth={false}
                    />
                  </div>
                </div>
              </Grid>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Grid
          sx={{ display: { xs: "none", md: "flex" } }}
          container
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid
            item
            sx={{
              display: "flex",
              width: "520px",
              justifyContent: "center",
            }}
            xs={12}
            md={6}
          >
            <div className={styles.largeDialogContent}>
              <div className={styles.dialogHeader}>
                <Image
                  src={item?.img}
                  width={100}
                  height={100}
                  alt="DrAhmedSignature"
                />
                <div className={styles.headerText}>
                  <h2>{item?.name}</h2>
                  <p>مجموعة علاجية (24) فرد</p>
                </div>
              </div>
              <div className={styles.ListContainer}>
                <ul>
                  <li>عدد الحضور فى الجلسات من 24 إلى 30 فرد</li>
                  <li>تبدأ الجلسة عند إكتمال العدد</li>
                  <li>مدة الجلسة ساعة ونصف تشمل 12 جلسة</li>
                  <li>
                    متابعة يومية مع المساعد العلاجي ( 10 دقائق على الواتس اب)
                  </li>
                  <li>جلسة أسبوعية مدتها نصف ساعة مع ال ُمرشد العلاجى</li>
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                <StyledButton
                  isLink={true}
                  query={query}
                  url="/signup"
                  isPrimary={true}
                  label="اشترك الأن"
                  fullWidth={false}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              width: "520px",
              justifyContent: "center",
            }}
            xs={12}
            md={6}
          >
            <div className={styles.largeDialogContent}>
              <div className={styles.dialogHeader}>
                <Image
                  src={item?.img}
                  width={100}
                  height={100}
                  alt="DrAhmedSignature"
                />
                <div className={styles.headerText}>
                  <h2>{item?.name}</h2>
                  <p>مجموعة علاجية (8) أفراد</p>
                </div>
              </div>
              <div className={styles.ListContainer}>
                <ul>
                  <li>عدد الحضور فى الجلسات من 24 إلى 30 فرد</li>
                  <li>تبدأ الجلسة عند إكتمال العدد</li>
                  <li>مدة الجلسة ساعة ونصف تشمل 12 جلسة</li>
                  <li>
                    متابعة يومية مع المساعد العلاجي ( 10 دقائق على الواتس اب)
                  </li>
                  <li>جلسة أسبوعية مدتها نصف ساعة مع ال ُمرشد العلاجى</li>
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                <StyledButton
                  isLink={true}
                  query={query}
                  url="/signup"
                  isPrimary={true}
                  label="اشترك الأن"
                  fullWidth={false}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
