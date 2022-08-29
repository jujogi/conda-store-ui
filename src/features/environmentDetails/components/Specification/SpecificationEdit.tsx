import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit, updateChannels } from "src/features/channels";
import { Dependencies, pageChanged } from "src/features/dependencies";
import {
  RequestedPackagesEdit,
  updatePackages
} from "src/features/requestedPackages";
import { BlockContainerEditMode } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { CodeEditor } from "src/features/yamlEditor";
import { useCreateOrUpdateMutation } from "../../environmentDetailsApiSlice";
import { stringify } from "yaml";

interface ISpecificationState {
  channels: string[];
  dependencies: any[];
}

export const SpecificationEdit = () => {
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { channels } = useAppSelector(state => state.channels);
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );
  const [show, setShow] = useState(false);
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const dispatch = useAppDispatch();
  const hasMore = size * page <= count;

  const yamlCode = stringify({
    channels,
    dependencies: requestedPackages
  });

  const onUpdateEnvironment = () => {
    const description = "Updated description";
    const name = selectedEnvironment?.name;
    const namespace = selectedEnvironment?.namespace.name;

    const environmentInfo = {
      specification: `${yamlCode}\ndescription: ${description}\nname: ${name}\nprefix: null`,
      namespace
    };
    createOrUpdate(environmentInfo);
  };

  const onUpdateEditor = ({
    channels: newChannels,
    dependencies: newPackages
  }: ISpecificationState) => {
    if (JSON.stringify(newChannels) !== JSON.stringify(channels)) {
      dispatch(updateChannels(newChannels));
    }
    if (JSON.stringify(newPackages) !== JSON.stringify(requestedPackages)) {
      dispatch(updatePackages(newPackages));
    }
  };

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={setShow}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor code={yamlCode} onChangeEditor={onUpdateEditor} />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit packageList={requestedPackages} />
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Dependencies
                mode="edit"
                dependencies={dependencies}
                hasMore={hasMore}
                next={() => dispatch(pageChanged(page + 1))}
              />
            </Box>
            <Box sx={{ margiBottom: "30px" }}>
              <ChannelsEdit channelsList={channels} />
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "10px"
          }}
        >
          <StyledButtonPrimary
            sx={{ padding: "5px 60px" }}
            onClick={onUpdateEnvironment}
          >
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
