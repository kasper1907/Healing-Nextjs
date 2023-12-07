import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/Profile/Profile.module.scss";
import { Button, Grid, Typography } from "@mui/material";
import { ProfileData } from "@/constants/ProfileData";
import { useTabsContext } from "../TabsContext";
import { useSearchParams } from "next/navigation";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { endPoints } from "@/services/endpoints";
import { UserDetails } from "@/models/User";
import { FaArrowLeft } from "react-icons/fa";
const ProfileDetails = () => {
  const { userTabsValue, setUserTabsValue }: any = useTabsContext();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { data, isLoading } = useSWR(
    endPoints.getUserProfile(userId as string),
    getOne
  );

  const user: UserDetails = data?.data;

  //console.log(user);

  useEffect(() => {
    AOS.init();
  }, []);

  const BoxSizes: any = {
    //This Object Defines the Proper Width of Each Box in the Grid Depending on the Length of the Data
    3: 7,
    4: 7,
    2: 5,
    1: 3,
  };

  const SmallBoxesSizes: any = {
    3: 4,
    4: 3,
    2: 6,
    1: 12,
  };

  const ProfileDataArray = Object?.entries(user ? user : {});
  return (
    <div className={styles.profilePageWrapper} data-aos="fade-right">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            color={"primary"}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {" "}
            <FaArrowLeft onClick={() => setUserTabsValue(1)} />
            Profile Details
          </Typography>
        </Grid>
        <Grid
          className="flex items-center"
          sx={{
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
          item
          xs={12}
          md={6}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "unset",
              borderRadius: "8px",
              fontWeight: "400",
              fontSize: "12px",
            }}
            onClick={() => {
              //set the current tab value to 7 which is the edit profile tab
              setUserTabsValue(7);
            }}
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} rowSpacing={4} sx={{ mt: 4 }}>
        {ProfileDataArray?.length > 0
          ? ProfileDataArray?.map((el: any, idx: number) => {
              return (
                <Grid key={idx} item xs={12} md={BoxSizes[el[1]?.length]}>
                  <div className={styles.detailsCard}>
                    <div className={styles.header}>{el[0]}</div>
                    <Grid container>
                      {[el[1]]?.length > 0
                        ? el[1]?.map((item: any, idx: number) => {
                            return (
                              <Grid
                                key={idx}
                                className={styles.detailsWrapper}
                                item
                                xs={12}
                                md={SmallBoxesSizes[el[1]?.length]}
                              >
                                <Typography color={"primary"}>
                                  {Object?.entries(item)[0][0] as any}
                                </Typography>
                                <Typography>
                                  {Object?.entries(item)[0][1] as any}
                                </Typography>
                              </Grid>
                            );
                          })
                        : null}
                    </Grid>
                  </div>
                </Grid>
              );
            })
          : null}
        {/* <Grid item xs={12} md={7}>
          <div className={styles.detailsCard}>
            <div className={styles.header}>Contacts</div>
            <Grid container>
              <Grid className={styles.detailsWrapper} item xs={12} md={4}>
                <Typography color={"primary"}>Email</Typography>
                <Typography>user@email.com</Typography>
              </Grid>
              <Grid className={styles.detailsWrapper} item xs={12} md={4}>
                2
              </Grid>
              <Grid className={styles.detailsWrapper} item xs={12} md={4}>
                3
              </Grid>
            </Grid>
          </div>
        </Grid> */}
        {/* <Grid item xs={12} md={3}>
          <div className={styles.detailsCard}>2</div>
        </Grid>
        <Grid item xs={12} md={2}>
          <div className={styles.detailsCard}>4</div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default ProfileDetails;
