import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AppointmentCard from "./AppointmentCard/page";

const Appointments = () => {
  return (
    <div className={styles.PageWrapper}>
      <Container
        sx={{
          mt: 10,
          background: "#FFF",
          borderRadius: "10px",
          padding: "20px 10px",
        }}
      >
        <Typography
          sx={{
            paddingLeft: { xs: "0px", lg: "70px" },
          }}
          className={styles.Appointments_header}
        >
          Your upcoming sessions
        </Typography>
        <Box
          sx={{
            padding: { lg: "0px 150px", xs: "0px" },
          }}
          className="flex flex-col items-center"
        >
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
        </Box>
      </Container>
    </div>
  );
};

export default Appointments;
