import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Button, Container, Grid } from "@mui/material";
import { groups } from "@/app/constants/Groups";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
const Home = () => {
  return (
    <div className={styles.PageWrapper}>
      <Container sx={{ mt: 10 }}>
        <Grid container rowSpacing={7}>
          {groups?.map((group, idx) => (
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`/dashboard/GroupUsers/${group.id}`}
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
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
