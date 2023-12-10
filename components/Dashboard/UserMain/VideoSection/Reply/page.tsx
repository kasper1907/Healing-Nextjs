import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/replies.module.scss";
import moment from "moment"; // Import moment from moment-timezone
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { FaRegPlayCircle } from "react-icons/fa";
import { toast } from "sonner";
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdEditNote } from "react-icons/md";
import {
  deleteRequest,
  getOne,
  postRequest,
  updateRequest,
} from "@/services/service";
import { endPoints } from "@/services/endpoints";
import DeleteDialog from "@/components/shared/Dialogs/DeleteDialog/page";
import useSWR from "swr";

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
  setCommentReplies,
  userData,
  videoId,
}: any) => {
  const [makeAReply, setMakeAReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputEdit, setInputEdit] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const open = Boolean(anchorEl);

  const isArabic = (text: any) => /[\u0600-\u06FF]/.test(text);

  // Function to conditionally apply className based on the language
  const getLanguageClassName = (text: any) => {
    // //console.log(isArabic(text));
    return isArabic(text) ? styles.arabicComment : styles.englishComment;
  };

  const toggleMakeAReply = () => {
    setMakeAReply((prev) => !prev);
    setReplyText("@UserName__");
  };

  // const postRequest: any = async (url: any, data: any) => {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Add any other headers as needed
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.status == 201) {

  //   }

  //   const responseData = await response.json();
  //   return responseData;
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("I am here");
    const postData = {
      comment_text: replyText,
      video_id: videoId,
      user_id: userData?.user_id,
    };

    const res = await postRequest(
      endPoints.createReply(commentId),
      postData,
      successCreateReply
    );
  };

  const handleSubmitEdit = async (e: any) => {
    console.log("I am here 2");

    e.preventDefault();
    const postData = {
      text: replyText,
      id: reply?.id,
      commentId: reply?.commentId,
      videoId: videoId,
      // createdAt: new Date(),
    };
    // //console.log(reply);
    const res = await updateRequest({
      id: reply?.id || reply?.replyId,
      endpoint: endPoints.getReplies,
      data: postData,
      handleSuccess: handleSuccess,
    });
  };

  const handleSuccess = () => {
    setInputEdit(false);
    setMakeAReply(false);

    setCommentReplies((prev: any) => {
      const newReplies = [...prev];
      newReplies[idx].text = replyText;
      return newReplies;
    });
    toast.success("Reply Updated Successfully");
  };

  const successCreateReply = (data: any) => {
    toast.success("Reply Added Successfully");
    const newData = {
      full_name: userData?.full_name,
      image: userData?.image,
      comment_text: replyText,
      createdAt: new Date(),
    };
    setCommentReplies((prev: any) => [...prev, newData]);
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
    setReplyText(reply?.comment_text);
    handleClose();
  };

  const handlePerformDeleteComment = async () => {
    const res: any = await deleteRequest({
      endpoint: `comments/deleteOne`,
      id: reply?.id,
      mutateEndPoint: endPoints.getRepliesByCommentId(commentId),
    });
  };

  return (
    <>
      <div className={styles.replyWrapper}>
        <div className={styles.userImgWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${reply?.image}`}
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
        <div className={styles.replyInput}>
          <div
            className={`${styles.reply} ${
              isArabic(reply?.comment_text)
                ? styles.arabicComment
                : styles.englishComment
            }`}
          >
            {reply?.comment_text}
          </div>
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
                        width: "100px",
                        position: "absolute",
                        right: "0px",
                        top: "50%",
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

      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        deleteAction={handlePerformDeleteComment}
      />
    </>
  );
};

export default Reply;
