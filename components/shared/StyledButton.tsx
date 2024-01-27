"use client";
import { Button } from "@mui/material";
import React from "react";
import styles from "@/styles/sass/Landing/landing.module.scss";
import Link from "next/link";

type ButtonProps = {
  label: string | React.ReactNode;
  isPrimary: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  isLink: boolean;
  url?: string;
  query?: any;
  type?: "button" | "submit";
};
const StyledButton = ({
  label,
  isPrimary,
  fullWidth,
  onClick,
  isLink,
  url,
  query,
  type,
}: ButtonProps) => {
  return (
    <Button
      type={type || "button"}
      onClick={() => onClick && onClick()}
      className={`${styles.NavBarLink} ${isPrimary ? styles.first : ""} ${
        fullWidth ? styles.fullWidth : ""
      }`}
      style={{
        padding: "0",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLink && url ? (
        <Link
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
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
