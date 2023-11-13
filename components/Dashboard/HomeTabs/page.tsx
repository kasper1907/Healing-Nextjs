// "use client";
// import * as React from "react";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

// import PhoneIcon from "@mui/icons-material/Phone";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import PersonPinIcon from "@mui/icons-material/PersonPin";
// import { AiFillHome } from "react-icons/ai";
// import { BsFillCalendarDateFill } from "react-icons/bs";
// import { Box } from "@mui/material";

// interface Props {
//   setValue: any;
//   value: string;
// }

// const HomeTabs = (props: any) => {
//   const { value, setValue } = props;
//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   return (
//     <Box
//       sx={{ display: { xs: "none", lg: "flex" } }}
//       style={{
//         background: "#C0F8E0",
//         height: "72px",
//         // position: "fixed",
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <TabList
//         onChange={handleChange}
//         sx={{
//           "& .MuiTabs-indicator": {
//             backgroundColor: "#10458c",
//             height: "3px",
//             borderTopRightRadius: "12px",
//             borderTopLeftRadius: "12px",
//           },
//           "& .MuiButtonBase-root": {
//             color: "#10458c !important",
//           },
//           "& .Mui-selected": {
//             backgroundColor: "rgb(129, 242, 194, 35%)",
//           },
//         }}
//         aria-label="lab API tabs example"
//       >
//         <Tab icon={<AiFillHome size={18} />} value="1" label="Home" />
//         <Tab
//           value="2"
//           icon={<BsFillCalendarDateFill size={16} />}
//           label="Appointment"
//         />
//       </TabList>
//     </Box>
//   );
// };

// export default HomeTabs;
"use client";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { AiFillHome } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Box } from "@mui/material";
import { resolveString } from "@/utils/resolveString";

interface Props {
  setValue: any;
  value: string;
}

const HomeTabs = (props: any) => {
  const { tabs, value, setValue } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
      style={{
        background: "#C0F8E0",
        flexDirection: "column",
        height: "72px",
        // position: "fixed",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TabList
        onChange={handleChange}
        sx={{
          "&.MuiTabs-root .MuiTabs-scroller": {
            zIndex: 33,
          },
          "&. MuiTabs-root  MuiTabs-scroller": {
            zIndex: 3333,
          },
          "& .MuiTabs-root": {
            zIndex: 3333,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#10458c",
            height: "3px",
            borderTopRightRadius: "12px",
            borderTopLeftRadius: "12px",
          },
          "& .MuiButtonBase-root": {
            color: "#10458c !important",
            textTransform: "unset",
          },
          "& .Mui-selected": {
            backgroundColor: "rgb(129, 242, 194, 35%)",
          },
        }}
        aria-label="lab API tabs example"
      >
        {tabs?.length
          ? tabs?.map((tab: any, idx: number) => (
              <Tab
                key={idx}
                icon={tab.icon}
                value={tab.value}
                label={resolveString(tab.label)}
              />
            ))
          : "No Tabs Provided"}
      </TabList>
    </Box>
  );
};

export default HomeTabs;
