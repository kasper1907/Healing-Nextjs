import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/AppointmentCard.module.scss";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import StyledButton from "@/components/shared/StyledButton";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSWR from "swr";
import { getOne } from "@/services/service";
import moment from "moment";

const AppointmentCard = ({ appointment }: any) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded((prev: any) => !prev);
  };

  const { data: AppointmentUsers, isLoading: AppointmentUsersLoading } = useSWR(
    `Appointments/getAppointmentUsers/${appointment?.id}`,
    getOne,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return (
    <div className="flex flex-col w-full">
      <div className={styles.appointmentCard}>
        <div className={styles.left}>
          <span>{moment(appointment?.session_time).format("MM-DD")}</span>
          <span>To</span>
          <span>{moment(appointment?.session_time).format("hh:mm A")}</span>
        </div>
        <div className={styles.right}>
          <Grid rowSpacing={2} container className={styles.rightGrid}>
            <Grid item xs={12} sm={6} className={styles.right_LeftGrid}>
              <h3>Appointment #{appointment ? appointment?.id : ""}</h3>
              <span>
                Date: <span>{appointment.session_date}</span>
              </span>
              <span>
                Therapist: <span>{appointment?.Therapist}</span>
              </span>
              <span>
                Assistant: <span>{appointment?.Assistant}</span>
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
              <Button sx={{ width: "200px !important" }} onClick={handleChange}>
                {expanded ? "Hide Members" : "Show Members"}
              </Button>
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
        className="appointment_accordion"
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            boxShadow: "none !important",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            display: "none !important",
          },
          boxShadow: "none !important",
          backgroundColor: "#FFF !important",
          padding: "0px !important",
        }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          sx={{
            "& .MuiButtonBase-root": {
              minHeight: "0px !important",
              height: "0px !important",
            },
          }}
        ></AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <Chip
                sx={{ mr: 2 }}
                key={index}
                avatar={
                  <Avatar
                    alt="Test User"
                    src="/images/Dashboard/avatars/avatar.jpg"
                  />
                }
                label="Test User"
                variant="outlined"
              />
            ))} */}
            {AppointmentUsers?.data?.map((el: any, idx: any) => {
              return (
                <Chip
                  sx={{ mr: 2 }}
                  key={idx}
                  avatar={
                    <Avatar
                      alt="Test User"
                      src={
                        el?.image
                          ? process.env.NEXT_PUBLIC_BASE_URL + "/" + el?.image
                          : "/images/Dashboard/avatars/avatar.jpg"
                      }
                    />
                  }
                  label={el?.full_name}
                  variant="outlined"
                />
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AppointmentCard;
