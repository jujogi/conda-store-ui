import { createSlice } from "@reduxjs/toolkit";
import { Build } from "../../common/models";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IBuildState {
  enviroments: Build[];
  builds: any;
  page: number;
  count: number;
  size: number;
  currentBuild: { id: number } | null;
}

const initialState: IBuildState = {
  enviroments: [],
  builds: [],
  page: 1,
  count: 0,
  size: 0,
  currentBuild: null
};

export const enviromentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    addNewBuild: (state, action) => {
      state.builds.unshift(action.payload);
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviroments.matchFulfilled,
      (state, { payload: { data } }) => {
        state.enviroments.push(...data);
      }
    );
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviromentBuilds.matchFulfilled,
      (state, { payload: { data } }) => {
        state.builds = data;
      }
    );
  }
});

export const { addNewBuild } = enviromentsSlice.actions;
