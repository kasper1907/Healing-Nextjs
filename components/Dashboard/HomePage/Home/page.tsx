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
import Error from "@/components/shared/Error/page";

type Group = {
  id: number;
  name: string;
  users: any[];
  image: string;
};
const Home = () => {
  const {
    data: groups,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}Groups`, fetcher);
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
            groups?.map((group: Group, idx: any) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <div className={styles.groupCard}>
                  <div className={styles.img_place}></div>
                  <h3>{group.name}</h3>
                  <div className={styles.groupButtons}>
                    <Button variant="contained">
                      <Link
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="flex items-center justify-center gap-1"
                        href={`/dashboard/GroupUsers?id=${group.id}`}
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
