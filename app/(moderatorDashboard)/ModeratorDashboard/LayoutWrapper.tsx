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
      title: "Clients",
      children: [
        {
          id: 1,
          name: "All Clients",
          icon: (
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
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard",
        },
      ],
    },
    {
      id: 2,
      title: "Reports",
      children: [
        {
          id: 2,
          name: "Create Report",
          icon: (
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
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/createReport",
        },
        {
          id: 2,
          name: "All Reports",
          icon: (
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
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/allReports",
        },
        {
          id: 33,
          name: "All Questions",
          url: "/ModeratorDashboard/allQuestions",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          ),
        },
      ],
    },
    {
      id: 3,
      title: "Therapy Groups",
      children: [
        {
          id: 3,
          name: "All Groups",
          icon: (
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
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/allGroups",
        },
        {
          id: 4,
          name: "Create Group",
          icon: (
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
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/createGroup",
        },
        {
          id: 6,
          name: "Add Member To Group",
          icon: (
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/addMemberToGroup",
        },
      ],
    },
    {
      id: 4,
      title: "Appointments",
      children: [
        {
          id: 89,
          name: "All Appointments",
          icon: (
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
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/allAppointments",
        },
        {
          id: 98,
          name: "Create Appointment",
          icon: (
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/createAppointment",
        },
      ],
    },
    {
      id: 5,
      title: "Notifications",
      children: [
        {
          id: 2,
          name: "Send A Notification",
          icon: (
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
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/sendNotification",
        },
      ],
    },
    {
      id: 6,
      title: "Sessions",
      children: [
        {
          id: 111,
          name: "Upload Session",
          icon: (
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
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
          ),
          url: "/ModeratorDashboard/UploadSession",
        },
      ],
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
              <Link href="/">
                <Image
                  src={"/images/Dashboard/white.png"}
                  alt="White Logo"
                  width={120}
                  height={40}
                  loading="lazy"
                  objectFit="contain"
                />
              </Link>
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
            className="overflow-y-scroll group/sidebar dashboard-sidebar w-[300px] flex flex-col shrink-0   m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
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
              {/* <div className="flex flex-col w-full font-medium">
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
                          <span className="mr-2">{item?.icon}</span>
                          {item?.name}
                        </Link>
                      </span>
                    </div>
                  );
                })}
              </div> */}

              <ul className="flex flex-col py-4 space-y-1">
                {SidebarItems?.map((item, index) => {
                  return (
                    <>
                      <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                          <div className="text-sm font-light tracking-wide text-gray-500">
                            {item.title}
                          </div>
                        </div>
                      </li>

                      {item.children?.map((child: any, index: number) => {
                        return (
                          <li key={index}>
                            <a
                              href={child.url}
                              className={`${
                                pathname == child?.url
                                  ? "bg-gray-50 text-gray-800 border-[#10458C] border-l-4 pr-6"
                                  : "border-transparent"
                              } transition-all relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4  hover:border-[#10458C] pr-6`}
                            >
                              <span className="inline-flex justify-center items-center ml-4">
                                {child.icon}
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">
                                {child.name}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap ml-9 my-5">
            <div className="w-full max-w-full sm:w-1/4 mx-auto text-center"></div>
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
