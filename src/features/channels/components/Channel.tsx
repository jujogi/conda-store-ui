import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

interface IChannelProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  channelName: string;
}

export const Channel = ({ channelName }: IChannelProps) => {
  const { palette } = useTheme();

  return (
    <Box className="box" sx={{ display: "flex", alignItems: "center" }}>
      <SquareIcon
        sx={{
          color: palette.primary.main,
          width: 10,
          height: 10,
          marginRight: "12px"
        }}
      />
      <Typography className="typography" sx={{ color: "#4D4D4D" }}>
        {channelName}
      </Typography>
    </Box>
  );
};
