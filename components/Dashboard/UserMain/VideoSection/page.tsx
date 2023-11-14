import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/videoSection.module.scss";
import Image from "next/image";
import { Skeleton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Comments from "./Comments/page";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/swr";
import { toast } from "sonner";
import commentsStyles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";

const VideoSection = ({
  HeaderClickHandler,
  video,
  isFullVideo,
}: {
  HeaderClickHandler?: (video: any) => void;
  video?: any;
  isFullVideo?: boolean;
}) => {
  // Data Fetching:
  const { data: AllComments, isLoading: AllCommentsLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}comments`,
    fetcher
  );

  //States
  const [videoLoadingOnStartUp, setVideoLoadingOnStartUp] =
    useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [commentsHeight, setCommentsHeight] = useState(0);
  const [currentVideoComments, setCurrentVideoComments] = useState<any>([]);
  const [text, setText] = useState("");
  const commentsRef: any = useRef(null);
  const commentRef: any = useRef(null);

  // UseEffects
  useEffect(() => {
    setTimeout(() => {
      setVideoLoadingOnStartUp(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setCommentsHeight(isCommentsVisible ? commentsRef.current.scrollHeight : 0);
  }, [isCommentsVisible, currentVideoComments]);

  useEffect(() => {
    if (AllComments && AllComments?.length > 0) {
      let videoComments = AllComments?.filter(
        (comment: any) => comment.videoId == video?.videoId
      );
      setCurrentVideoComments(videoComments);
    }
  }, [Comments, video?.videoId]);

  // Functions
  const toggleComments = () => {
    setCommentsVisible((prevVisible) => !prevVisible);
  };

  const postRequest: any = async (url: any, data: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(data),
    });

    if (response.status == 201) {
      toast.success("Comment Added Successfully");
      setText("");
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}comments`);
      setCurrentVideoComments((prev: any) => [...prev, data]);
      if (!isCommentsVisible) {
        setCommentsVisible(true);
      }
    }

    const responseData = await response.json();
    return responseData;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text) return toast.error("Please enter a comment");
    // Example data to be sent in the POST request

    const postData = {
      text: text,
      videoId: video?.videoId,
      userId: 3,
    };

    // Trigger a re-fetch after the POST request is completed
    const res = await mutate(
      `${process.env.NEXT_PUBLIC_BASE_URL}comments`,
      postRequest(`${process.env.NEXT_PUBLIC_BASE_URL}comments`, postData),
      true
    );
  };

  return (
    <div className={styles.SectionWrapper}>
      <div className={styles.sessionInfo}>
        <div className={styles.sessionInfo__imgWrapper}>
          <Image
            src="/images/Dashboard/session-logo.svg"
            width={50}
            height={50}
            alt="sessionInfo"
          />
        </div>

        <div className={styles.sessionInfo__text}>
          <Typography
            color={"primary"}
            className={styles.sessionInfo_videoHeader}
            onClick={() => {
              if (HeaderClickHandler) {
                HeaderClickHandler(video);
              }
            }}
          >
            Session 3
          </Typography>
          <Typography variant="body2" color={"#92929D"}>
            12 April at 09.28 PM
          </Typography>
        </div>
      </div>
      <div
        className={`${styles.videoContainer} ${
          isFullVideo ? styles.videoContainerFull : ""
        }`}
      >
        {videoLoadingOnStartUp ? (
          <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
        ) : (
          <iframe
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "16px",
            }}
            className={styles.videoIframe}
            allowFullScreen
            src={
              video?.url ||
              "https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            }
          ></iframe>
        )}
      </div>
      <div className={styles.comments_header}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src={"/images/Dashboard/ic_comment.svg"}
            width={20}
            height={20}
            alt="commentsIcon"
          />
          <span
            className="text-[#44444F] text-[15px] hover:text-[#10458C]"
            onClick={toggleComments}
          >
            {isCommentsVisible ? <>Hide </> : <>Show </>}
            {currentVideoComments?.length} Comments
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src={"/images/Dashboard/ic_Saved.svg"}
            width={20}
            height={20}
            alt="commentsIcon"
          />
          <span className="text-[#44444F] text-[15px] hover:text-[#10458C]">
            Save
          </span>
        </div>{" "}
      </div>
      <div className={styles.write_comment}>
        <div className={styles.userImgWrapper}></div>
        <div className={styles.commentInput}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Ask about this session"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              fullWidth
              sx={{
                borderRadius: "10px",
              }}
            />
            {text?.length > 0 ? (
              <button type="submit">
                <Image
                  className={styles.sendIcon}
                  alt="send"
                  src={"/images/Dashboard/send.svg"}
                  width={24}
                  height={24}
                />
              </button>
            ) : null}
          </form>
        </div>
      </div>
      <div
        className={`${styles.commentsMainWrapper} ${
          isCommentsVisible ? styles.visible : ""
        }`}
        ref={commentsRef}
        style={{ maxHeight: commentsHeight + "px" }}
      >
        <>
          {currentVideoComments?.map((comment: any, idx: number) => (
            <div key={idx} className={commentsStyles.comment}>
              <div className={commentsStyles.write_comment}>
                <div className={commentsStyles.userImgWrapper}></div>
                <div className={commentsStyles.commentInput}>
                  <div className={commentsStyles.comment}>{comment?.text}</div>
                  <div className={commentsStyles.commentBottom}>
                    <span>Reply</span>
                    <Image
                      src="/images/Dashboard/Oval.svg"
                      alt="oval"
                      width={4}
                      height={4}
                    />
                    <span>23m</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default VideoSection;
