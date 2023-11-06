import React from "react";
import styles from "../../../../../styles/sass/SessionsCard/SessionCard.module.scss";
import Image from "next/image";
import SectionHeader from "@/app/components/shared/SectionHeader/page";
import StyledButton from "@/app/components/shared/StyledButton";

type ComponentProps = {
  bannerSrc: string;
  logoSrc: string;
  header: string;
  text: string;
};
const SessionCard = ({ bannerSrc, logoSrc, header, text }: ComponentProps) => {
  return (
    <div className={styles.SessionCard}>
      <div className={styles.imageContainer} style={{ marginBottom: "20px" }}>
        <Image src={bannerSrc} alt="CardHeader" width={459} height={321} />
        <Image
          src={logoSrc}
          width={130}
          height={130}
          alt="CardHeader"
          className={styles.sessionLogo}
        />
      </div>
      <SectionHeader title={header} isCentered={true} />
      <p className=" text-center text-[#A5A5A5] mt-[-10px] mb-4">{text}</p>
      <div className="max-w-full w-[200px]">
        <StyledButton isPrimary={true} label="اشترك الان" />
      </div>
    </div>
  );
};

export default SessionCard;
