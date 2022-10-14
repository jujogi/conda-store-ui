import React, { useEffect, useState } from "react";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { useAppSelector } from "../../../hooks";

export const EnvBuilds = ({ updateBuildsList }: any) => {
  const { palette } = useTheme();
  const { builds } = useAppSelector(state => state.enviroments);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const options = buildMapper(builds, selectedEnvironment?.current_build_id);
  const [currentBuild, setCurrentBuild] = useState("");
  const [status, setStatus] = useState(options[0]?.status ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (options.length) {
      const initialBuildName = options[0].name;
      const initialBuildStatus = options[0].status;

      if (currentBuild === "") {
        setCurrentBuild(initialBuildName);
        setStatus(initialBuildStatus);
      }

      if (initialBuildName !== currentBuild) {
        const buildIsAvailable = !!getBuild(currentBuild);
        if (buildIsAvailable) {
          setCurrentBuild(currentBuild);
          setStatus(status);
        } else {
          setCurrentBuild(initialBuildName);
          setStatus(initialBuildStatus);
        }
      }
    }
  }, [options]);

  useEffect(() => {
    if (updateBuildsList) {
      const newBuildName = options[0].name;
      const newBuildStatus = options[0].status;
      setCurrentBuild(newBuildName);
      setStatus(newBuildStatus);
    }
  }, [updateBuildsList]);

  const getBuild = (name: string) => {
    return options.find((build: { name: string }) => build.name === name);
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    const build = getBuild(e.target.value);
    if (build) {
      setCurrentBuild(build.name);
      setStatus(build.status);
    }
  };

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
            onChange={handleChange}
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
