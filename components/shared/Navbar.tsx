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
import { useTranslation } from "react-i18next";
import { t } from "i18next";

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
  const [userToken, setUserToken] = useCookie("SID");
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const Languages: any = {
    en: { nativeName: "English" },
    ar: { nativeName: "Arabic" },
  };

  const navItems = [
    { id: 1, title: "My Sessions", url: "/Profile" },
    { id: 2, title: "Blog", url: "#" },
    { id: 3, title: "Contact Us", url: "#", onclick: handleContactUs },
  ];

  const handleLangItemClick = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
          <Link href={"/login"}>{t("Sign In")}</Link>
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
              <Button
                className={styles.NavBarLink}
                onClick={() =>
                  i18n.resolvedLanguage == "en"
                    ? handleLangItemClick("ar")
                    : handleLangItemClick("en")
                }
              >
                {i18n.resolvedLanguage == "en" && "Arabic"}
                {i18n.resolvedLanguage == "ar" && "English"}
              </Button>
              {accessToken == undefined ? (
                <Button className={styles.NavBarLink}>
                  <Link href={"/login"}>{t("Sign In")}</Link>
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  className={styles.NavBarLinkLogout}
                >
                  {t("Sign Out")}
                </Button>
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
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    item?.onclick && item?.onclick();
                    item?.url ? router.push(item?.url) : null;
                  }}
                  className={`${styles.navLink} ${index == 0 && styles.active}`}
                  key={index}
                  style={{ color: "#000" }}
                >
                  {t(item?.title)}
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
