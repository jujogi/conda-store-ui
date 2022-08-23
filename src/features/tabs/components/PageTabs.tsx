import React from "react";
import { StyledTab } from "src/styles";
import { StyledTabs } from "src/styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  environmentClosed,
  tabChanged,
  newEnvironmentClose
} from "../tabsSlice";
import {
  modeChanged,
  EnvironmentDetailsModes
} from "src/features/environmentDetails";

export const PageTabs = () => {
  const {
    selectedEnvironments,
    value,
    selectedEnvironment,
    createEnvironment
  } = useAppSelector(state => state.tabs);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (typeof newValue === "number") {
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
    } else {
      dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    }
    dispatch(tabChanged(newValue));
  };

  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    envId: number
  ) => {
    e.stopPropagation();

    if (selectedEnvironment) {
      dispatch(
        environmentClosed({
          envId,
          selectedEnvironmentId: selectedEnvironment.id
        })
      );
      if (createEnvironment) {
        dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
      }
    }
  };

  const handleCloseNewEnvironment = () => {
    dispatch(newEnvironmentClose());
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
  };

  return (
    <StyledTabs
      TabIndicatorProps={{
        style: {
          display: "none"
        }
      }}
      value={value}
      onChange={handleChange}
      variant="fullWidth"
    >
      {selectedEnvironments.map(env => (
        <StyledTab
          key={env.id}
          label={env.name}
          value={env.id}
          wrapped
          icon={
            <span
              style={{ marginTop: "5px" }}
              role="button"
              onClick={e => handleClick(e, env.id)}
            >
              <CloseIcon sx={{ color: "#000" }} />
            </span>
          }
          iconPosition="end"
        />
      ))}
      {createEnvironment && (
        <StyledTab
          key="create"
          label="New Environment"
          value="create"
          wrapped
          icon={
            <span
              style={{ marginTop: "5px" }}
              role="button"
              onClick={e => handleCloseNewEnvironment()}
            >
              <CloseIcon sx={{ color: "#000" }} />
            </span>
          }
          iconPosition="end"
        />
      )}
    </StyledTabs>
  );
};
