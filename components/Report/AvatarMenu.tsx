import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Logout as LogoutHandler } from "@/utils/Logout";

export default function AvatarMenu({ user }: any) {
  const router = useRouter();
  const RolesInArabic: any = {
    Therapist: "معالج",
    Assistant: "مساعد",
    Doctor: "طبيب",
    User: "مستخدم",
    Admin: "مدير",
  };

  const handleLogout = () => {
    LogoutHandler();
    router.push("/login");
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: process.env.NEXT_PUBLIC_BASE_URL + "/" + user?.image,
            }}
            className="transition-transform"
            description=""
            name=""
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">
              تم تسجيل الدخول ك {RolesInArabic[user?.role]}
            </p>
            <p className="font-bold">@{user?.full_name}</p>
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              router.push("/dashboard");
            }}
            key="الرئيسيه"
          >
            الرئيسيه
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            تسجيل الخروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
