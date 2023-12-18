import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { BsDownload } from "react-icons/bs";
import useDownloader from "react-use-downloader";

const DownloadComponenet = ({ file: el }: any) => {
  const handleDownloadFile = (filename: string) => {
    let fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}download.php?filename=${filename}`;
    download(fileUrl, filename);
  };

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
  return (
    <Button
      disabled={isInProgress ? true : false}
      variant="contained"
      className="main-btn2"
      onClick={() => {
        handleDownloadFile(el?.attachment_name.split("/")[1]);
      }}
    >
      <span
        style={{
          marginTop: "3px",
          marginLeft: "3px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {isInProgress ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CircularProgress size={20} /> Downloading
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BsDownload />
            Download
          </div>
        )}
      </span>
    </Button>
  );
};

export default DownloadComponenet;
