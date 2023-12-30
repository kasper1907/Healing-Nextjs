"use client";
import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import { Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import { groups } from "@/constants/Groups";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";
import CardsSkeleton from "@/components/Dashboard/Loading/CardsSkeleton";
import { endPoints } from "@/services/endpoints";
import { getOne } from "@/services/service";
const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  let GroupId = params.get("id");
  const courseId = params.get("courseId");
  const groupId = params.get("groupId");

  const { data, isLoading } = useSWR(
    endPoints.getGroupUsers(groupId, courseId),
    getOne
  );

  const GroupUsers = data?.data;
  const [currentGroup, setCurrentGroup] = React.useState<any>(null);

  useEffect(() => {
    const currentGroup = groups.find((group: any) => group.id == 1);
    setCurrentGroup(currentGroup);
  }, []);

  return (
    <div className={styles.PageWrapper}>
      <Container sx={{ mt: 10 }}>
        <Typography sx={{ mb: 7, ml: 2 }} color={"primary"}>
          Dashboard / All Groups / Group Users
        </Typography>
        <Grid container rowSpacing={7}>
          {isLoading ? (
            <CardsSkeleton />
          ) : GroupUsers?.length > 0 ? (
            GroupUsers?.map((user: any, idx: number) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={idx}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={styles.groupCard}>
                    <div className={styles.img_place}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                        fill
                        alt="userImage"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h3>{user?.full_name}</h3>
                    <div className={styles.groupButtons}>
                      <Button
                        // onClick={() => {
                        //   setCurrentUser(user);
                        // }}
                        variant="contained"
                      >
                        <Link
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          className="flex w-full h-full items-center justify-center"
                          // href={`/dashboard/users/userDetails?id=${user?.id}`}
                          href={{
                            pathname: "/dashboard/users/userDetails",
                            query: {
                              id: user?.id,
                              groupId: groupId,
                            },
                          }}
                        >
                          <AiOutlineEye />
                          View
                        </Link>
                      </Button>
                      <Button variant="outlined">
                        <AiOutlineEdit />
                        Note
                      </Button>
                    </div>
                  </div>
                </Grid>
              );
            })
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
