import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import Reply from "../Reply/page";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import { toast } from "sonner";
import { TextField, styled } from "@mui/material";
import { isArabic } from "@/utils/checkLanguage";
import { endPoints } from "@/services/endpoints";
import { postRequest } from "@/services/postRequest";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";

const StyledTextField = styled(TextField)`
  input {
    font-size: 13px; // Set your desired font size
    padding-right: 40px;
  }
`;

const Comments = ({
  comment,
  setCommentsHeight,
  commentsRef,
  setCurrentVideoComments,
}: any) => {
  // ** States
  const [commentReplies, setCommentReplies] = useState<any>([]);
  const [isRepliesVisible, setRepliesVisible] = useState(false);
  const [repliesHeight, setRepliesHeight] = useState(0);
  const [makeAReply, setMakeAReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const repliesRef: any = useRef(null);

  const { data: Comments, isLoading } = useSWR(endPoints.getComments, fetcher);
  const { data: Replies } = useSWR(endPoints.getReplies, fetcher);

  // ** Side Effects
  useEffect(() => {
    setRepliesHeight(
      isRepliesVisible ? repliesRef.current.scrollHeight + 200 : 0
    );
    if (isRepliesVisible) {
      setCommentsHeight(
        commentsRef.current.scrollHeight + repliesRef.current.scrollHeight
      );
    }
  }, [
    isRepliesVisible,
    repliesRef,
    commentsRef,
    setCommentsHeight,
    commentReplies,
  ]);

  useEffect(() => {
    const commentReplies =
      Replies &&
      Replies?.length > 0 &&
      Replies?.filter((reply: any) => reply.commentId == comment?.id);
    setCommentReplies(commentReplies);
  }, [Replies, comment?.id]);

  // ** Functions
  const toggleMakeAReply = () => {
    setMakeAReply((prev) => !prev);
    setReplyText("@UserName__");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      text: replyText,
      commentId: comment?.id,
      createdAt: new Date(),
    };

    const res = await postRequest(
      endPoints.getReplies,
      postData,
      handleSuccess
    );
  };

  const handleSuccess = (data: any) => {
    toast.success("Reply Added Successfully");
    setCommentReplies((prev: any) => [...prev, data]);
    setCommentsHeight(
      commentsRef.current.scrollHeight + repliesRef.current.scrollHeight
    );
    setReplyText("");
    setMakeAReply(false);
  };

  return (
    <>
      <div className={styles.write_comment}>
        <div className={styles.userImgWrapper}></div>
        <div className={styles.commentInput}>
          <div
            className={`${styles.comment} ${
              isArabic(comment?.text)
                ? styles.arabicComment
                : styles.englishComment
            }`}
          >
            {comment?.text}
          </div>
          <div className={styles.commentBottom}>
            <span className={styles.replyLabel} onClick={toggleMakeAReply}>
              {makeAReply ? "Cancel" : "Reply"}
            </span>{" "}
            <Image
              src="/images/Dashboard/Oval.svg"
              alt="oval"
              width={4}
              height={4}
            />
            <span>{calculateTimeDifference(comment?.createdAt)}</span>
          </div>
          <div className={styles.commentInput}>
            <form onSubmit={handleSubmit}>
              {makeAReply ? (
                <>
                  <StyledTextField
                    size="small"
                    autoFocus
                    value={replyText}
                    onChange={(e) => {
                      setReplyText(e.target.value);
                    }}
                    sx={{
                      "&. MuiOutlinedInput-root": {
                        fontSize: "13px !important",
                      },
                      "&. MuiInputBase-input": {
                        fontSize: "13px !important",
                      },
                      width: "100%",
                      mt: 1,
                      mb: 1,
                      borderRadius: "5px",
                      fontSize: "12px !important",
                    }}
                  />

                  {replyText?.length > 0 ? (
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
                </>
              ) : null}
            </form>
          </div>
        </div>
      </div>
      {commentReplies?.length > 0 ? (
        <div
          className={`${styles.showAllReplies} ${
            isRepliesVisible ? styles.visible : ""
          }`}
          onClick={() => {
            setRepliesVisible((prev) => !prev);
          }}
        >
          <IoIosArrowDown />
          {`${isRepliesVisible ? "Hide" : "Show"} All ${
            commentReplies?.length
          } Replies`}
        </div>
      ) : null}

      <div
        className={`${styles.repliesMainWrapper} ${
          isRepliesVisible ? styles.visible : ""
        }`}
        ref={repliesRef}
        style={{ maxHeight: repliesHeight + "px" }}
      >
        {commentReplies?.length > 0
          ? commentReplies?.map((reply: any, idx: number) => (
              <Reply
                setCommentsHeight={setCommentsHeight}
                commentsRef={commentsRef}
                setCommentReplies={setCommentReplies}
                key={idx}
                reply={reply}
                idx={idx}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Comments;
