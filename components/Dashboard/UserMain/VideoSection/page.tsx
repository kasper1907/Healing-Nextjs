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
import { IoIosArrowDown } from "react-icons/io";
import { postRequest } from "@/services/postRequest";
import { endPoints } from "@/services/endpoints";

const VideoSection = ({
  HeaderClickHandler,
  video,
  isFullVideo,
}: {
  HeaderClickHandler?: (video: any) => void;
  video?: any;
  isFullVideo?: boolean;
}) => {
  //States
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoLoadingOnStartUp, setVideoLoadingOnStartUp] =
    useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [commentsHeight, setCommentsHeight] = useState(0);
  const [currentVideoComments, setCurrentVideoComments] = useState<any>([]);
  const [commentInputFocus, setCommentInputFocus] = useState(false);
  const [text, setText] = useState("");
  const commentInputRef: any = useRef(null);
  const commentsRef: any = useRef(null);
  const lastCommentRef: any = useRef(null);

  // Data Fetching:
  const { data: AllComments, isLoading: AllCommentsLoading } = useSWR(
    endPoints.getComments,
    fetcher
  );

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
  }, [AllComments, video?.videoId]);

  // Functions
  const toggleComments = () => {
    setCommentsVisible((prevVisible) => !prevVisible);
  };

  const handleSuccess = (data: any) => {
    toast.success("Comment Added Successfully");
    setText("");
    // mutate(`${process.env.NEXT_PUBLIC_BASE_URL}comments`);
    setCurrentVideoComments((prev: any) => [...prev, data]);
    if (!isCommentsVisible) {
      setCommentsVisible(true);
    }

    if (lastCommentRef.current) {
      setTimeout(() => {
        lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
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
    mutate(
      `${process.env.NEXT_PUBLIC_BASE_URL}comments`,
      postRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}comments`,
        postData,
        handleSuccess
      ),
      false
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
            src={
              video?.url ||
              "https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            }
          ></iframe>
        )}
      </div>
      <div className={styles.comments_header}>
        <div className="flex items-center gap-2 cursor-pointer">
          {currentVideoComments?.length > 0 ? (
            <>
              <IoIosArrowDown
                style={{
                  transition: "0.2s ease",
                  transform: isCommentsVisible ? "rotate(180deg)" : "",
                }}
              />
              <span
                className="text-[#44444F] text-[15px] hover:text-[#10458C]"
                onClick={toggleComments}
              >
                {isCommentsVisible ? <>Hide </> : <>Show </>}
                {currentVideoComments?.length} Comments
              </span>
            </>
          ) : (
            <>
              <Image
                src={"/images/Dashboard/ic_comment.svg"}
                width={20}
                height={20}
                alt="commentsIcon"
              />

              <span
                className="text-[#44444F] text-[15px] hover:text-[#10458C]"
                onClick={() => {
                  if (commentInputRef.current) {
                    // Focus the TextField
                    commentInputRef.current.focus();
                  }
                }}
              >
                Write A Comment
              </span>
            </>
          )}
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
              autoFocus={commentInputFocus}
              onChange={(e) => {
                setText(e.target.value);
              }}
              fullWidth
              sx={{
                borderRadius: "10px",
              }}
              inputRef={commentInputRef}
            />
            {text?.length > 0 ? (
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "10px",
                  width: "100px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
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
            <div
              ref={
                idx + 1 == currentVideoComments?.length ? lastCommentRef : null
              }
              key={idx}
              className={`${commentsStyles.comment} `}
            >
              <Comments
                commentsRef={commentsRef}
                comment={comment}
                setCommentsHeight={setCommentsHeight}
                setCurrentVideoComments={setCurrentVideoComments}
              />
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default VideoSection;
