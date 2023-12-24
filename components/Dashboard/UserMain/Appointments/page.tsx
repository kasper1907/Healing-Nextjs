import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AppointmentCard from "../../HomePage/Appointments/AppointmentCard/page";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getOne } from "@/services/service";
import { UserContext } from "@/contexts/mainContext";
import { Spinner } from "@nextui-org/react";

export const Appointments = () => {
  const { LoggedInUser }: any = React.useContext(UserContext);

  const params = useParams();
  const { id, userId } = params;

  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { data: AppointmentsData, isLoading: AppointmentsLoading } = useSWR(
    `Appointments/getByGroupId/${id || LoggedInUser?.group_id}`,
    getOne,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full gap-2 flex items-center justify-center">
        {" "}
        <Spinner />
        Loading...
      </div>
    );
  }

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
          {AppointmentsData?.data?.length > 0 ? (
            AppointmentsData?.data?.map((appointment: any, idx: any) => (
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
          {/* <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard />
          <AppointmentCard /> */}
        </Box>
      </Container>
    </div>
  );
};
