import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Button, Container, Grid, Skeleton, Typography } from "@mui/material";
// import { groups } from "@/constants/Groups";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import CardsSkeleton from "../../Loading/CardsSkeleton";
import { Error } from "@/components/shared/Error/page";
import { getOne } from "@/services/service";
import { UserContext } from "@/contexts/mainContext";
import Image from "next/image";

type Group = {
  id: number;
  name: string;
  group_name: string;
  course_id: string;
  users: any[];
  image: string;
  logo: string;
};
const Home = () => {
  const { LoggedInUser }: any = React.useContext(UserContext);
  const UserRole = LoggedInUser?.role;
  console.log(UserRole);
  const { data, error, isLoading } = useSWR(
    UserRole == "Doctor"
      ? `Groups`
      : `Groups/getThirapistGroups/${LoggedInUser?.course_id}`,
    getOne
  );

  const Groups: any = data?.data;
  if (error) {
    return <Error />;
  }
  return (
    <div className={styles.PageWrapper}>
      <Container sx={{ mt: 10 }}>
        <Typography sx={{ mb: 7, ml: 2 }} color={"primary"}>
          Dashboard / All Groups
        </Typography>
        <Grid container rowSpacing={7}>
          {isLoading ? (
            <CardsSkeleton />
          ) : (
            Groups?.length > 0 &&
            Groups.map((group: Group, idx: any) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <div className={styles.groupCard}>
                  <div className={styles.img_place}>
                    <Image
                      src={`https://mtnhealingcenter.com/healing-center/${group?.logo}`}
                      fill
                      alt="group image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <h3>{group.group_name}</h3>
                  <div className={styles.groupButtons}>
                    <Button variant="contained">
                      <Link
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="flex items-center justify-center gap-1"
                        href={`/dashboard/Groups/${group?.id}`}
                      >
                        <AiOutlineEye />
                        View
                      </Link>
                    </Button>
                    <Button variant="outlined">
                      <AiOutlineEdit />
                      Note
                    </Button>
                  </div>
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
