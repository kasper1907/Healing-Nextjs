import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/replies.module.scss";
import moment from "moment"; // Import moment from moment-timezone
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { FaRegPlayCircle } from "react-icons/fa";
import { toast } from "sonner";
import { mutate } from "swr";

const StyledTextField = styled(TextField)`
  input {
    font-size: 13px; // Set your desired font size
    padding-right: 40px;
  }
`;
const Reply = ({
  commentId,
  reply,
  idx,
  setCommentsHeight,
  commentsRef,
  setCommentReplies,
}: any) => {
  const [makeAReply, setMakeAReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const calculateTimeDifference = (createdAt: string) => {
    const commentTime = moment.utc(createdAt).utcOffset(4); // Adjust the UTC offset for Cairo (UTC+2)
    return commentTime.fromNow();
  };

  const toggleMakeAReply = () => {
    setMakeAReply((prev) => !prev);
    setReplyText("@UserName__");
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
      toast.success("Reply Added Successfully");
      setCommentsHeight(commentsRef.current.scrollHeight + 100);
      setCommentReplies((prev: any) => [...prev, data]);
      setReplyText("");
      setMakeAReply(false);
    }

    const responseData = await response.json();
    return responseData;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      text: replyText,
      commentId: 5,
      createdAt: new Date(),
    };

    const res = await postRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}Replies`,
      postData
    );
  };

  return (
    <>
      <div className={styles.replyWrapper}>
        <div className={styles.userImgWrapper}></div>
        <div className={styles.replyInput}>
          <div className={styles.reply}>{reply?.text}</div>
          <div className={styles.replyBottom}>
            <span className={styles.replyLabel} onClick={toggleMakeAReply}>
              {makeAReply ? "Cancel" : "Reply"}
            </span>
            <Image
              src="/images/Dashboard/Oval.svg"
              alt="oval"
              width={4}
              height={4}
            />
            {/* <span>{moment(reply?.createdAt).format("YYYY-MM-DD hh:mm A")}</span> */}
            <span>{calculateTimeDifference(reply?.createdAt)}</span>
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
                </>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reply;
