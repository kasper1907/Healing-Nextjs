import { CiSaveDown2 } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { BsRecordCircle } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { UserTab } from "@/models/User";
import UserMain from "@/components/Dashboard/UserMain/page";
import Recommended from "@/components/Dashboard/UserMain/Recommended/page";
import { RiAttachment2 } from "react-icons/ri";
import Recorded from "@/components/Dashboard/UserMain/Recorded/page";
import Attachments from "@/components/Dashboard/UserMain/Attachments/page";
import Saved from "@/components/Dashboard/UserMain/Saved/page";
import Appointments from "@/components/Dashboard/HomePage/Appointments/page";
import Home from "@/components/Dashboard/HomePage/Home/page";
import ProfileDetails from "@/components/Dashboard/profileDetails/page";

const HomeTab: any = {
  value: "1",
  label: "Home",
  icon: <AiFillHome size={18} />,
  component: UserMain,
};
const RecommendedTab: UserTab = {
  value: "2",
  label: "Recommended",
  icon: <AiFillHeart size={18} />,
  component: Recommended,
};
const RecordedTab: UserTab = {
  value: "3",
  label: "Recorded",
  icon: <BsRecordCircle size={18} />,
  component: Recorded,
};
const AppointmentTab: UserTab = {
  value: "4",
  label: "Appointments",
  icon: <BsCalendarDate size={18} />,
  component: Appointments,
};
const AttachmentsTab: UserTab = {
  value: "5",
  label: "Attachments",
  icon: <RiAttachment2 size={18} />,
  component: Attachments,
};
const ProfileTab: UserTab = {
  value: "6",
  label: "Profile",
  isHidden: true,
  component: ProfileDetails,
};

export const userTabs = [
  HomeTab,
  RecommendedTab,
  RecordedTab,
  AppointmentTab,
  AttachmentsTab,
  ProfileTab,
];

const DashboardTab: UserTab = {
  value: "1",
  label: "Dashboard",
  icon: <AiFillHome size={18} />,
  component: Home,
};
const DashboardAppointments: UserTab = {
  value: "2",
  label: "Appointments",
  icon: <BsCalendarDate size={18} />,
  component: Appointments,
};

export const dashboardTabs = [DashboardTab, DashboardAppointments];
