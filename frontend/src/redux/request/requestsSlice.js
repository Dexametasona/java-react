import { createSlice } from "@reduxjs/toolkit";

const initialRequests = {
  requests: [],
  incommingRequest:[],
  roles:[],
  isSuccessRequests: false,
  ismanagedRequests: false,
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
    fillIncommingRequests: (state, action) => {
      state.incommingRequest = action.payload;
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
    resetManagedRequests: (state) => {
      state.ismanagedRequests = false;
    },
    deleteRequest: (state, action) => {
      state.isLoadingRequests = false;
      state.requests = state.requests.filter(
        (item) => item.id != action.payload
      );
      state.isSuccessRequests = true;
    },
    processingRequest: (state, action) => {
      state.isLoadingRequests = false;
      state.incommingRequest = state.incommingRequest.filter(
        (item) => item.id != action.payload
      );
      state.ismanagedRequests=true;
    },
  },
});

export const { resetManagedRequests,processingRequest,fillIncommingRequests,deleteRequest,addRequest, fillRoles,requestsRequest, fillRequests, requestsFail, resetSuccessRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
