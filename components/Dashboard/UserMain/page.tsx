"use client";
import { fetcher } from "@/utils/swr";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import useSWR from "swr";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import VideoSection from "./VideoSection/page";
import UserMainSkelton from "../Loading/UserMainSkelton";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import moment from "moment";
import { useTabsContext } from "../TabsContext";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/UserMain/usermain.module.scss";
import AllGroups from "./AllGroups/page";
import { getOne } from "@/services/service";
import { UserDetails } from "@/models/User";
import { checkLength } from "@/utils/checkLength";
import { SessionDetails } from "@/models/Sessions";
import { endPoints } from "@/services/endpoints";
import jwt from "jsonwebtoken";
import { UserContext } from "@/contexts/mainContext";
import useCookie from "react-use-cookie";

const UserMain = () => {
  // console.log(props);
  const [SID, setSID] = useCookie("SID");

  const {
    userTabsValue,
    setUserTabsValue,
    viewAllGroups,
    setViewAllGroups,
  }: any = useTabsContext();
  const [loggedUserToken, setLoggedUserToken] = React.useState<any>("");
  const params = useSearchParams();

  const {
    recommendedVideos: RecommendedVideos,
    RecommendedVideosLoading: LoadingRecommendedVideos,
    LastSession,

    User,
    Group,
  }: any = React.useContext(UserContext);
  useEffect(() => {
    AOS.init();
  }, []);

  // console.log(User);

  // const group: Group = UserUserGroup.data;

  const decodedToken: any = jwt.decode(SID?.toString() || "");
  const pathname = usePathname();
  const userGroup = pathname;

  let userGroupId: any = `group_id_${User?.course_id}`;

  // const { data: UserGroup, isLoading: LoadingUserGroup } = useSWR(
  //   `Groups/getOne/${LoggedInUser.course_id ? User[userGroupId] : groupId}`,
  //   getOne,
  //   { revalidateIfStale: false, revalidateOnFocus: false }
  // );

  // if (LoadingUser) return <UserMainSkelton />;

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
            {decodedToken?.data?.user_id == User?.id ? (
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
            ) : null}
          </div>
          <div className={`${styles.row}`}>
            <div className={styles.infoSection}>
              <>
                <span>Name</span>
                <span>{checkLength(User?.full_name + "", 18)}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Mobile</span>
                <span>{User?.phone}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Relationship</span>
                <span>{User?.social_status}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Birth date</span>

                <span>{moment(User?.date_of_birth).format("DD-M-YYYY")}</span>
              </>
            </div>
            <div className={styles.infoSection}>
              <>
                <span>Place Of Birth</span>
                <span>{User?.place_of_birth}</span>
              </>
            </div>
          </div>
          <div className={styles.row}>
            <Link
              className={"styledLink"}
              href="*"
              style={{ fontWeight: "300", fontSize: "14px", color: "#10458C" }}
              onClick={(e) => {
                e.preventDefault();
                setUserTabsValue(6);
              }}
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
              <span className="mt-[1px] text-[#10458C]">Therapy Group</span>
            </div>
          </div>

          <div className="flex items-start  flex-wrap gap-2">
            {false ? (
              <CircularProgress color="primary" />
            ) : (
              <Tooltip title={Group?.group_name}>
                <Image
                  src={`${
                    Group?.logo
                      ? process.env.NEXT_PUBLIC_BASE_URL2 + Group?.logo
                      : "/images/Dashboard/therapy-group.svg"
                  }`}
                  width={50}
                  height={50}
                  alt="TherapyGroup"
                />
              </Tooltip>
            )}
          </div>

          <Link
            className={"styledLink"}
            style={{
              fontWeight: "300",
              fontSize: "14px",
              color: "#10458C",
            }}
            href={"*"}
            onClick={(e) => {
              e.preventDefault();
              setViewAllGroups(true);
            }}
          >
            View all courses
          </Link>
        </div>
        {/* <div className={`${styles.gridMainChild} ${styles.lucherDates}`}>
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
        </div> */}
      </Grid>
      {viewAllGroups ? (
        <AllGroups setViewAllGroups={setViewAllGroups} />
      ) : (
        <Grid
          data-aos="fade-left"
          item
          className={styles.userMainGridItem}
          xs={12}
          lg={9}
        >
          <div className={styles.gridMainChild}>
            <div className={styles.lastSession}>
              <Typography color={"primary"} sx={{ mb: 2 }}>
                Last Session
              </Typography>
              {LastSession ? (
                <VideoSection video={LastSession} isFullVideo={false} />
              ) : (
                "No Session Found"
              )}
            </div>
            {/* <div className={styles.preparationVideos}>
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
            </div> */}

            {LoadingRecommendedVideos ? (
              <CircularProgress color="primary" />
            ) : (
              <div className={styles.recommendedVideos}>
                <div className="flex items-center justify-between ">
                  <Typography color={"primary"} sx={{ mb: 3 }}>
                    Recommended Videos
                  </Typography>
                  {RecommendedVideos?.data?.length > 0 ? (
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
                  ) : null}
                </div>
                <Grid container spacing={2}>
                  {RecommendedVideos?.length ? (
                    RecommendedVideos?.map((item: any, index: any) => (
                      <Grid key={index} item xs={12} lg={4}>
                        <Box
                          sx={{
                            height: "370px",
                            background: "#FFF",
                            borderRadius: "10px",
                            padding: "15px",
                            width: "100%",
                          }}
                        >
                          <Typography color={"#838383"} sx={{ ml: 2, mb: 2 }}>
                            {item?.video_name?.length > 20 ? (
                              <Tooltip title={item?.video_name}>
                                <span>
                                  {item?.video_name?.slice(0, 20) + "..."}
                                </span>
                              </Tooltip>
                            ) : (
                              item?.video_name
                            )}
                          </Typography>
                          <iframe
                            style={{
                              width: "100%",
                              height: "90%",
                              borderRadius: "16px",
                            }}
                            className={styles.videoIframe}
                            allowFullScreen
                            src={item.link}
                          />
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      sx={{ width: "100%", textAlign: "left", ml: 2, mt: 2 }}
                    >
                      No Recommended Videos Found For This Group !
                    </Typography>
                  )}

                  {/* Recorded Video Example If You want to render it */}
                  {/* <Grid item xs={12} lg={6} sx={{ height: "370px" }}>
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
                  </Grid> */}
                </Grid>
              </div>
            )}
          </div>
        </Grid>
      )}
    </Grid>

    // <div>Test</div>
  );
};

export default UserMain;
