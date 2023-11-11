"use client";
import React, { useEffect } from "react";
import styles from "../../../../styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Button, Container, Grid } from "@mui/material";
import { groups } from "@/app/constants/Groups";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  console.log(router);
  // const { id: GroupId } = params.params;
  console.log();
  const [currentGroup, setCurrentGroup] = React.useState<any>(null);
  useEffect(() => {
    const currentGroup = groups.find((group) => group.id == 1);
    setCurrentGroup(currentGroup);
  }, []);

  console.log(currentGroup?.groupUsers?.length);
  return (
    <div className={styles.PageWrapper}>
      <Container sx={{ mt: 10 }}>
        <Grid container rowSpacing={7}>
          {currentGroup?.groupUsers?.length > 0 ? (
            currentGroup?.groupUsers?.map((user: any, idx: number) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <div className={styles.groupCard}>
                  <div className={styles.img_place}></div>
                  <h3>{user.name}</h3>
                  <div className={styles.groupButtons}>
                    <Button variant="contained">
                      <AiOutlineEye />
                      View
                    </Button>
                    <Button variant="outlined">
                      <AiOutlineEdit />
                      Note
                    </Button>
                  </div>
                </div>
              </Grid>
            ))
          ) : (
            <div className="h-fit w-full flex flex-col items-center justify-center">
              <Image
                src={"/images/No Data.svg"}
                width={300}
                height={300}
                alt="No Data Image"
              />

              <span className="text-[#10458C] mt-4">
                Ops! There are no users in this group.
              </span>

              <Link
                href={"/dashboard"}
                style={{
                  color: "rgb(146, 146, 157, 100%)",
                  fontSize: "15px",
                  textDecoration: "underline",
                }}
              >
                Go Back
              </Link>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Page;
