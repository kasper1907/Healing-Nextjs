import Dropzone from "@/utils/Dropzone";
import React, { useEffect, useState } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDownload, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import jwt from "jsonwebtoken";
import { useSearchParams } from "next/navigation";
import { getOne, postRequest } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import DownloadComponenet from "./DownloadComponenet";
const Attachments = () => {
  const token = document?.cookie.split("=")[1];
  const decodedToken = jwt.decode(token?.toString()) as any;
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const isParamsUserIdEqualDecodedTokenUserId =
    userId == decodedToken?.data?.id;

  const { data: UserFiles, isLoading } = useSWR(
    endPoints.getUserAttachments(decodedToken?.data?.id),
    getOne
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    const res = await postRequest(
      `attachments/uploadFiles/${decodedToken?.data?.id}`,
      formData,
      () => {
        toast.success("File Uploaded Successfully");
        setFiles([]);
        setLoading(false);
        mutate(endPoints.getUserAttachments(decodedToken?.data?.id));
      }
    );
  };

  const filesExtensionsImg: any = {
    pdf: "/images/Dashboard/file-icon (2).svg",
    doc: "/images/Dashboard/file-icon (1).svg",
    docx: "/images/Dashboard/file-icon (1).svg",
  };

  
  return (
    <div className={styles.pageWrapper}>
      <Container sx={{ mt: 10 }}>
        {isParamsUserIdEqualDecodedTokenUserId ? (
          <div className={styles.dropZoneWrapper}>
            <Dropzone
              files={files}
              setFiles={setFiles}
              loading={loading}
              handleSubmit={handleSubmit}
            />
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
                          src={`${
                            filesExtensionsImg[
                              el?.attachment_name.split(".")[1]
                            ]
                          }`}
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
                        <DownloadComponenet file={el} />
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
