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
import { deleteRequest, postRequest, updateRequest } from "@/services/service";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdEditNote } from "react-icons/md";

import { MdOutlinePlaylistRemove } from "react-icons/md";
import DeleteDialog from "@/components/shared/Dialogs/DeleteDialog/page";

export const StyledTextField = styled(TextField)`
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
  currentVideoComments,
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

  // const { data: Comments, isLoading } = useSWR(endPoints.getComments, fetcher);
  // const { data: Replies } = useSWR(endPoints.getReplies, fetcher);

  const Comments: any = [];
  const Replies: any = [];

  const userData = JSON.parse(window?.localStorage.getItem("userData") || "{}");
  // ** Side Effects

  useEffect(() => {
    const commentReplies =
      Replies &&
      Replies?.length > 0 &&
      Replies?.filter((reply: any) => reply.commentId == comment?.id);
    setCommentReplies(commentReplies);

    if (commentReplies?.length < 5) {
      setRepliesVisible(true);
    } else {
      setRepliesVisible(false);
    }
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
      commentId: comment?.id || comment?.commentId,
      createdAt: new Date(),
      videoId: comment?.videoId,
    };

    const res = await postRequest(
      endPoints.getReplies,
      postData,
      handleSuccess
    );
  };
  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    // console.log(comment);
    const postData = {
      text: replyText,
      id: comment?.id || comment?.commentId,
      videoId: comment?.videoId,
      // createdAt: new Date(),
    };

    const res = await updateRequest({
      id: comment?.id || comment?.commentId,
      endpoint: endPoints.getComments,
      data: postData,
      handleSuccess: handleSuccess,
    });
  };

  const handleSuccess = (data: any) => {
    toast.success(
      ` ${inputEdit ? "Comment Updated" : "Reply Added"}  Successfully`
    );
    if (inputEdit) {
      const currentComment = Comments?.find(
        (comment: any) => comment.id == data.commentId
      );
      const currentCommentIndex = currentVideoComments?.indexOf(currentComment);
      const updatedComments = [...currentVideoComments];
      updatedComments[currentCommentIndex] = data;
      setCurrentVideoComments(updatedComments);
      setInputEdit(false);
      // setCommentReplies((prev: any) => [...prev]);
      // console.log(commentReplies);
    } else {
      setCommentReplies((prev: any) => [...prev, data]);
    }

    setReplyText("");
    setMakeAReply(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PrepareUpdateComment = () => {
    setInputEdit(true);
    setMakeAReply((prev) => !prev);
    setReplyText(comment?.text);
    handleClose();
  };

  const handlePerformDeleteComment = async () => {
    const res = await deleteRequest({
      endpoint: endPoints.getComments,
      id: comment?.id || comment?.commentId,
    });
  };

  // console.log(comment.user_id == userData?.user_id);
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
            <div
              className={`${styles.showAllReplies} ${
                isRepliesVisible ? styles.visible : ""
              }`}
              onClick={() => {
                setRepliesVisible((prev) => !prev);
              }}
            >
              {/* <IoIosArrowDown /> */}
              {`${isRepliesVisible ? "Hide" : "Show"} All ${
                commentReplies?.length
              } Replies`}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            {commentReplies?.length > 0
              ? commentReplies?.map((reply: any, idx: number) => (
                  <Reply
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
    </>
  );
};

export default Comments;
