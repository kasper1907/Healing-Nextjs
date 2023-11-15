import { Button, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "@/styles/sass/Dashboard/UserMain/usermain.module.scss";
import Link from "next/link";
import VideoSection from "../UserMain/VideoSection/page";

const UserMainSkelton = () => {
  const arrayFrom6 = Array.from({ length: 6 });
  return (
    <Grid container>
      <Grid item className={styles.userMainGridItem} xs={12} lg={3}>
        <div className={`${styles.gridMainChild} ${styles.userInfo}`}>
          <Skeleton variant="circular" sx={{ mb: 2 }} width={40} height={40} />
          {arrayFrom6?.map((_, idx) => (
            <div key={idx}>
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={210}
                height={10}
              />
            </div>
          ))}
          <Skeleton
            sx={{ borderRadius: "10px", width: "90%" }}
            variant="rounded"
            height={80}
          />{" "}
        </div>
        <div className={`${styles.gridMainChild} ${styles.therapyGroups}`}>
          <Skeleton variant="circular" sx={{ mb: 2 }} width={40} height={40} />
          {Array.from({ length: 4 })?.map((_, idx) => (
            <>
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={210}
                height={10}
              />
            </>
          ))}
        </div>
        <div className={`${styles.gridMainChild} ${styles.lucherDates}`}>
          <Skeleton variant="circular" sx={{ mb: 2 }} width={40} height={40} />
          {Array.from({ length: 8 })?.map((_, idx) => (
            <>
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={210}
                height={10}
              />
            </>
          ))}
        </div>
      </Grid>
      <Grid item className={styles.userMainGridItem} xs={12} lg={9}>
        <div className={styles.gridMainChild}>
          <div className={styles.lastSession}>
            <div className={"flex items-center gap-2"}>
              <Skeleton
                variant="circular"
                sx={{ mb: 2 }}
                width={40}
                height={40}
              />
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={210}
                height={10}
              />
            </div>

            <div className="flex items-center flex-row pl-4">
              <div>
                <Skeleton
                  variant="circular"
                  sx={{ mb: 2 }}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <Skeleton
                  sx={{ mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  width={210}
                  height={10}
                />
                <Skeleton
                  sx={{ mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  width={100}
                  height={10}
                />
              </div>
            </div>

            <Skeleton
              sx={{ width: "100%", mb: 2, borderRadius: "10px" }}
              variant="rectangular"
              height={350}
            />

            <div className="flex flex-row items-center justify-between">
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={100}
                height={10}
              />
              <Skeleton
                sx={{ mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                width={100}
                height={10}
              />
            </div>

            <Skeleton
              sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
              variant="rectangular"
              height={10}
            />

            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Skeleton
                  sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  height={10}
                />
                <Skeleton
                  sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  height={280}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton
                  sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  height={10}
                />
                <Skeleton
                  sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  height={280}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserMainSkelton;
