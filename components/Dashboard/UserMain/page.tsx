import { fetcher } from "@/utils/swr";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { Grid } from "@mui/material";
import styles from "@/styles/sass/Dashboard/UserMain/usermain.module.scss";
import Image from "next/image";
import Link from "next/link";
import VideoSection from "./VideoSection/page";
import UserMainSkelton from "../Loading/UserMainSkelton";
import { useParams } from "next/navigation";
import moment from "moment";
const UserMain = () => {
  const params = useParams();
  const { id: userId } = params;
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`http://localhost:3001/Users/${userId}`, fetcher);
  if (isLoading) return <UserMainSkelton />;
  return (
    <Grid container>
      <Grid item className={styles.userMainGridItem} xs={12} lg={3}>
        <div className={`${styles.gridMainChild} ${styles.userInfo}`}>
          <div className={styles.row}>
            <div className="flex items-center gap-2 pl-[4px]">
              <Image
                src={"/images/Dashboard/user-solid.svg"}
                width={14}
                height={16}
                alt="userIcon"
              />
              <span className="mt-[1px] text-[#10458C]">About</span>
            </div>
            <Button
              variant="outlined"
              sx={{
                textTransform: "unset",
                borderRadius: "8px",
                fontWeight: "400",
                fontSize: "12px",
              }}
            >
              Edit Profile
            </Button>
          </div>
          <div className={`${styles.row}`}>
            <div className={styles.infoSection}>
              <>
                <span>Name</span>
                <span>{user?.name}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Mobile</span>
                <span>{user?.mobile}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Relationship</span>
                <span>{user?.relationShip}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Birth date</span>

                <span>{moment(user.dateOfBirth).format("DD-M-YYYY")}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Place Of Birth</span>
                <span>{user?.placeOfBirth}</span>
              </>
            </div>
          </div>
          <div className={styles.row}>
            <Link
              className={"styledLink"}
              href="*"
              style={{ fontWeight: "300", fontSize: "14px", color: "#10458C" }}
            >
              view more
            </Link>
          </div>
        </div>
        <div className={`${styles.gridMainChild} ${styles.therapyGroups}`}>
          <div className={styles.row}>
            <div className="flex items-center gap-2 pl-[4px]">
              <Image
                src={"/images/Dashboard/user-solid.svg"}
                width={14}
                height={16}
                alt="userIcon"
              />
              <span className="mt-[1px] text-[#10458C]">Therapy Groups</span>
            </div>
          </div>

          <div className="flex items-start  flex-wrap gap-2">
            <Image
              src={"/images/Dashboard/TherapyGroup (1).svg"}
              width={50}
              height={50}
              alt="TherapyGroup"
            />
            <Image
              src={"/images/Dashboard/TherapyGroup (2).svg"}
              width={50}
              height={50}
              alt="TherapyGroup"
            />
          </div>

          <Link
            className={"styledLink"}
            style={{
              fontWeight: "300",
              fontSize: "14px",
              color: "#10458C",
            }}
            href={"*"}
          >
            View all groups
          </Link>
        </div>
        <div className={`${styles.gridMainChild} ${styles.lucherDates}`}>
          <div className={styles.row}>
            <div className="flex items-center gap-2 pl-[4px]">
              <Image
                src={"/images/Dashboard/calendar-days-solid.svg"}
                width={14}
                height={16}
                alt="userIcon"
              />
              <span className="mt-[1px] text-[#10458C] text-[18px]">
                Lüscher Test Report
              </span>
            </div>
          </div>

          <div className={`${styles.lucher__btns} flex flex-col gap-2 mt-6`}>
            <Button className={styles.active} variant="outlined">
              11/4/2023
            </Button>
            <Button variant="outlined">11/5/2023</Button>
            <Button variant="outlined">11/6/2023</Button>
            <Button variant="outlined">11/7/2023</Button>
          </div>
        </div>
      </Grid>
      <Grid item className={styles.userMainGridItem} xs={12} lg={9}>
        <div className={styles.gridMainChild}>
          <div className={styles.lastSession}>
            <Typography color={"primary"} sx={{ mb: 4 }}>
              Last Session
            </Typography>

            <VideoSection />
          </div>
          <div className={styles.preparationVideos}>
            <Typography color={"primary"} sx={{ mb: 4 }}>
              Preparation Videos
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} sx={{ height: "336px" }}>
                <iframe
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                  }}
                  className={styles.videoIframe}
                  allowFullScreen
                  src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                ></iframe>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ height: "336px" }}>
                <iframe
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                  }}
                  className={styles.videoIframe}
                  allowFullScreen
                  src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                ></iframe>
              </Grid>
            </Grid>
          </div>

          <div className={styles.recommendedVideos}>
            <div className="flex items-center justify-between ">
              <Typography color={"primary"} sx={{ mb: 3 }}>
                Recommended Videos
              </Typography>
              <Link
                className={"styledLink"}
                style={{
                  fontWeight: "300",
                  fontSize: "13px",
                  color: "#10458C",
                }}
                href={"*"}
              >
                See all
              </Link>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} sx={{ height: "370px" }}>
                <Typography color={"#838383"} sx={{ ml: 2, mb: 2 }}>
                  Healing from diabetes1
                </Typography>
                <iframe
                  style={{
                    width: "100%",
                    height: "90%",
                    borderRadius: "16px",
                  }}
                  className={styles.videoIframe}
                  allowFullScreen
                  src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                ></iframe>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ height: "370px" }}>
                <Typography color={"#838383"} sx={{ ml: 2, mb: 2 }}>
                  Healing from diabetes2
                </Typography>
                <iframe
                  style={{
                    width: "100%",
                    height: "90%",
                    borderRadius: "16px",
                  }}
                  className={styles.videoIframe}
                  allowFullScreen
                  src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                ></iframe>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserMain;
