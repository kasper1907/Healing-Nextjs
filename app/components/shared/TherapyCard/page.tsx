"use client";
import React, { useState } from "react";
import styles from "../../../styles/sass/TherapyCard/TherapyCard.module.scss";
import { Grid } from "@mui/material";
import Image from "next/image";
import LargeDialog from "../Dialogs/LargeDialog/page";
import { useTransition } from "react";
const TherapyCard = ({
  idx,
  name,
  img,
}: {
  idx: number;
  name: string;
  img: string;
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [item, setItem] = useState<any>({});
  const handleClickSubscribe = () => {
    startTransition(() => {
      setItem({
        name: name,
        img: img,
      });
      setOpenDialog(true);
    });
  };

  return (
    <div className={styles.therapyCard} key={idx}>
      <LargeDialog open={openDialog} setOpen={setOpenDialog} item={item} />;
      <Image
        src={img}
        width={99}
        height={99}
        alt="TherapyCardImg"
        className={styles.TherapyCardImg}
      />
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          className={`${styles.topSection} flex items-center justify-center`}
          sx={{
            height: "60%",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
          }}
        >
          <span className={styles.topText}>{name}</span>
        </Grid>
        <Grid
          item
          xs={12}
          className={`${styles.bottomSection} flex items-center justify-center text-white`}
          sx={{
            height: "40%",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleClickSubscribe}
        >
          اشترك الان
        </Grid>
      </Grid>
    </div>
  );
};

export default TherapyCard;
