import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/AppointmentCard.module.scss";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import StyledButton from "@/components/shared/StyledButton";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AppointmentCard = ({ appointment }: any) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded((prev: any) => !prev);
  };
  console.log(appointment);
  return (
    <div className="flex flex-col">
      <div className={styles.appointmentCard}>
        <div className={styles.left}>
          <span>{appointment?.session_time}</span>
          <span>To</span>
          <span>
            {parseInt(appointment?.session_time?.split(":")[0]) + 2}
            {":00"} {appointment?.session_time?.includes("AM") ? "AM" : "PM "}
          </span>
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
      <Accordion
        sx={{
          "& .MuiPaper-root MuiPaper-elevation": {
            boxShadow: "none !important",
            backgroundColor: "transparent",
            border: "none",
          },
        }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AppointmentCard;
