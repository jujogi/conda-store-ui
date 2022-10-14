import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

import { EnvBuilds, Description } from "../../../features/metadata/components";
import { StyledBox } from "../../../styles";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}
interface IEnvMetadataProps {
  /**
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   * @param description Selected environment's description
   * * @param envIsUpdated notifies when env is updated in order to select the new build in the dropdown
   * @param onUpdateDescription change environment description
   */
  description?: any;
  mode: "create" | "read-only" | "edit";
  envIsUpdated?: boolean;
  onUpdateDescription: (description: string) => void;
}

export const EnvMetadata = ({
  description = "",
  mode,
  envIsUpdated,
  onUpdateDescription
}: IEnvMetadataProps) => {
  const { palette } = useTheme();
  return (
    <StyledBox>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "21px", fontWeight: 400 }}>
                Environment Metadata
              </Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider sx={{ bgcolor: palette.primary.main }} />
      </List>
      <Description
        mode={mode}
        description={description || undefined}
        onChangeDescription={onUpdateDescription}
      />
      {mode !== EnvironmentDetailsModes.CREATE && (
        <EnvBuilds updateBuildsList={envIsUpdated} />
      )}
    </StyledBox>
  );
};
