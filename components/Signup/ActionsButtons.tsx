import { Button, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "@/styles/sass/Dashboard/Forms/main.module.scss";

const ActionsButtons = ({
  handleSubmit,
  currentIndex,
  steps,
  handleBack,
}: any) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage;
  return (
    <Grid
      container
      flexDirection={lang == "en" ? "row" : "row-reverse"}
      sx={{ mt: 4 }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: lang == "en" ? "flex-end" : "flex-start",
          padding: "5px",
        }}
        item
        xs={6}
        md={6}
      >
        <Button
          color="error"
          disabled={currentIndex === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          className={styles.backBtn}
          variant="outlined"
        >
          {t("Back")}
        </Button>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: lang == "en" ? "flex-start" : "flex-end",
          padding: "5px",
        }}
        item
        xs={6}
        md={6}
      >
        <Button onClick={handleSubmit} className={styles.nextBtn}>
          {currentIndex === steps.length - 1 ? t("Finish") : t("Next")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionsButtons;
