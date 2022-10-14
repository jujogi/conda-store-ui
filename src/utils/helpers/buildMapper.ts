import { format } from "date-fns";
import { Build } from "../../common/models";

const STATUS_OPTIONS: any = {
  COMPLETED: "Available",
  QUEUED: "Queued",
  FAILED: "Failed",
  BUILDING: "Building"
};

const isBuilding = (status: string) => {
  const BUILD_STATUS = ["BUILDING"];
  return BUILD_STATUS.includes(status);
};

const isQueued = (status: string) => {
  const BUILD_STATUS = ["QUEUED"];
  return BUILD_STATUS.includes(status);
};

export const buildMapper = (
  data: Build[],
  currentBuildId: number | undefined
) => {
  return data.map(({ id, status, ended_on, scheduled_on }: Build) => {
    const dateDetails = isBuilding(status) ? scheduled_on : ended_on;
    const date = format(new Date(dateDetails), "MMMM do, yyyy - h:mm a");

    if (isBuilding(status)) {
      return {
        id,
        name: `${date} - Building`,
        status: STATUS_OPTIONS[status]
      };
    }

    if (isQueued(status)) {
      return {
        id,
        name: `${date} - Queued`
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
