import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/videoSection.module.scss";
import Image from "next/image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Comments from "./Comments/page";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/swr";
import { toast } from "sonner";
import commentsStyles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { getOne, postRequest } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import { isArabic } from "@/utils/checkLanguage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwt from "jsonwebtoken";
import useCookie from "react-use-cookie";

export const StyledTextField = styled(TextField)`
  input {
    font-size: 17px; // Set your desired font size
    padding-right: 40px;
    font-family: Tajawal !important;
  }
`;

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
  const [userToken, setUserToken] = useCookie("accessToken", "0");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoLoadingOnStartUp, setVideoLoadingOnStartUp] =
    useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [currentVideoComments, setCurrentVideoComments] = useState<any>([]);
  const [commentInputFocus, setCommentInputFocus] = useState(false);
  const [text, setText] = useState("");
  const commentInputRef: any = useRef(null);
  const commentsRef: any = useRef(null);
  const lastCommentRef: any = useRef(null);
  const decodedToken = jwt.decode(userToken?.toString()) as any;
  const userData = decodedToken?.data;
  const { data: VideoComments, isLoading } = useSWR(
    endPoints.getCommentByVideoId(video?.id),
    getOne
  );

  const { data: User, isLoading: UserLoading } = useSWR(
    endPoints.getUser(userData?.user_id),
    getOne
  );

  //console.log(User, "User");

  useEffect(() => {
    VideoComments?.data?.length > 0 &&
      setCurrentVideoComments(VideoComments?.data);
  }, [VideoComments]);

  const Replies: any = [];

  // const commentReplies =
  // UseEffects
  useEffect(() => {
    setTimeout(() => {
      setVideoLoadingOnStartUp(false);
    }, 2000);
  }, []);

  // Functions
  const toggleComments = () => {
    setCommentsVisible((prevVisible) => !prevVisible);
  };

  const handleSuccess = (data: any) => {
    toast.success("Comment Added Successfully");
    setText("");
    let newData = {
      ...data,
      full_name: userData?.user_name,
      image: User?.data?.image,
    };
    setCurrentVideoComments((prev: any) => [...prev, newData]);
    if (!isCommentsVisible) {
      setCommentsVisible(true);
    }

    if (lastCommentRef.current) {
      setTimeout(() => {
        lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text) return toast.error("Please enter a comment");
    // Example data to be sent in the POST request

    const postData = {
      comment_text: text,
      video_id: video?.id,
      user_id: userData?.user_id,
    };

    // Trigger a re-fetch after the POST request is completed
    postRequest(`comments/createComment`, postData, handleSuccess(postData));
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
            {video?.video_name}
          </Typography>
          <Typography variant="body2" color={"#92929D"}>
            {video?.video_date}
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
            src={video?.link}
          ></iframe>
        )}
      </div>

      <Accordion
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            boxShadow: "none !important",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            display: "none !important",
          },
          boxShadow: "none !important",
          backgroundColor: "#FFF !important",
          padding: "0px !important",
        }}
        expanded={isCommentsVisible}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            background: "#FFF !important",
            padding: 0,
          }}
        >
          <div className="flex flex-col w-full h-ft">
            <div style={{ width: "100%" }} className={styles.comments_header}>
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
                      {currentVideoComments?.length + Replies?.length} Comments
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
              <div className={styles.userImgWrapper}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${User?.data?.image}`}
                  width={156}
                  height={156}
                  alt="userImage"
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />{" "}
              </div>
              <div className={styles.commentInput}>
                <form onSubmit={handleSubmit}>
                  <StyledTextField
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
            </div>{" "}
          </div>
        </AccordionSummary>

        <AccordionDetails>
          {currentVideoComments?.length > 0 &&
            currentVideoComments?.map((comment: any, idx: number) => (
              <div
                ref={
                  idx + 1 == currentVideoComments?.length
                    ? lastCommentRef
                    : null
                }
                key={idx}
                className={`${commentsStyles.comment} `}
              >
                <Comments
                  videoId={video?.id}
                  comment={comment}
                  setCurrentVideoComments={setCurrentVideoComments}
                  currentVideoComments={currentVideoComments}
                />
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default VideoSection;
