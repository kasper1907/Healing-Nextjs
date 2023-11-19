import { Select, TextField, styled } from "@mui/material";

export const StyledSelect: any = styled(Select as any)({
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
    "& .MuiInputBase-root": {
      background: "#FFF",
      border: "none",
      borderRadius: "10px",
    },
  },
});
