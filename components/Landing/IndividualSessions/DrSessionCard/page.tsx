"use client";
import React, { useState } from "react";
import styles from "@/styles/sass/IndividualSessions/main.module.scss";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader/page";
import StyledButton from "@/components/shared/StyledButton";
import SmallDialog from "@/components/shared/Dialogs/SmallDialog/page";
import { Box } from "@mui/material";

const DrSessionCard = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div className={styles.DrSessionCard}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <SectionHeader
          Label="جلسات- مع دكتور أحمد الدملاوي"
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
            Label="جلسات- مع دكتور أحمد الدملاوي"
            isCentered={false}
            secondary={false}
          />
        </Box>
        <p className={`section-p mb-4 w-[594px] max-w-full ${styles.CardP}`}>
          هي جلسة فردية تسطتيع من خلالها الإفصاح عن معاناتك ومشاعرك بكل حرية
          وإنطلاق وبدون حرج ويساعدك دكتور أحمد على إدراك مشكلتك والمشاعر التي
          أدت لظهور ها وكيفية الإنتباه لها وإدارتها.
        </p>
        <div className={styles.buttonContainer}>
          <StyledButton
            isLink={false}
            label="اشترك الان"
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
