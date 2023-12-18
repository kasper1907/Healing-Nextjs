import React from "react";

type ComponentProps = {
  Label?: string;
  secondary: boolean;
  isCentered: boolean;
};
const SectionHeader = ({ Label, secondary, isCentered }: any) => {
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
