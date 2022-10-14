export const mockBuild = (selectedEnvironmentId: number, buildId: number) => {
  const currentDate = new Date(Date.now());
  return {
    build_artifacts: null,
    ended_on: null,
    environment_id: selectedEnvironmentId,
    id: buildId,
    packages: null,
    scheduled_on: currentDate,
    size: 244841417,
    specification: null,
    started_on: currentDate,
    status: "QUEUED"
  };
};
