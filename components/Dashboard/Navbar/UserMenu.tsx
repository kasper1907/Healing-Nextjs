import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { UserContext } from "@/contexts/mainContext";
import { useTabsContext } from "../TabsContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useRouter } from "next/navigation";
import { Logout as LogoutHandler } from "@/utils/Logout";
import useCookie from "react-use-cookie";
import { useCookies } from "react-cookie";
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userToken, setUserToken] = useCookie("accessToken");
  //   const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const open = Boolean(anchorEl);
  const { LoggedInUser }: any = React.useContext(UserContext);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    userTabsValue,
    setUserTabsValue,
    viewAllGroups,
    setViewAllGroups,
  }: any = useTabsContext();

  //   //console.log(LoggedInUser);
  const router = useRouter();
  const ViewAllCourses = () => {
    handleClose();

    if (userTabsValue == 1) {
      //console.log(userTabsValue);
      setViewAllGroups(true);
      let allGroupsSection: any = document.querySelector(".aos-init");
      //console.log(allGroupsSection);
      //   allGroupsSection.scrollIntoView({ behavior: "smooth" });
      allGroupsSection.scrollIntoView({ behavior: "smooth", block: "center" });
      window.scrollTo({
        top: allGroupsSection.offsetTop - 100,
        behavior: "smooth",
      });
    } else {
      setUserTabsValue(1);
      setViewAllGroups(true);
    }
  };

  const handleLogout = () => {
    LogoutHandler();
    router.push("/login");
  };
  //console.log(LoggedInUser);
  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "none" },
        alignItems: "center",
        gap: "0px",
      }}
    >
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {LoggedInUser?.image ? (
            <Avatar
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${LoggedInUser?.image}`}
              alt="test"
              sx={{ width: 50, height: 50 }}
            />
          ) : null}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {LoggedInUser?.role == "User" ? (
          <>
            <MenuItem
              onClick={() => {
                handleClose();
                setUserTabsValue(6);
              }}
            >
              <Avatar /> Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setUserTabsValue(7);
              }}
            >
              <Avatar /> Edit account
            </MenuItem>
            <Divider />
            <MenuItem onClick={ViewAllCourses}>
              <ListItemIcon>
                <FormatListBulletedIcon fontSize="small" />
              </ListItemIcon>
              View All Courses
            </MenuItem>
          </>
        ) : null}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
