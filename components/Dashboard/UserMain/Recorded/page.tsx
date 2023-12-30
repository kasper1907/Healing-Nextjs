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
import { UserContext } from "@/contexts/mainContext";
import { Spinner } from "@nextui-org/react";

const Recorded = () => {
  const [showFullVideo, setShowFullVideo] = React.useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = React.useState<any>(null);
  const [_isPending, startTransition] = useTransition();
  const { LoggedInUser }: any = React.useContext(UserContext);

  const params = useParams();
  const { id, userId } = params;
  const { data: recordedVideos, isLoading: RecordedVideosLoading } = useSWR(
    endPoints.getSessionsByGroupId(
      id || LoggedInUser?.group_id,
      LoggedInUser?.user_id
    ),
    getOne,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    AOS.init();
  }, []);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const userVideos: any = [];

  const VideoHeaderClickHandler = (video: any) => {
    startTransition(() => {
      setCurrentVideo(video);
    });
    setShowFullVideo((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="w-full h-full gap-2 flex items-center justify-center">
        {" "}
        <Spinner />
        Loading...
      </div>
    );
  }
  return (
    <div>
      {!showFullVideo ? (
        <Grid container spacing={1}>
          {RecordedVideosLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Grid key={idx} item xs={12} md={4}>
                <Skeleton
                  sx={{ width: "100%", mb: 2, borderRadius: "5px" }}
                  variant="rectangular"
                  height={300}
                />
              </Grid>
            ))
          ) : recordedVideos?.data?.length ? (
            recordedVideos?.data?.map((el: any, idx: number) => {
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
