"use client";
import { Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useTransition } from "react";
import VideoSection from "../VideoSection/page";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { getOne } from "@/services/service";
import { endPoints } from "@/services/endpoints";

const Recorded = () => {
  const [showFullVideo, setShowFullVideo] = React.useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = React.useState<any>(null);
  const [_isPending, startTransition] = useTransition();
  const params = useSearchParams();
  let userId = params.get("id");
  let groupId = params.get("groupId");

  useEffect(() => {
    AOS.init();
  }, []);

  const { data, error, isLoading } = useSWR(
    endPoints.getSessionsByGroupId(groupId),
    getOne
  );
  const Videos: any = data?.data;
  //console.log(Videos, "Videos");
  const userVideos: any = [];

  const VideoHeaderClickHandler = (video: any) => {
    startTransition(() => {
      setCurrentVideo(video);
    });
    setShowFullVideo((prev) => !prev);
  };
  return (
    <div>
      {!showFullVideo ? (
        <Grid container spacing={1}>
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
          ) : Videos?.length ? (
            Videos?.map((el: any, idx: number) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={idx}>
                  <VideoSection
                    HeaderClickHandler={VideoHeaderClickHandler}
                    video={el}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              color={"primary"}
            >
              No Recorded Videos Found for This Group
            </Typography>
          )}
        </Grid>
      ) : (
        <div data-aos="fade-right" style={{ marginBottom: "50px" }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mb: 2,
              cursor: "pointer",
            }}
            color={"primary"}
            onClick={() => setShowFullVideo((prev) => !prev)}
          >
            <FaArrowLeft />
            Back To All Recorded Videos
          </Typography>
          <VideoSection video={currentVideo} isFullVideo={true} />
        </div>
      )}
    </div>
  );
};

export default Recorded;
