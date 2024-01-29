import React from "react";
import styles from "@/styles/sass/Dashboard/HomePage/HomePage.module.scss";
import {
  Button,
  Container,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
// import { groups } from "@/constants/Groups";
import { GrView } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { fetcher } from "@/utils/swr";
import useSWR from "swr";
import CardsSkeleton from "../../Loading/CardsSkeleton";
import { Error } from "@/components/shared/Error/page";
import { getOne } from "@/services/service";
import { UserContext } from "@/contexts/mainContext";
import Image from "next/image";
import { isArabic } from "@/utils/checkLanguage";
import { FcAbout, FcDocument } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Badge } from "@nextui-org/react";

type Group = {
  id: number;
  groupId: string;
  name: string;
  group_name: string;
  course_id: string;
  users: any[];
  image: string;
  logo: string;
  report_num: any;
  ReportId: any;
};
const Home = () => {
  const { LoggedInUser }: any = React.useContext(UserContext);
  const UserRole = LoggedInUser?.role;
  const router = useRouter();
  const loggedInUserPHash = LoggedInUser?.passwordHash;
  let endpointName =
    LoggedInUser?.role == "Assistant"
      ? `getAssistantGroups/${LoggedInUser?.user_id}`
      : (LoggedInUser?.role == "Therapist" &&
          `getTherapistGroups/${LoggedInUser?.user_id}`) ||
        (LoggedInUser?.role == "Doctor" &&
          `getTherapistGroups/${LoggedInUser?.user_id}`);

  const { data, error, isLoading } = useSWR(`Groups/${endpointName}`, getOne);
  const Groups: any = data?.data;

  if (error) {
    return <Error />;
  }
  return (
    <div className={styles.PageWrapper}>
      <Container sx={{ mt: 10 }}>
        <Typography sx={{ mb: 7, ml: 2 }} color={"primary"}>
          Dashboard / All Groups
        </Typography>
        <Grid container spacing={2} rowSpacing={7}>
          {isLoading ? (
            <CardsSkeleton />
          ) : (
            Groups?.length > 0 &&
            Groups.map((group: Group | any, idx: any) => {
              let uncompletedReportsLength = group?.reports?.filter(
                (item: any) => {
                  return item?.is_completed_by_assistant == "false";
                }
              ).length;
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
                    {UserRole == "Assistant" || UserRole == "Doctor" ? (
                      <span>
                        {group?.report_num ? (
                          <div
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                            }}
                          >
                            <Tooltip
                              style={{ zIndex: "222222222" }}
                              title={
                                UserRole == "Assistant"
                                  ? "There is a report that should be completed"
                                  : "You Have Reports, Click To View"
                              }
                            >
                              <Link
                                href={
                                  UserRole == "Assistant"
                                    ? `/dashboard/AssistantReport/${group?.groupId}`
                                    : `/dashboard/ViewReport/${group?.groupId}`
                                }
                                target="_blank"
                              >
                                <Badge
                                  content={uncompletedReportsLength || 0}
                                  color="danger"
                                >
                                  <FcDocument
                                    size={30}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  />
                                </Badge>
                              </Link>
                            </Tooltip>
                          </div>
                        ) : null}
                      </span>
                    ) : null}
                    <div className={styles.img_place}>
                      <Image
                        src={`https://mtnhealingcenter.com/healing-center/${group?.logo}`}
                        fill
                        alt="group image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          background: "#fff",
                          borderRadius: "50%",
                        }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: isArabic(group?.group_name)
                          ? "Tajawal !important"
                          : "Roboto",
                      }}
                      className={`${
                        isArabic(group?.group_name) && styles.groupNameArabic
                      }`}
                    >
                      {group?.group_name}
                    </h3>
                    <div className={styles.groupButtons}>
                      <Button variant="contained">
                        <Link
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          className="flex items-center justify-center gap-1"
                          href={`/dashboard/Groups/${group?.groupId}`}
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
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
