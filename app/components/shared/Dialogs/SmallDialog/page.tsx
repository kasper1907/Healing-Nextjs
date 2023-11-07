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
import styles from "../../../../styles/sass/Dialog/Dialog.module.scss";
import Image from "next/image";
import StyledButton from "../../StyledButton";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SmallDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Grid container justifyContent="center" rowSpacing={2}>
          <Grid
            item
            sx={{
              display: "flex",
              width: "420px",
              justifyContent: "center",
            }}
            xs={12}
            md={6}
          >
            <div className={styles.smallDialogContent}>
              <div className={styles.dialogHeader}>
                <Image
                  src={"/images/signatureDrAhmed.svg"}
                  width={100}
                  height={100}
                  alt="DrAhmedSignature"
                />
                <div className={styles.headerText}>
                  <h2>جلسات-دكتور أحمد الدملاوي</h2>
                  <p>استشارات عاجلة</p>
                </div>
              </div>
              <div className={styles.ListContainer}>
                <ul>
                  <li>جلسات فردية مع دكتور أحمد الدملاوي</li>
                  <li>مدة الجلسة 15 إلي 25 دقيقة فقط</li>
                  <li>تبدأ الجلسة بعد تحديد الشكوى للعميل</li>
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                <StyledButton
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
              width: "420px",
              justifyContent: "center",
            }}
            xs={12}
            md={6}
          >
            <div className={styles.smallDialogContent}>
              <div className={styles.dialogHeader}>
                <Image
                  src={"/images/signatureDrAhmed.svg"}
                  width={100}
                  height={100}
                  alt="DrAhmedSignature"
                />
                <div className={styles.headerText}>
                  <h2>جلسات-دكتور أحمد الدملاوي</h2>
                  <p>جلسه one to one</p>
                </div>
              </div>
              <div className={styles.ListContainer}>
                <ul>
                  <li>جلسات فردية مع دكتور أحمد الدملاوي</li>
                  <li>مدة الجلسة ساعة واحدة فقط</li>
                  <li>تبدأ الجلسة بعد تحديد الشكوى للعميل</li>
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                <StyledButton
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
