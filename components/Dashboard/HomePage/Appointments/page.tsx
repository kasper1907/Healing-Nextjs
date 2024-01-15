import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AppointmentCard from "./AppointmentCard/page";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import { getOne } from "@/services/service";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";
import useCookie from "react-use-cookie";
import { UserContext } from "@/contexts/mainContext";

const Appointments = () => {
  const pathname = usePathname();

  const [userToken, setUserToken] = useCookie("SID");
  const { LoggedInUser }: any = React.useContext(UserContext);

  const decodedToken = jwt.decode(userToken?.toString()) as any;

  const UserRole = LoggedInUser?.role;

  let endpointName =
    LoggedInUser?.role == "Assistant"
      ? `GetAssistantAppointments/${LoggedInUser?.user_id}`
      : LoggedInUser?.role == "Therapist"
      ? `GetTherapistAppointments/${LoggedInUser?.user_id}`
      : "NULL";

  const { data: AppointmentsData, isLoading: AppointmentsLoading } = useSWR(
    `appointments/${endpointName}`,
    getOne
  );

  const Appointments = AppointmentsData?.data;

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
          Your upcoming Appointments
        </Typography>
        <Box
          sx={{
            padding: { lg: "0px 150px", xs: "0px" },
          }}
          className="flex flex-col items-center"
        >
          {Appointments?.length > 0 ? (
            Appointments?.map((appointment: any, idx: any) => (
              <AppointmentCard key={idx} appointment={appointment} />
            ))
          ) : (
            <Typography
              sx={{
                mt: 5,
                color: "#10458C",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              You have no upcoming sessions
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Appointments;
