import React from "react";
import Box from "@mui/material/Box";
import { Environments } from "src/features/environments";
import { Typography } from "@mui/material";
import { PageTabs } from "src/features/tabs";
import { useAppSelector } from "src/hooks";
import {
  EnvironmentDetails,
  EnvironmentDetailsModes
} from "src/features/environmentDetails";
import { EnvironmentCreate } from "src/features/EnvironmentCreate";

export const PageLayout = () => {
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const { mode } = useAppSelector(state => state.environmentDetails);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Environments />
      <Box sx={{ borderTop: "1px solid #A7A7A7", width: "100%" }}>
        {!selectedEnvironment && mode !== EnvironmentDetailsModes.CREATE && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#000",
                marginBottom: "100px"
              }}
            >
              Select an environment to show details
            </Typography>
          </Box>
        )}
        {selectedEnvironment && mode !== EnvironmentDetailsModes.CREATE && (
          <>
            <PageTabs />
            <Box
              sx={{
                border: "1px solid #000",
                width: "100%",
                marginTop: "-1px"
              }}
            >
              <EnvironmentDetails />
            </Box>
          </>
        )}
        {mode === EnvironmentDetailsModes.CREATE && (
          <>
            <PageTabs />
            <Box
              sx={{
                border: "1px solid #000",
                width: "100%",
                marginTop: "-1px"
              }}
            >
              <EnvironmentCreate />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
