import { createSlice } from "@reduxjs/toolkit";

const initialStacks = {
  stacks: [],
  isSuccessStacks: false,
  isLoadingStacks: false,
  errorStacks: null,
};

const stacksSlice = createSlice({
  name: "stacks",
  initialState: initialStacks,
  reducers: {
    stacksRequest: (state) => {
      state.isLoadingStacks = true;
      state.errorStacks = null;
    },
    fillStacks: (state, action) => {
      state.stacks = action.payload;
      state.isLoadingStacks = false;
      state.errorStacks = null;
    },
    stacksFail: (state, action) => {
      state.isLoadingStacks = false;
      state.errorStacks = action.payload;
    },
    resetSuccess: (state) => {
      state.isSuccessStacks = false;
    },
  },
});

export const { stacksRequest, fillStacks, stacksFail, resetSuccess } =
  stacksSlice.actions;

export default stacksSlice.reducer;
