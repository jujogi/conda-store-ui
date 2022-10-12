import { createSlice } from "@reduxjs/toolkit";
import { Build } from "../../common/models";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IBuildState {
  enviroments: Build[];
  builds: any;
  page: number;
  count: number;
  size: number;
}

const initialState: IBuildState = {
  enviroments: [],
  builds: [],
  page: 1,
  count: 0,
  size: 0
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
        console.log(data);
      }
    );
  }
});

export const { addNewBuild } = enviromentsSlice.actions;
