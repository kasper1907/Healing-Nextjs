import React from "react";

const SectionHeader = ({
  title,
  secondary,
  isCentered,
}: {
  title: string;
  secondary?: boolean;
  isCentered?: boolean;
}) => {
  return (
    <h2
      className={`w-full text-center section-header-${
        secondary ? "secondary" : "primary"
      }`}
      style={{
        textAlign: isCentered ? "center" : "right",
      }}
    >
      {title}
    </h2>
  );
};

export default SectionHeader;
