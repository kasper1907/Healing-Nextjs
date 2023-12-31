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
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { getOne, postRequest } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import DownloadComponenet from "./DownloadComponenet";
import useCookie from "react-use-cookie";
import { Spinner } from "@nextui-org/react";
import { Error } from "@/components/shared/Error/page";
const Attachments = () => {
  const [userToken, setUserToken] = useCookie("SID");
  const decodedToken = jwt.decode(userToken?.toString()) as any;
  const searchParams = useSearchParams();
  const pageParams = useParams();
  const pathname = usePathname();
  const { id, userId } = pageParams;
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const isInProfilePage = pathname == "/Profile";

  const { data: UserFiles, isLoading } = useSWR(
    endPoints.getUserAttachments(decodedToken?.data?.user_id),
    getOne
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    const res = await postRequest(
      `Attachments/uploadFiles/${decodedToken?.data?.user_id}`,
      formData
    );

    if (res.status == 201) {
      toast.success("File Uploaded Successfully");
      setFiles([]);
      setLoading(false);
      mutate(endPoints.getUserAttachments(decodedToken?.data?.user_id));
    } else {
      toast.error("Something went wrong");
    }
  };

  const filesExtensionsImg: any = {
    pdf: "/images/Dashboard/file-icon (2).svg",
    png: "/images/Dashboard/image.svg",
    svg: "/images/Dashboard/image.svg",
    jpg: "/images/Dashboard/image.svg",
    JPEG: "/images/Dashboard/image.svg",
    jpeg: "/images/Dashboard/image.svg",
  };

  const [firstLoading, setFirstLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 1000);
  }, []);

  if (firstLoading) {
    return (
      <div className="w-full h-full gap-2 flex items-center justify-center">
        {" "}
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Container sx={{ mt: 10, paddingBottom: "30px" }}>
        {isInProfilePage ? (
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
          {UserFiles?.data?.length ? (
            UserFiles?.data?.map((el: any, idx: number) => {
              return (
                <Grid
                  key={idx}
                  sx={{
                    padding: { xs: "15px", md: "20px 80px" },
                    marginBottom: "20px",
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
                              el?.attachment_name.split(".").pop()
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
            })
          ) : (
            <div className="w-full flex justify-center">
              <Error msg="No Attachments Found!" />
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Attachments;
