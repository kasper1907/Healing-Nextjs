import Dropzone from "@/utils/Dropzone";
import React from "react";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import { Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDownload, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";

const Attachments = () => {
  return (
    <div className={styles.pageWrapper}>
      <Container sx={{ mt: 10 }}>
        <div className={styles.dropZoneWrapper}>
          <Dropzone />
        </div>

        <Grid container rowSpacing={2}>
          {Array.from({ length: 7 }, () => Math.floor(Math.random() * 6))?.map(
            (el, idx) => {
              return (
                <Grid key={idx} className={styles.userFileWrapper} item xs={12}>
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
                        <span>Instruction(1).word</span>
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
                          <AiOutlineEye />
                          View
                        </Button>
                        <Button variant="contained">
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
            }
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Attachments;
