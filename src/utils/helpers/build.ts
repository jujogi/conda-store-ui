export const mockBuild = (selectedEnvironmentId: number, buildId: number) => {
  return {
    build_artifacts: null,
    ended_on: null,
    environment_id: selectedEnvironmentId,
    id: buildId,
    packages: null,
    scheduled_on: Date.now(),
    size: 244841417,
    specification: null,
    started_on: Date.now(),
    status: "BUILDING"
  };
};
