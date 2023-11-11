"use client";
import { Button } from "@mui/material";
import React from "react";
import styles from "@/styles/sass/Landing/landing.module.scss";

type ButtonProps = {
  label: string;
  isPrimary: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};
const StyledButton = ({
  label,
  isPrimary,
  fullWidth,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      onClick={() => onClick && onClick()}
      className={`${styles.NavBarLink} ${isPrimary ? styles.first : ""} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
