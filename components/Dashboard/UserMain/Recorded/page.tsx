"use client";
import { Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useTransition } from "react";
import VideoSection from "../VideoSection/page";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const Recorded = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const params = useParams();
  const { id: userId } = params;

  const {
    data: Videos,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}Videos`, fetcher);

  const [showFullVideo, setShowFullVideo] = React.useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = React.useState<any>(null);
  const [_isPending, startTransition] = useTransition();

  const userVideos = Videos?.filter((video: any) => video.user_id == userId);

  const VideoHeaderClickHandler = (video: any) => {
    console.log(video);
    startTransition(() => {
      setCurrentVideo(video);
      setShowFullVideo((prev) => !prev);
    });
  };
  return (
    <div>
      {!showFullVideo ? (
        <Grid container spacing={1}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Grid key={idx} item xs={12} md={4}>
                  <Skeleton
                    sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                    variant="rectangular"
                    height={300}
                  />
                </Grid>
              ))
            : userVideos?.map((el: any, idx: number) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={idx}>
                    <VideoSection
                      HeaderClickHandler={VideoHeaderClickHandler}
                      video={el}
                    />
                  </Grid>
                );
              })}
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
