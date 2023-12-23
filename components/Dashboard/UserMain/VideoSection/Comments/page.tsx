import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/swr";
import Reply from "../Reply/page";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import { toast } from "sonner";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { isArabic } from "@/utils/checkLanguage";
import { endPoints } from "@/services/endpoints";
import {
  deleteRequest,
  getOne,
  postRequest,
  updateRequest,
} from "@/services/service";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdEditNote } from "react-icons/md";
import commentsStyles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";

import { MdOutlinePlaylistRemove } from "react-icons/md";
import DeleteDialog from "@/components/shared/Dialogs/DeleteDialog/page";

export const StyledTextField = styled(TextField)`
  input {
    font-size: 13px; // Set your desired font size
    padding-right: 40px;
  }
`;

const Comments = ({
  userData,
  comment,
  setCommentsHeight,
  commentsRef,
  setCurrentVideoComments,
  currentVideoComments,
  videoId,
}: any) => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputEdit, setInputEdit] = useState<boolean>(false);
  const [commentReplies, setCommentReplies] = useState<any>([]);
  const [isRepliesVisible, setRepliesVisible] = useState(false);
  const [repliesHeight, setRepliesHeight] = useState(0);
  const [makeAReply, setMakeAReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const repliesRef: any = useRef(null);
  const open = Boolean(anchorEl);

  const { data: VideoComments, isLoading } = useSWR(
    endPoints.getCommentByVideoId(videoId),
    getOne
  );

  const { data, isLoading: LoadingReplies } = useSWR(
    endPoints.getRepliesByCommentId(comment?.id),
    getOne,
    {
      onSuccess: (data) => {
        setCommentReplies(data?.data);
      },
    }
  );

  // ** Side Effects

  // ** Functions
  const toggleMakeAReply = () => {
    setMakeAReply((prev) => !prev);
    setReplyText("@" + comment?.full_name + " ");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postData = {
      comment_text: replyText,
      video_id: videoId,
      user_id: userData?.user_id,
    };

    const res = await postRequest(
      endPoints.createReply(comment?.id),
      postData
      // handleSuccess
    );
    if (res.status == 201) {
      handleSuccess(res?.data?.data);
    } else {
      toast.error("Something went wrong");
    }
  };
  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    const postData = {
      comment_text: replyText,
    };

    const res = await updateRequest({
      id: comment?.id,
      endpoint: `comments/updateOne`,
      data: postData,
    });
    if (res.status == 200 || res.status == 204) {
      handleSuccess(res.data?.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleSuccess = async (data: any) => {
    toast.success(
      ` ${inputEdit ? "Comment Updated" : "Reply Added"}  Successfully`
    );
    if (inputEdit) {
      const currentComment = await VideoComments?.data?.find(
        (el: any) => el.id == comment?.id
      );
      //console.log(comment.id);
      //console.log(VideoComments?.data);
      currentComment.comment_text = replyText;
      setInputEdit(false);
    } else {
      const newData = {
        ...data,
        image: userData?.image,
        full_name: userData?.full_name,
      };

      setCommentReplies((prev: any) => [...prev, newData]);
      const currentComment = await VideoComments?.data?.find(
        (el: any) => el.id == comment?.id
      );
      currentComment.reply_count = currentComment.reply_count + 1;

      setCurrentVideoComments((prev: any) => {
        const newComments = [...prev];
        const index = newComments.findIndex((el: any) => el.id == comment?.id);
        // //console.log(index);
        newComments[index] = currentComment;
        return newComments;
      });
    }

    setReplyText("");
    setMakeAReply(false);
  };
  //console.log(commentReplies);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PrepareUpdateComment = () => {
    setInputEdit(true);
    setMakeAReply((prev) => !prev);
    setReplyText(comment?.comment_text);
    handleClose();
  };

  const handleSuccessDeleteComment = () => {
    toast.success("Comment Deleted Successfully");
    setCurrentVideoComments((prev: any) => {
      const newComments = prev?.filter((el: any) => el.id !== comment?.id);
      return newComments;
    });
  };

  const handlePerformDeleteComment = async () => {
    const res: any = await updateRequest({
      endpoint: `ReplayComments/deletReplay/${comment?.id}`,
      id: comment?.id || comment?.commentId,
      data: {},
      handleSuccess: handleSuccessDeleteComment,
    });

    if (res.status == 201) {
      handleSuccessDeleteComment();
    }
  };
  // ////console.log(comment.user_id == userData?.user_id);
  return (
    <div
      className={`${
        comment?.reply_count > 1
          ? commentsStyles.comment_main
          : comment?.reply_count == 1 && isRepliesVisible
          ? commentsStyles.comment_main
          : ""
      } ${
        comment?.reply_count > 1 && !isRepliesVisible
          ? commentsStyles.closed
          : ""
      }`}
    >
      <div className={styles.write_comment}>
        <div className={styles.userImgWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${comment.image}`}
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
          <div
            className={`${styles.comment} ${
              isArabic(comment?.text)
                ? styles.arabicComment
                : styles.englishComment
            }`}
          >
            <span> @{comment?.full_name}</span>
            {comment?.comment_text}
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
            <span>{calculateTimeDifference(comment?.created_at)}</span>
            {comment?.user_id == userData?.user_id ? (
              <>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon
                    sx={{
                      transform: "rotate(90deg)",
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: "13px",
                      fontFamily: "Roboto !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={
                      makeAReply
                        ? () => {
                            handleClose(), setMakeAReply((prev) => !prev);
                          }
                        : PrepareUpdateComment
                    }
                  >
                    <MdEditNote />
                    <span style={{ marginTop: "2px", marginLeft: "5px" }}>
                      {makeAReply ? "Cancel" : "Edit"}
                    </span>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "13px",
                      fontFamily: "Roboto !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      handleClose();
                    }}
                  >
                    <MdOutlinePlaylistRemove />
                    <span style={{ marginTop: "2px", marginLeft: "5px" }}>
                      Delete
                    </span>
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </div>
          <div className={styles.commentInput}>
            <form onSubmit={inputEdit ? handleSubmitEdit : handleSubmit}>
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
        <Accordion
          sx={{
            "& .MuiPaper-root.MuiPaper-elevation": {
              boxShadow: "none !important",
            },
            boxShadow: "none !important",
            marginTop: "0px !important",
            backgroundColor: "#FFF !important",
            padding: "0px !important",
          }}
          expanded={isRepliesVisible}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              background: "#FFF !important",
              padding: 0,
              margin: 0,
              "& .Mui-expanded": {
                margin: 0,
              },
              "& .MuiAccordionSummary-root ": {
                minHeight: "20px !important",
              },
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* {commentReplies?.length > 1 ? (
                <div style={{ marginLeft: "16px" }}>
                  <Reply
                    userData={userData}
                    videoId={videoId}
                    commentId={comment?.id}
                    setCommentReplies={setCommentReplies}
                    key={0}
                    reply={commentReplies?.slice(0, 1)[0]}
                    idx={0}
                  />
                </div>
              ) : null} */}
              <div
                className={`${styles.showAllReplies} ${
                  isRepliesVisible ? styles.visible : ""
                }`}
                onClick={() => {
                  setRepliesVisible((prev) => !prev);
                }}
              >
                {/* <IoIosArrowDown /> */}
                {`${isRepliesVisible ? "Hide" : "Show"} ${
                  commentReplies?.length
                } Replies`}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {commentReplies?.length > 0
              ? commentReplies?.length > 1
                ? commentReplies.map((reply: any, idx: number) => (
                    <Reply
                      userData={userData}
                      videoId={videoId}
                      commentId={comment?.id}
                      setCommentReplies={setCommentReplies}
                      key={idx}
                      reply={reply}
                      idx={idx}
                    />
                  ))
                : commentReplies?.map((reply: any, idx: number) => (
                    <Reply
                      userData={userData}
                      videoId={videoId}
                      commentId={comment?.id}
                      setCommentReplies={setCommentReplies}
                      key={idx}
                      reply={reply}
                      idx={idx}
                    />
                  ))
              : null}
          </AccordionDetails>
        </Accordion>
      ) : null}
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        deleteAction={handlePerformDeleteComment}
      />
    </div>
  );
};

export default Comments;
