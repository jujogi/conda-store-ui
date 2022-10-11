import { format } from "date-fns";
import { IApiResponse } from "../../common/interfaces";
import { Build } from "../../common/models";

const STATUS_OPTIONS: any = {
  COMPLETED: "Available",
  QUEUED: "Building",
  FAILED: "Failed",
  BUILDING: "Building"
};

const isBuilding = (status: string) => {
  const BUILD_STATUS = ["BUILDING", "QUEUED"];
  return BUILD_STATUS.includes(status);
};

export const buildMapper = (
  { data }: IApiResponse<Build[]>,
  currentBuildId: number
) => {
  return data.map(({ id, status, ended_on, scheduled_on }: Build) => {
    const dateDetails = isBuilding(status) ? scheduled_on : ended_on;
    const date = format(new Date(dateDetails), "MMMM do, yyyy - h:mm");

    if (isBuilding(status)) {
      return {
        id,
        name: `${date} - Building`,
        status: STATUS_OPTIONS[status]
      };
    }

    if (id === currentBuildId) {
      return {
        id,
        name: `${date} - Active`,
        status: "Completed"
      };
    }

    return {
      id,
      name: `${date} - ${STATUS_OPTIONS[status]}`,
      status: "Completed"
    };
  });
};
