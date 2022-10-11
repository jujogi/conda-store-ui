import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { stringify } from "yaml";

import {
  EnvironmentDetailsHeader,
  modeChanged,
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation
} from "../../../features/environmentDetails";
import { EnvMetadata } from "../../../features/metadata";
import {
  environmentOpened,
  closeCreateNewEnvironmentTab
} from "../../../features/tabs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SpecificationCreate, SpecificationReadOnly } from "./Specification";

export interface IEnvCreate {
  environmentNotification: (notification: any) => void;
}
export const EnvironmentCreate = ({ environmentNotification }: IEnvCreate) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [createOrUpdate] = useCreateOrUpdateMutation();

  const createEnvironment = async (code: any) => {
    const namespace = newEnvironment?.namespace;
    const environmentInfo = {
      namespace,
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`
    };

    try {
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      const environment = {
        name,
        current_build: null,
        current_build_id: data.build_id,
        description,
        id: data.build_id,
        namespace: {
          id: data.build_id,
          name: namespace
        }
      };

      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      dispatch(closeCreateNewEnvironmentTab());
      dispatch(
        environmentOpened({
          environment,
          selectedEnvironmentId: data.build_id
        })
      );
      environmentNotification({
        show: true,
        description: `${name} environment is being created`
      });
    } catch ({ data }) {
      setError({
        message: data.message,
        visible: true
      });
    }
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader envName={name} onUpdateName={setName} />
      {error.visible && (
        <Alert
          severity="error"
          sx={{
            mb: "20px"
          }}
        >
          {error.message}
        </Alert>
      )}
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata
          mode={mode}
          description={description}
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "create" && (
          <SpecificationCreate onCreateEnvironment={createEnvironment} />
        )}
      </Box>
    </Box>
  );
};
