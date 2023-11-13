"use client";
import * as React from "react";
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
import { usePathname } from "next/navigation";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
// const navItems = ['جلساتي', 'المدونه', 'تواصل معنا'];

const drawerWidth = 300;
const navItems = [{ id: 1, title: "All Groups", url: "/dashboard" }];

export default function DashboardNavbar(props: Props) {
  const {
    dashboardTabsValue,
    setDashboardTabsValue,
    userTabsValue,
    setUserTabsValue,
  }: any = useTabsContext();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const pagePath = usePathname();
  const isDashboard = pagePath == "/dashboard";
  const isGroupUsers = pagePath.includes("/dashboard/GroupUsers");
  const isUserPage = pagePath.includes("/dashboard/users");

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
        <Image
          src="/images/minilogo.svg"
          width={30}
          height={30}
          alt="Mini-Logo"
        />
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
        >
          <Link href={"/login"}>Logout</Link>
        </Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
                <Image
                  src="/images/healing-logo.svg"
                  alt="healingLogo"
                  width={106}
                  height={62}
                />
              </Typography>

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

              <Box
                sx={{
                  flexGrow: 1,
                  gap: 2,
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "flex-end",
                }}
              >
                <Button className={styles.NavBarLink__logout}>
                  <Link href={"/login"}>Logout</Link>
                </Button>{" "}
              </Box>
            </Toolbar>
            <Box className={styles.userLogo}>
              <Box
                sx={{
                  width: { xs: "100px", md: "156px" },
                  height: { xs: "100px", md: "156px" },
                }}
                className={styles.logoWrapper}
              ></Box>
              <div className={styles.textWrapper}>
                <h2>Dr. Ahmed</h2>
                <p>@dr.ahmed12</p>
              </div>
            </Box>
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
