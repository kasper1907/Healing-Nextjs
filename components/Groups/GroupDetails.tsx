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
import { UserContext } from "@/contexts/mainContext";
const GroupDetails = ({ ID }: { ID: string }) => {
  const router = useRouter();
  const params = useSearchParams();
  // let GroupId = params.get("id");
  const pageParams = useParams();
  const { id: groupId } = pageParams;
  // const groupId = params.get("groupId");
  const { LoggedInUser }: any = React.useContext(UserContext);

  const { data: Group, isLoading: LoadingGroup } = useSWR(
    `Groups/getOne/${ID}`,
    getOne,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const { data, isLoading } = useSWR(
    endPoints.getGroupUsers(ID, Group?.data?.course_id),
    getOne
  );

  const GroupUsers = data?.data;
  const [currentGroup, setCurrentGroup] = React.useState<any>(null);

  useEffect(() => {
    const currentGroup = groups.find((group: any) => group.id == 1);
    setCurrentGroup(currentGroup);
  }, []);

  const routeToCreateReport = (id: any) => {
    // router.push({
    //   pathname: "/dashboard/reports/createReport",
    //   query: {
    //     id: id,
    //     groupId: groupId,
    //   },
    // });
    // router.push({
    // });
  };

  return (
    <div className={styles.PageWrapper}>
      <Container maxWidth={"xl"} sx={{ mt: 10 }}>
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
                        // src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                        src={
                          user?.image
                            ? process.env.NEXT_PUBLIC_BASE_URL + user?.image
                            : "/images/Dashboard/avatars/avatar.jpg"
                        }
                        fill
                        alt="userImage"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          padding: 0,
                        }}
                      />
                    </div>
                    <h3>{user?.full_name}</h3>
                    <div className={styles.groupButtons}>
                      {LoggedInUser?.role != "Assistant" && (
                        <Button variant="contained">
                          <Link
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            className="flex w-full h-full items-center justify-center"
                            href={`/dashboard/Groups/${ID}/${user?.id}`}
                          >
                            <AiOutlineEye />
                            View
                          </Link>
                        </Button>
                      )}
                      {LoggedInUser?.role == "Assistant" && (
                        <Button variant="outlined">
                          <Link
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            className="flex w-full h-full items-center justify-center"
                            href={{
                              pathname:
                                LoggedInUser?.role == "Assistant"
                                  ? "/report/create"
                                  : `/report/view/${user?.id}`,
                              query: {
                                id: user?.id,
                                groupId: groupId,
                              },
                            }}
                          >
                            Report
                          </Link>
                        </Button>
                      )}
                      {LoggedInUser?.role == "Therapist" && (
                        <Button variant="outlined">
                          <Link
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            className="flex w-full h-full items-center justify-center"
                            href={{
                              pathname: `/report/view/${user?.id}`,
                              query: {
                                groupId: groupId,
                              },
                            }}
                          >
                            View Report
                          </Link>
                        </Button>
                      )}
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

export default GroupDetails;
