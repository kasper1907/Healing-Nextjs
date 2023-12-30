"use client";
import React, { useState } from "react";
import styles from "@/styles/sass/IndividualSessions/main.module.scss";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader/page";
import StyledButton from "@/components/shared/StyledButton";
import SmallDialog from "@/components/shared/Dialogs/SmallDialog/page";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const DrSessionCard = () => {
  const { t, i18n } = useTranslation();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div className={styles.DrSessionCard}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <SectionHeader
          // Label="جلسات- مع دكتور أحمد الدملاوي"
          Label={t("Sessions With Dr. Ahmed El Demelawy")}
          isCentered={true}
          secondary={true}
        />
      </Box>
      <div className={styles.image}>
        <Image
          src={"/images/TherapySessions1/dr-ahmed.svg"}
          width={364}
          height={321}
          alt="Dr.Ahmed"
        />
      </div>
      <div className={styles.text}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SectionHeader
            Label={t("Sessions With Dr. Ahmed El Demelawy")}
            isCentered={false}
            secondary={false}
          />
        </Box>
        <p className={`section-p mb-4 w-[594px] max-w-full ${styles.CardP}`}>
          {t(
            "Its an individual session in which you can freely and freely disclose your suffering and feelings without embarrassment. Dr. Ahmed helps you to realize your problem, the feelings that led to its appearance, how to pay attention to it and manage it."
          )}
        </p>
        <div className={styles.buttonContainer}>
          <StyledButton
            isLink={false}
            label={t("Subscribe Now")}
            isPrimary={true}
            onClick={handleOpenDialog}
          />
        </div>
      </div>
      <SmallDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default DrSessionCard;
