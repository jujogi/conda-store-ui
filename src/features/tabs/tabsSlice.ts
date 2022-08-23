import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "src/common/models";

export interface ITabsState {
  selectedEnvironments: Environment[];
  selectedEnvironment: Environment | null;
  value: number | string;
  createEnvironment: boolean;
}

const initialState: ITabsState = {
  selectedEnvironments: [],
  selectedEnvironment: null,
  value: 0,
  createEnvironment: false
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    environmentOpened: (
      state,
      action: PayloadAction<{
        environment: Environment;
        selectedEnvironmentId: number | undefined;
      }>
    ) => {
      const environments = state.selectedEnvironments;
      const openedEnvironment = action.payload.environment;

      state.selectedEnvironment = openedEnvironment;
      state.value = openedEnvironment.id;

      if (!environments.some(env => env.id === openedEnvironment.id)) {
        state.selectedEnvironments.push(openedEnvironment);
      }
    },
    environmentClosed: (
      state,
      action: PayloadAction<{ envId: number; selectedEnvironmentId: number }>
    ) => {
      const closedEnvironmentId = action.payload.envId;
      const index = state.selectedEnvironments.findIndex(
        env => env.id === closedEnvironmentId
      );
      const listLength = state.selectedEnvironments.length;
      const createEnvironmentTab = state.createEnvironment;

      if (action.payload.selectedEnvironmentId === closedEnvironmentId) {
        if (listLength > 1) {
          const rightItem = state.selectedEnvironments[index + 1];
          const leftItem = state.selectedEnvironments[index - 1];

          state.selectedEnvironment = rightItem ?? leftItem;
          state.value = state.selectedEnvironment.id;
        } else if (createEnvironmentTab && listLength === 1) {
          state.value = "create";
          state.selectedEnvironment = null;
        } else {
          state.selectedEnvironment = null;
          state.value = 0;
        }
      }

      state.selectedEnvironments = state.selectedEnvironments.filter(
        env => env.id !== closedEnvironmentId
      );
    },
    tabChanged: (state, action: PayloadAction<number>) => {
      const tabValue = action.payload;

      const environment = state.selectedEnvironments.find(
        env => env.id === tabValue
      );

      state.value = tabValue;

      if (environment) {
        state.selectedEnvironment = environment;
      }
    },
    newEnvironmentCreate: state => {
      state.createEnvironment = true;
      state.value = "create";
    },
    newEnvironmentClose: state => {
      const listLength = state.selectedEnvironments.length;
      state.createEnvironment = false;

      if (!listLength) {
        state.value = initialState.value;
        return;
      }

      state.value = state.selectedEnvironments[listLength - 1].id;
    }
  }
});

export const {
  environmentOpened,
  environmentClosed,
  tabChanged,
  newEnvironmentCreate,
  newEnvironmentClose
} = tabsSlice.actions;
