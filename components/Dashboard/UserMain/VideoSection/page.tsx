import React from "react";
import styles from "@/styles/sass/Dashboard/UserMain/videoSection.module.scss";
import Image from "next/image";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const VideoSection = () => {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#10458c",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        backgroundColor: "#FAFAFB !important",
        borderRadius: "12px",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#10458c",
        color: "#10458c !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#10458c",
        color: "#10458c !important",
      },
      "& .MuiInputBase-input": {
        zIndex: 22,
        paddingRight: "35px",
      },
      "& .MuiInputBase-root": {
        color: "red !important",
      },
    },
  });

  return (
    <div className={styles.SectionWrapper}>
      <div className={styles.sessionInfo}>
        <div className={styles.sessionInfo__imgWrapper}>
          <Image
            src="/images/dashboard/session-logo.svg"
            width={50}
            height={50}
            alt="sessionInfo"
          />
        </div>

        <div className={styles.sessionInfo__text}>
          <Typography color={"primary"}>Session 3</Typography>
          <Typography variant="body2" color={"#92929D"}>
            12 April at 09.28 PM
          </Typography>
        </div>
      </div>

      <div className={styles.videoContainer}>
        <iframe
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
          className={styles.videoIframe}
          allowFullScreen
          src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
        ></iframe>
      </div>

      <div className={styles.comments_header}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src={"/images/Dashboard/ic_comment.svg"}
            width={20}
            height={20}
            alt="commentsIcon"
          />
          <span className="text-[#44444F] text-[15px] hover:text-[#10458C]">
            25 Question
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
          <CssTextField
            fullWidth
            autoComplete="off"
            label="Ask about this session.."
            id="custom-css-outlined-input"
            sx={{
              "& .MuiFormControl-root ": {
                borderRadius: "16px",
              },
              "& .MuiInputBase-root ": {
                color: "#92929D",
                paddingRight: "12px",
              },
              "& .MuiFormLabel-root": {
                color: "#92929D",
                fontSize: { xs: "12px", sm: "14px" },
                marginTop: "2px",
              },
            }}
          />

          <Image
            className={styles.sendIcon}
            alt="send"
            src={"/images/Dashboard/send.svg"}
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
