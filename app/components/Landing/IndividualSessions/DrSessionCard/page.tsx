import React from "react";
import styles from "../../../../styles/sass/IndividualSessions/main.module.scss";
import Image from "next/image";
import SectionHeader from "@/app/components/shared/SectionHeader/page";
import StyledButton from "@/app/components/shared/StyledButton";

const DrSessionCard = () => {
  return (
    <div className={styles.DrSessionCard}>
      <div className={styles.image}>
        <Image
          src={"/images/TherapySessions1/dr-ahmed.svg"}
          width={364}
          height={321}
          alt="Dr.Ahmed"
        />
      </div>
      <div className={styles.text}>
        <SectionHeader
          Label="جلسات- مع دكتور أحمد الدملاوي"
          isCentered={false}
          secondary={false}
        />
        <p className={`section-p mb-4 w-[594px] max-w-full ${styles.CardP}`}>
          هي جلسة فردية تسطتيع من خلالها الإفصاح عن معاناتك ومشاعرك بكل حرية
          وإنطلاق وبدون حرج ويساعدك دكتور أحمد على إدراك مشكلتك والمشاعر التي
          أدت لظهور ها وكيفية الإنتباه لها وإدارتها.
        </p>
        <div className={styles.buttonContainer}>
          <StyledButton label="اشترك الان" isPrimary={true} />
        </div>
      </div>
    </div>
  );
};

export default DrSessionCard;
