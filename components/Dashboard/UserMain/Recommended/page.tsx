import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import styles from "@/styles/sass/Dashboard/UserMain/usermain.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";

const Recommended = ({
  dashboardTabsValue,
}: {
  dashboardTabsValue: number;
}) => {
  const randomArray = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 6)
  );

  const params = useParams();
  const searchParams = useSearchParams();
  const { id: userId } = params;
  const groupId = searchParams.get("groupId");
  const {
    data: RecommendedVideos,
    error,
    isLoading,
  } = useSWR(endPoints.getRecommendedVideos(groupId), getOne, {
    revalidateOnMount: false,
  });

  return (
    <div>
      <Grid container spacing={2}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Grid key={idx} item xs={12} md={4}>
              <Skeleton
                sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                variant="rectangular"
                height={300}
              />
            </Grid>
          ))
        ) : RecommendedVideos?.data?.length ? (
          RecommendedVideos?.data?.map((item: any, index: any) => (
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
                  {item?.video_name}
                </Typography>
                <iframe
                  style={{
                    width: "100%",
                    height: "90%",
                    borderRadius: "16px",
                  }}
                  className={styles.videoIframe}
                  allowFullScreen
                  src={item.url}
                ></iframe>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{ width: "100%", textAlign: "center" }}
            color={"primary"}
          >
            No Recommended Videos Found For This Group !
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Recommended;
