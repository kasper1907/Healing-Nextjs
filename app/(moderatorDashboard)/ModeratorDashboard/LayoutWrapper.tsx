"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import MembersList from "@/components/ModeratorDashboard/MembersList/page";
import { LuUsers2 } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { BiLogoZoom } from "react-icons/bi";
import { IoIosCloudUpload, IoIosPersonAdd } from "react-icons/io";
import { AiOutlineNotification } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "@/components/ModeratorDashboard/UserMenu/UserMenu";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pathname = usePathname();
  const router = useRouter();
  const topItems = [
    {
      id: 1,
      name: "Members",
      icon: <LuUsers2 style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard",
    },
    {
      id: 2,
      name: "Create Report",
      icon: <TbReport style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/createReport",
    },
    {
      id: 3,
      name: "Create Group",
      icon: (
        <HiOutlineRectangleGroup
          style={{ color: "rgb(154 154 154)" }}
          size={21}
        />
      ),
      url: "/ModeratorDashboard/createGroup",
    },
    {
      id: 4,
      name: "Create Appointment",
      icon: <BiLogoZoom style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/createAppointment",
    },
    {
      id: 5,
      name: "Add Member",
      icon: <IoIosPersonAdd style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/addMemberToGroup",
    },
  ];
  const bottomItems = [
    {
      id: 1,
      name: "Upload Session",
      icon: (
        <IoIosCloudUpload style={{ color: "rgb(154 154 154)" }} size={21} />
      ),
      url: "/ModeratorDashboard/UploadSession",
    },
    {
      id: 2,
      name: "Send A Notification",
      icon: (
        <AiOutlineNotification
          style={{ color: "rgb(154 154 154)" }}
          size={21}
        />
      ),
      url: "/ModeratorDashboard/sendNotification",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="flex justify-between">
          <Box className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 0, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Image
                src={"/images/Dashboard/white.png"}
                alt="White Logo"
                width={120}
                height={40}
                loading="lazy"
                objectFit="contain"
              />
            </Typography>
          </Box>

          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap>
            Healing Center
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {topItems.map((item, index) => (
            <ListItem
              style={{
                background: pathname == item?.url ? "#F4F4F5" : "transparent",
              }}
              key={index}
              disablePadding
              onClick={() => {
                router.push(item?.url);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {bottomItems.map((item, index) => (
            <ListItem
              style={{
                background: pathname == item?.url ? "#F4F4F5" : "transparent",
              }}
              key={index}
              disablePadding
              onClick={() => {
                router.push(item?.url);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <MembersList /> */}
        {children}
      </Main>
    </Box>
  );
}
