"use client";
import { Button } from "@mui/material";
import React from "react";
import styles from "@/styles/sass/Landing/landing.module.scss";
import Link from "next/link";

type ButtonProps = {
  label: string;
  isPrimary: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  isLink: boolean;
  url?: string;
  query?: any;
};
const StyledButton = ({
  label,
  isPrimary,
  fullWidth,
  onClick,
  isLink,
  url,
  query,
}: ButtonProps) => {
  return (
    <Button
      onClick={() => onClick && onClick()}
      className={`${styles.NavBarLink} ${isPrimary ? styles.first : ""} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {isLink && url ? (
        <Link
          href={{
            pathname: url,
            query: query,
          }}
        >
          {label}
        </Link>
      ) : (
        label
      )}
    </Button>
  );
};

export default StyledButton;
