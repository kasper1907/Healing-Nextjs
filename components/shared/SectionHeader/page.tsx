"use client";
import React from "react";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  Label?: string;
  secondary: boolean;
  isCentered: boolean;
};
const SectionHeader = ({ Label, secondary, isCentered }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <h2
      className={`w-full text-center section-header-${
        secondary ? "secondary" : "primary"
      }`}
      style={{
        textAlign: isCentered ? "center" : "right",
      }}
    >
      {Label}
    </h2>
  );
};

export default SectionHeader;
