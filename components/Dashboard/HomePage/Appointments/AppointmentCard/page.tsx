import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/AppointmentCard.module.scss";
import { Grid, Button } from "@mui/material";
import StyledButton from "@/components/shared/StyledButton";
import Link from "next/link";
const AppointmentCard = ({ appointment }: any) => {
  console.log(appointment);
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.left}>
        <span>15:00 PM</span>
        <span>To</span>
        <span>17:00 PM</span>
      </div>
      <div className={styles.right}>
        <Grid rowSpacing={2} container className={styles.rightGrid}>
          <Grid item xs={12} sm={6} className={styles.right_LeftGrid}>
            <h3>Appointment #{appointment ? appointment?.id : ""}</h3>
            <span>
              Date: <span>{appointment.session_date}</span>
            </span>
            <span>
              Assistant: <span>{appointment.assistant_id}</span>
            </span>
          </Grid>
          <Grid
            sx={{
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            }}
            item
            xs={12}
            sm={6}
            className={styles.right_RightGrid}
          >
            <Button>Members</Button>
            <Button>
              <Link target="_blank" href={appointment.meeting_link}>
                Join
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AppointmentCard;
