import React, { useEffect, useState } from "react";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build } from "../../../features/metadata/components";
import { IApiResponse } from "../../../common/interfaces";
import { Build as IBuild } from "../../../common/models";
import { buildMapper } from "../../../utils/helpers/buildMapper";

interface IData {
  data: IApiResponse<IBuild[]>;
  currentBuildId: number;
}

export const EnvBuilds = ({ data, currentBuildId }: IData) => {
  const { data: envData = [] } = data;
  const builds = envData.length ? buildMapper(data, currentBuildId) : [];
  const [status, setStatus] = useState("");

  const selectedBuild = (build: any) => {
    setStatus(build.status);
  };

  useEffect(() => {
    if (builds.length) {
      setStatus(builds[0].status);
    }
  }, [builds]);

  return (
    <>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      {!!builds.length && (
        <>
          <Build builds={builds} onChangeDropdown={selectedBuild} />
          <StyledMetadataItem>
            <b>Status:</b> {status}
          </StyledMetadataItem>
        </>
      )}
    </>
  );
};
