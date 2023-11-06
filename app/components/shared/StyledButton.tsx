import { Button } from "@mui/material";
import React from "react";
import styles from "../../styles/sass/Landing/landing.module.scss";

type ButtonProps = {
  label: string;
  isPrimary: boolean;
  fullWidth?: boolean;
};
const StyledButton = ({ label, isPrimary, fullWidth }: ButtonProps) => {
  return (
    <Button
      className={`${styles.NavBarLink} ${isPrimary ? styles.first : ""} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
