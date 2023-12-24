"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import Container from "@mui/material/Container";
import styles from "@/styles/sass/Dashboard/DashboardNavbar/DashboardNavbar.module.scss";
import Link from "next/link";
import { NavbarItems } from "@/models/Navbar";
import { TabContext } from "@mui/lab";
import HomeTabs from "../HomeTabs/page";
import { dashboardTabs, userTabs } from "@/constants/UserTabs";
import { useTabsContext } from "../TabsContext";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Logout } from "@/utils/Logout";
import jwt from "jsonwebtoken";
import { getOne } from "@/services/service";
import { endPoints } from "@/services/endpoints";
import useSWR from "swr";
import useCookie from "react-use-cookie";
import UserMenu from "./UserMenu";
import { useAuthentication } from "@/hooks/useAuthentication";
import { UserContext } from "@/contexts/mainContext";
import { cursorTo } from "readline";

const drawerWidth = 300;
const navItems = [{ id: 1, title: "All Groups", url: "/dashboard" }];

interface Props {
  window?: () => Window;
}
export default function DashboardNavbar(props: Props) {
  const {
    dashboardTabsValue,
    setDashboardTabsValue,
    userTabsValue,
    setUserTabsValue,
  }: any = useTabsContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const PageParams = useParams();
  console.log(PageParams);
  const { id, userId } = PageParams;
  console.log(PageParams);
  const [userImg, setUserImg] = useState("");

  const [userToken, setUserToken] = useCookie("SID");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<any>({});
  const { isAuthenticated, isLoading: MainLoading, isAuthorized } =
    //@ts-ignore
    useAuthentication("/login");
  const decodedToken: any = jwt.decode(userToken?.toString() || "");

  // Logged In User:
  const { User: user, Group }: any = React.useContext(UserContext);

  useEffect(() => {
    user && setUserImg(user?.image);
  }, [user]);
  const { data: CurrentUser, isLoading: UserLoading } = useSWR(
    `Users/getOne/${userId}`,
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const isInProfilePage =
    pathname == "/Profile" ||
    pathname == "/dashboard/Groups" ||
    (pathname.startsWith("/dashboard/Groups/") &&
      pathname.split("/")?.length < 5);
  useEffect(() => {
    typeof localStorage !== "undefined" &&
      setUserData(JSON.parse(localStorage.getItem("userData") || "{}"));
  }, []);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    Logout();
    router.push("/login");
  };
  const pagePath = usePathname();
  const isDashboard = pagePath == "/dashboard";
  const isGroupUsers = pagePath.includes("/dashboard/GroupUsers");
  const isUserPage = pagePath.includes("/dashboard/users");
  const { window } = props;

  const renderDashboardTabs = (
    <div className={styles.dashboard_sidebar_Tabs}>
      {dashboardTabs.map((tab, idx) => (
        <div
          className={`${styles.dashboard_sidebar_Tab} ${
            tab.value == dashboardTabsValue ? styles.active : ""
          }`}
          onClick={() => {
            setDashboardTabsValue(tab?.value);
            handleDrawerToggle();
          }}
          key={idx}
        >
          {tab?.icon} {tab?.label}
        </div>
      ))}
    </div>
  );
  const renderUserTabs = (
    <>
      <div className={styles.dashboard_sidebar_Tabs}>
        {userTabs.map((tab: any, idx: number) => (
          <div
            className={`${styles.dashboard_sidebar_Tab} ${
              tab.value == userTabsValue ? styles.active : ""
            }`}
            onClick={() => {
              setUserTabsValue(tab?.value);
              handleDrawerToggle();
            }}
            key={idx}
          >
            {tab.icon} {tab?.label}
          </div>
        ))}
      </div>

      {navItems.map((item: NavbarItems) => (
        <ListItem key={item?.title} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10458C",
              }}
              onClick={() => {
                handleDrawerToggle();
              }}
              href={item.url}
            >
              <BsFillArrowRightCircleFill />
              <ListItemText
                sx={{ textAlign: "left", marginLeft: "15px" }}
                primary={item?.title}
              />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Link href="/">
          <Image
            src="/images/minilogo.svg"
            width={30}
            height={30}
            alt="Mini-Logo"
          />
        </Link>
        Healing.com
      </Typography>
      <Divider />
      <List>
        {isUserPage && renderUserTabs}
        {isDashboard && renderDashboardTabs}
        {!isUserPage &&
          !isDashboard &&
          navItems.map((item: NavbarItems) => (
            <ListItem key={item?.title} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleDrawerToggle();
                  }}
                  href={item.url}
                >
                  <ListItemText primary={item?.title} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Box
        sx={{
          flexGrow: 1,
          gap: 2,
          display: { sm: "flex" },
        }}
      >
        <Button
          sx={{ width: "90%", margin: "10px" }}
          className={styles.NavBarLink__logout}
          onClick={() => {
            // handleLogout();
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  console.log(CurrentUser?.data);
  console.log(user);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (!MainLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "260px",
          ".MuiToolbar-root ": {
            backgroundColor: "transparent",
            color: "#000",
            padding: "0",
          },
        }}
      >
        <CssBaseline />
        <Container sx={{ "& .MuiContainer-root ": { zIndex: 2 } }}>
          <AppBar
            className={styles.navbar}
            component="nav"
            sx={{
              "&.MuiPaper-root": {
                boxShadow: "none",
                background: "transparent",
                position: "absolute",
              },
            }}
          >
            {isAuthorized ? (
              <Box
                sx={{
                  display: { xs: "none !important", lg: "flex !important" },
                }}
                className={styles.userLogo}
              >
                <Box
                  sx={{
                    width: { xs: "100px", md: "156px" },
                    height: { xs: "100px", md: "156px" },
                  }}
                  className={styles.logoWrapper}
                >
                  <Image
                    src={`${
                      isInProfilePage
                        ? userImg?.length > 0
                          ? process.env.NEXT_PUBLIC_BASE_URL + userImg
                          : "sd"
                        : process.env.NEXT_PUBLIC_BASE_URL +
                          CurrentUser?.data?.image
                    }`}
                    width={156}
                    height={156}
                    alt="userImage2"
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <div className={styles.textWrapper}>
                  <h2>
                    {isInProfilePage
                      ? user
                        ? user?.full_name
                        : ""
                      : CurrentUser?.data
                      ? CurrentUser?.data?.full_name
                      : ""}
                  </h2>
                  <p>
                    {/* {user ?  : ""} */}
                    {isInProfilePage
                      ? user
                        ? "@" + user?.user_name
                        : ""
                      : CurrentUser?.data
                      ? "@" + CurrentUser?.data?.user_name
                      : ""}
                  </p>
                </div>
              </Box>
            ) : null}
            <Container sx={{ position: "relative" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  <Link href="/">
                    <Image
                      style={{ cursor: "pointer" }}
                      src="/images/healing-logo.svg"
                      alt="healingLogo"
                      width={106}
                      height={62}
                    />
                  </Link>
                </Typography>

                <UserMenu />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 0, display: { sm: "none" } }}
                >
                  <Image
                    style={{ cursor: "pointer" }}
                    src={"/images/side-minue.svg"}
                    alt="Side Menu"
                    width={72}
                    height={72}
                  />{" "}
                </IconButton>
                {/* 
              <Box
                sx={{
                  gap: 2,
                  display: { xs: "none", lg: "flex" },
                  justifyContent: "flex-end",
                }}
              >
                <Button className={styles.NavBarLink__logout}>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    href={"*"}
                  >
                    Logout
                  </Link>
                </Button>{" "}
              </Box> */}
              </Toolbar>
            </Container>
            <Image
              src={"/images/Dashboard-banner.png"}
              alt="dashboard-banner"
              fill
              style={{ objectFit: "contain", background: "#f8f6ef" }}
            />
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Container>
      </Box>
    );
  }
}
