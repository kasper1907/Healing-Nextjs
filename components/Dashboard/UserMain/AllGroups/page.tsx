import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Grid, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/sass/Dashboard/UserMain/allGroups.module.scss";
import { userGroups } from "@/constants/Groups";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import { getOne } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import useSWR from "swr";
import { SessionDetails } from "@/models/Sessions";

const AllGroups = ({ setViewAllGroups }: any) => {
  const { data: Courses, isLoading } = useSWR("Courses", getOne);
  const AllCourses: SessionDetails[] = Courses?.data;
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-left"
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          mb: 2,
          cursor: "pointer",
        }}
        color={"primary"}
        onClick={() => setViewAllGroups((prev: any) => !prev)}
      >
        <FaArrowLeft />
        Go Back
      </Typography>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {AllCourses?.map((el: SessionDetails, idx: number) => {
          return (
            <Grid key={idx} item xs={12} md={4}>
              <div className={styles.groupCard}>
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL2 + el?.logo}
                  width={200}
                  height={200}
                  alt="group_img"
                />

                <div className={styles.groupButtons}>
                  <Button variant="contained">
                    <Link
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      className="flex items-center justify-center gap-1"
                      href={`*`}
                    >
                      <CiShare1 />
                      Share
                    </Link>
                  </Button>
                  <Button variant="outlined">
                    <IoCartOutline />
                    Buy Now
                  </Button>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default AllGroups;
