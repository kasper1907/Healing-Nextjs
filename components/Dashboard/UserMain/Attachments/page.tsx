import Dropzone from "@/utils/Dropzone";
import React from "react";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import { Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDownload, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import jwt from "jsonwebtoken";
import { useSearchParams } from "next/navigation";
import { getOne } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import useSWR from "swr";
const Attachments = () => {
  const token = document?.cookie.split("=")[1];
  const decodedToken = jwt.decode(token?.toString()) as any;
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const isParamsUserIdEqualDecodedTokenUserId =
    userId == decodedToken?.data?.id;

  const { data: UserFiles, isLoading } = useSWR(
    endPoints.getUserAttachments(decodedToken?.data?.id),
    getOne
  );

  const handleDownloadFile = (url: string, fileName: string) => () => {
    const proxyUrl =
      "http://localhost/healing-backend/proxy.php?url=" +
      encodeURIComponent(url);

    window.open(proxyUrl);

    // Fetch the file content from the server
    // fetch(proxyUrl, {
    //   method: "GET",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/pdf",
    //   },
    // })
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create a Blob with the file content
    //     const fileUrl = window.URL.createObjectURL(blob);

    //     // Create a link element and trigger a download
    //     const fileLink = document.createElement("a");
    //     fileLink.href = fileUrl;
    //     fileLink.setAttribute("download", fileName);
    //     document.body.appendChild(fileLink);
    //     fileLink.click();

    //     // Clean up: remove the link and revoke the Blob URL
    //     document.body.removeChild(fileLink);
    //     window.URL.revokeObjectURL(fileUrl);
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading file:", error);
    //   });
  };
  return (
    <div className={styles.pageWrapper}>
      <Container sx={{ mt: 10 }}>
        {isParamsUserIdEqualDecodedTokenUserId ? (
          <div className={styles.dropZoneWrapper}>
            <Dropzone />
          </div>
        ) : null}

        <Grid container rowSpacing={2}>
          {UserFiles?.data?.length &&
            UserFiles?.data?.map((el: any, idx: number) => {
              return (
                <Grid
                  key={idx}
                  sx={{
                    padding: { xs: "15px", md: "20px 80px" },
                  }}
                  className={styles.userFileWrapper}
                  item
                  xs={12}
                >
                  <Grid container rowSpacing={1}>
                    <Grid
                      sx={{ display: "flex", alignItems: "center" }}
                      item
                      xs={12}
                      md={6}
                    >
                      <span className="flex items-center gap-2">
                        <Image
                          src={`/images/Dashboard/file-icon (${
                            Math.floor(Math.random() * 2) + 1
                          }).svg`}
                          width={20}
                          height={20}
                          alt="attachment"
                        />
                        <span>{el?.name}</span>
                      </span>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "flex-end" },
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <div className={styles.groupButtons}>
                        <Button variant="outlined">
                          <Link
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                            target="_blank"
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}${el?.attachment_name}`}
                            rel="noopener noreferrer"
                            download
                          >
                            <AiOutlineEye />
                            View
                          </Link>
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleDownloadFile(
                            `${process.env.NEXT_PUBLIC_BASE_URL}${el?.attachment_name}`,
                            el?.name
                          )}
                        >
                          <BsDownload />
                          <span style={{ marginTop: "3px", marginLeft: "3px" }}>
                            Download
                          </span>
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default Attachments;
