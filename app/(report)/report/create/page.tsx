"use client";
import React, { useState } from "react";
import "@/styles/reports/main.css";
import Image from "next/image";
import Content from "@/components/Report/Content/Content";
import { getOne } from "@/services/service";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import UserMenu from "@/components/Dashboard/Navbar/UserMenu";
import AvatarMenu from "@/components/Report/AvatarMenu";
import { UserContext } from "@/contexts/mainContext";

const TableNames: any = {
  brainstem: "جذع الدماغ",
  cerebellum: "المخيخ",
  cerebral_medulla: "النخاع الدماغي",
  cerebral_medulla_motor_cortex: "نخاع المخ والقشرة المخية الحركية",
  cerebral_cortex: "القشرة المخية",
  emotion_center: "مركز العاطفة",
};

const Page = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [Table, setTable] = useState<any>([]);
  const [userSelections, setUserSelections] = React.useState<any[]>([]);
  const [copyOfMainTable, setCopyOfMainTable] = React.useState<any[]>([]);
  const Tabs2: any = [
    { id: 1, name: "brainstem", title: "جذع الدماغ" },
    { id: 2, name: "cerebellum", title: "المخيخ" },
    { id: 3, name: "cerebral_medulla", title: "النخاع الدماغي" },
    {
      id: 4,
      name: "cerebral_medulla_motor_cortex",
      title: "نخاع المخ والقشرة المخية الحركية",
    },
    { id: 5, name: "cerebral_cortex", title: "القشرة المخية" },
    { id: 6, name: "emotion_center", title: "مركز العاطفة" },
  ];
  const { LoggedInUser }: any = React.useContext(UserContext);

  const handleSearch = (e: any) => {
    if (e.target.value == "") {
      setTable(copyOfMainTable);
      return;
    }
    const filtered: any =
      Array.isArray(Table) &&
      copyOfMainTable?.filter((el: any) => {
        return el?.name_texture?.includes(e.target.value);
      });

    setTable(filtered);
    if (filtered?.length == 0 || filtered == false) {
      setTable("No Results");
    }
  };

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const { data: User, isLoading: UserLoading } = useSWR(
    `users/getOne/${userId}`,
    getOne,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const { data, error, isLoading } = useSWR(
    `Reports/getAllnameTexture/${Tabs2[activeTab].name}`,
    getOne,
    {
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setUserSelections(
          data?.data?.map((el: any, idx: any) => {
            return {
              tableNameArabic: TableNames[Tabs2[activeTab].name],
              name_texture: el?.name_texture,
              status: "",
              place: "",
              B_id: el?.B_id,
              password: User?.data?.password,
            };
          })
        );

        setTable(data?.data);
        setCopyOfMainTable(data?.data);
      },
    }
  );

  // return <div>Report Page</div>;
  return (
    <div className="report-selection">
      <div className="wrapper">
        <div className="side-bar ">
          <figure className="logo-ct">
            <Image
              width={100}
              height={100}
              src="/images/Reports/Brain CT Scan.svg"
              alt="logo"
            />
          </figure>

          <ul>
            {Tabs2.map((tab: any, idx: number) => {
              return (
                <li
                  onClick={() => {
                    setActiveTab(idx);
                  }}
                  key={idx}
                  className={idx == activeTab ? "active" : ""}
                >
                  {" "}
                  <a>{tab.title}</a>{" "}
                </li>
              );
            })}
          </ul>

          {/* <!--<button onclick="clearLocalStorage()" style="background-color: red;"> Clear Local Storage </button> --> */}
        </div>

        <div className="content">
          <figure className="logo-ct2">
            <Image
              width={100}
              height={100}
              src="/images/Reports/Brain CT Scan.svg"
              alt="logo"
            />
          </figure>
          {/* <!-- top tabs --> */}
          <div className="top-tabs">
            <ul>
              {Tabs2.map((tab: any, idx: number) => {
                return (
                  <li
                    onClick={() => {
                      setActiveTab(idx);
                    }}
                    key={idx}
                    className={idx == activeTab ? "active" : ""}
                  >
                    {" "}
                    <a>{tab.title}</a>{" "}
                  </li>
                );
              })}
            </ul>

            {/* <!-- <button onclick="clearLocalStorage()" style="background-color: red;"> Clear Local Storage </button> --> */}
          </div>
          {/* <!--SEARCH BAR--> */}
          <div className="top-bar">
            {/* <UserMenu currentPageUser={User} /> */}
            <AvatarMenu user={LoggedInUser} />
            <div className="search-box">
              <Image
                src="/images/Reports/vuesax-linear-search-normal.svg"
                alt="search-icon"
                width={24}
                height={24}
              />
              <input
                className="search-input"
                type="text"
                placeholder="بحث"
                onChange={handleSearch}
              />
            </div>

            <figure className="logo-healing">
              <a href="<?php echo 'https://mtnhealingcenter.com/healing-center/doctor_home.php?id='.$_GET['id'] ?> ">
                {" "}
                <Image
                  width={107}
                  height={52}
                  src="/images/Reports/healing-logo.svg"
                  alt="logo"
                />
              </a>
            </figure>
          </div>

          <Content
            Table={Table}
            tableName={Tabs2[activeTab].name}
            userSelections={userSelections}
            setUserSelections={setUserSelections}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
