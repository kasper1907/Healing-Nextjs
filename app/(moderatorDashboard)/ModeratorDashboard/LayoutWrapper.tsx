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
import { TbChecklist, TbReport } from "react-icons/tb";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { BiLogoZoom } from "react-icons/bi";
import { IoIosCloudUpload, IoIosPersonAdd } from "react-icons/io";
import { AiOutlineNotification } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "@/components/ModeratorDashboard/UserMenu/UserMenu";
import { BsClock } from "react-icons/bs";
import { UserContext } from "@/contexts/mainContext";
import Link from "next/link";

const drawerWidth = 300;

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
  const [open, setOpen] = React.useState(true);
  const { LoggedInUser }: any = React.useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pathname = usePathname();
  const router = useRouter();
  const SidebarItems = [
    {
      id: 1,
      name: "Clients",
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
      name: "All Groups",
      icon: <TbChecklist style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/allGroups",
    },
    {
      id: 4,
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
      id: 5,
      name: "All Appointments",
      icon: <BsClock style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/allAppointments",
    },
    {
      id: 5,
      name: "Create Appointment",
      icon: <BiLogoZoom style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/createAppointment",
    },
    {
      id: 6,
      name: "Add Member",
      icon: <IoIosPersonAdd style={{ color: "rgb(154 154 154)" }} size={21} />,
      url: "/ModeratorDashboard/addMemberToGroup",
    },

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
    <Box sx={{ display: "flex", zIndex: "2", position: "relative" }}>
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
        {/* <DrawerHeader>
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
                background: pathname == item?.url ? "#10458C" : "transparent",
                color: pathname == item?.url ? "#FFF" : "",
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
                background: pathname == item?.url ? "#10458C" : "transparent",
                color: pathname == item?.url ? "#FFF" : "",
              }}
              className="hover:bg-red"
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
        </List> */}
        <>
          <div
            className="group/sidebar w-[300px] flex flex-col shrink-0   m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
            id="sidenav-main"
          >
            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="flex items-center justify-between px-8 py-5">
              <div className="flex items-center mr-5">
                <div className="mr-5">
                  <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                    <Image
                      className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                      src={"/images/8380015.jpg"}
                      alt="avatar image"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="mr-2 ">
                  <a
                    href="javascript:void(0)"
                    className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
                  >
                    {LoggedInUser?.user_name?.slice(0, 1)?.toUpperCase() +
                      LoggedInUser?.user_name?.slice(
                        1,
                        LoggedInUser?.user_name?.length
                      )}
                  </a>
                  <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
                    {LoggedInUser?.role}
                  </span>
                </div>
              </div>
              <a
                className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
                href="javascript:void(0)"
              >
                <span
                  onClick={() => {
                    handleDrawerClose();
                  }}
                  className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="relative  my-5 ">
              <div className="flex flex-col w-full font-medium">
                {SidebarItems?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <span
                        className={`${
                          item?.url == pathname
                            ? "border-[#10458C]"
                            : "border-transparent"
                        } select-none pl-3 flex items-center px-4 py-[.775rem] transition-all duration-75 ease-in-out border-l-4  hover:border-[#10458C] cursor-pointer my-[.4rem]`}
                      >
                        <Link
                          href={item?.url}
                          className="flex items-center flex-grow text-[1rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                        >
                          {item?.name}
                        </Link>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap ml-9 my-5">
            <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
              <p className="text-lg text-slate-500 py-1">
                Tailwind CSS Component from{" "}
                <a
                  href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents"
                  className="text-slate-700 hover:text-slate-900"
                  target="_blank"
                >
                  Riva Dashboard Library
                </a>{" "}
                by{" "}
                <a
                  href="https://www.loopple.com"
                  className="text-slate-700 hover:text-slate-900"
                  target="_blank"
                >
                  Loopple Builder
                </a>
                .
              </p>
            </div>
          </div>
        </>
        <div>Hello</div>
      </Drawer>
      <Main sx={{ background: "#FFF" }} open={open}>
        <DrawerHeader />
        {/* <MembersList /> */}
        {children}
      </Main>
    </Box>
  );
}
