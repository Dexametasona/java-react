import { createSlice } from "@reduxjs/toolkit";

const initialTags = {
    tags: [],
    isSuccessTags: false,
    isLoadingTags: false,
    errorTags: null,
  };
  
  const tagsSlice = createSlice({
    name: "tags",
    initialState: initialTags,
    reducers: {
      tagsRequest: (state) => {
        state.isLoadingTags = true;
        state.errorTags = null;
      },
      fillTags: (state, action) => {
        state.tags = action.payload;
        state.isLoadingTags = false;
        state.errorTags = null;
      },
      tagsFail: (state, action) => {
        state.isLoadingTags = false;
        state.errorTags = action.payload;
      },
      resetSuccess: (state) => {
        state.isSuccessTags = false;
      },
    },
  });
  
  export const { tagsRequest, fillTags, tagsFail, resetSuccess } =
    tagsSlice.actions;
  
  export default tagsSlice.reducer;
  