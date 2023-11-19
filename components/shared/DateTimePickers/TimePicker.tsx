import { styled } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";

export const StyledTimePicker: any = styled(MobileTimePicker as any)({
  "& .MuiSvgIcon-root": {
    zIndex: 22,
  },
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& label.Mui-focused": {
    color: "#10458c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      backgroundColor: "#FFF !important",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "100%",
    },
    "&:hover fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#10458c",
      color: "#10458c !important",
    },
    "& .MuiInputBase-input": {
      zIndex: 22,
    },
  },
});
