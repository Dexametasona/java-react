import { createSlice } from "@reduxjs/toolkit";

const initialRequests = {
  requests: [],
  roles:[],
  isSuccessRequests: false,
  isLoadingRequests: false,
  errorRequests: null,
};

const requestsSlice = createSlice({
  name: "requests",
  initialState: initialRequests,
  reducers: {
    requestsRequest: (state) => {
      state.isLoadingRequests = true;
      state.errorRequests = null;
    },
    fillRequests: (state, action) => {
      state.requests = action.payload;
      state.isLoadingRequests = false;
      state.errorRequests = null;
    },
    addRequest: (state, action) => {
      state.requests = action.payload;
      state.isLoadingRequests = false;
      state.isSuccessRequests = true;
    },
    fillRoles: (state, action) => {
      state.roles = action.payload;
      state.isLoadingRequests = false;
      state.errorRequests = null;
    },
    requestsFail: (state, action) => {
      state.isLoadingRequests = false;
      state.errorRequests = action.payload;
    },
    resetSuccessRequests: (state) => {
      state.isSuccessRequests = false;
    },
  },
});

export const { addRequest, fillRoles,requestsRequest, fillRequests, requestsFail, resetSuccessRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
