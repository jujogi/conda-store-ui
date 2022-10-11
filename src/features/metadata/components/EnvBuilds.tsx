import React, { useState } from "react";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { useAppSelector } from "../../../hooks";

export const EnvBuilds = () => {
  const { palette } = useTheme();
  const { builds } = useAppSelector(state => state.enviroments);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const options = buildMapper(builds, selectedEnvironment?.current_build_id);
  const [currentBuild, setCurrentBuild] = useState(options[0]?.name ?? "");
  const [status, setStatus] = useState(options[0]?.status ?? "");
  const [open, setOpen] = useState(false);

  return (
    <>
      {!!options.length && (
        <>
          <StyledMetadataItem>
            <b>Build</b>
          </StyledMetadataItem>
          <Select
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            sx={{ marginLeft: "13px" }}
            value={currentBuild}
            IconComponent={() => (
              <IconButton
                sx={{ padding: "0px" }}
                onClick={() => setOpen(currState => !currState)}
              >
                <ArrowDropDownIcon
                  sx={{
                    height: "37px",
                    borderLeft: `1px solid  ${palette.primary.main}`
                  }}
                />
              </IconButton>
            )}
            inputProps={{
              "data-testid": "test-select",
              sx: {
                padding: "7px 9px !important",
                minWidth: "320px"
              }
            }}
            onChange={e => {
              const build = options.find(
                (build: { name: string }) => build.name === e.target.value
              );
              console.log(build);
              if (build) {
                setCurrentBuild(build.name);
                setStatus(build.status);
              }
            }}
          >
            {options.map((build: any) => (
              <MenuItem key={build.id} value={build.name}>
                {build.name}
              </MenuItem>
            ))}
          </Select>
          <StyledMetadataItem>
            <b>Status:</b> {status}
          </StyledMetadataItem>
        </>
      )}
    </>
  );
};
