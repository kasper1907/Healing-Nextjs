"use client";
import * as React from "react";
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
import styles from "@/styles/sass/Navbar/navbar.module.scss";
import Link from "next/link";
import { NavbarItems } from "@/models/Navbar";
import useCookie from "react-use-cookie";
import { getCookie } from "@/utils/getCookies";
import { Logout as LogoutHandler } from "@/utils/Logout";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Avatar } from "@material-tailwind/react";
import { Tooltip } from "@mui/material";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  accessToken?: string;
}
// const navItems = ['جلساتي', 'المدونه', 'تواصل معنا'];
const handleContactUs = () => {
  let contactSection: any = document.querySelector(".contact");
  contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
  window.scrollTo({
    top: contactSection.offsetTop - 100,
    behavior: "smooth",
  });
};
const drawerWidth = 300;

export default function Navbar(props: Props) {
  const { window, accessToken } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dashboardLink, setDashboardLink] = React.useState("/Profile");
  const [userToken, setUserToken] = useCookie("SID");
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const decodedToken: any = jwt.decode(accessToken as any);
  React.useEffect(() => {
    const userRedirectionLinks: any = {
      Moderator: "/ModeratorDashboard",
      User: "/Profile",
      Assistant: "/dashboard/Groups",
      Doctor: "/dashboard/Groups",
    };
    setDashboardLink(userRedirectionLinks[decodedToken?.data?.role]);
  }, [decodedToken]);

  // const navItems = [
  //   { id: 1, title: "جلساتي", url: dashboardLink || "#" },
  //   { id: 2, title: "المدونه", url: "#" },
  //   { id: 3, title: "تواصل معنا", url: "#", onclick: handleContactUs },
  // ];

  const navItems = React.useMemo(() => {
    return [
      {
        id: 1,
        title: "جلساتي",
        url:
          decodedToken?.data?.role == "User"
            ? "/Profile"
            : decodedToken?.data?.role == "Moderator"
            ? "/ModeratorDashboard"
            : decodedToken?.data?.role == "Doctor" ||
              decodedToken?.data?.role == "Therapist"
            ? "/dashboard/Groups"
            : "/login",
      },
      { id: 2, title: "المدونه", url: "#" },
      { id: 3, title: "تواصل معنا", url: "#", onclick: handleContactUs },
    ];
  }, []);

  const handleLogout = () => {
    LogoutHandler();
    router.refresh();
  };

  // const accessToken = getCookie("SID");
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
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
        {navItems.map((item: NavbarItems) => (
          <ListItem key={item?.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item?.title} />
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
        <Button className={styles.NavBarLink}>English</Button>
        <Button className={styles.NavBarLink}>
          <Link href={"/login"}>تسجيل الدخول</Link>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        ".MuiToolbar-root ": {
          backgroundColor: "#f5f2ec",
          color: "#000",
          padding: "0",
        },
      }}
    >
      <CssBaseline />
      {/* <Container> */}
      <AppBar
        className={styles.navbar}
        component="nav"
        sx={{
          "&.MuiPaper-root": {
            boxShadow: "none",
            background: "#f5f2ec",
          },
        }}
      >
        <Container>
          <Toolbar sx={{ direction: { xs: "rtl", sm: "ltr" } }}>
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
              }}
            >
              {accessToken == undefined ? (
                <Button className={styles.NavBarLink}>
                  <Link href={"/login"}>تسجيل الدخول</Link>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleLogout}
                    className={styles.NavBarLinkLogout}
                  >
                    تسجيل الخروج
                  </Button>
                  <Tooltip title={decodedToken?.data?.full_name}>
                    <Avatar
                      className="cursor-pointer"
                      size="sm"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${
                        decodedToken ? decodedToken?.data?.image : ""
                      }`}
                      alt="avatar"
                    />
                  </Tooltip>
                </>
              )}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                gap: "10px",
                justifyContent: "center",
                flexDirection: "row-reverse",
                display: { xs: "none", sm: "flex" },
              }}
            >
              {navItems.map((item: NavbarItems, index: number) => (
                <Link
                  href={item?.url}
                  className={`${styles.navLink} ${index == 0 && styles.active}`}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(item?.url);
                    item?.onclick && item?.onclick();
                    item?.url ? router.push(item?.url) : null;
                  }}
                  key={index}
                  style={{ color: "#000" }}
                >
                  {item?.title}
                </Link>
              ))}
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                justifyContent: "flex-end",
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
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
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
      {/* </Container> */}
    </Box>
  );
}
