import { Tooltip } from "@mui/material";

export const checkLength = (text: string, length: number) => {
  if (text.length > length) {
    return (
      <Tooltip title={text}>
        <span>{text.slice(0, length) + "..."}</span>
      </Tooltip>
    );
  }
  return text;
};
