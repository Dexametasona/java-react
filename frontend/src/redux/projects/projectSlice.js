import { createSlice } from "@reduxjs/toolkit";

const initialProjects = {
  projects: [],
  userProjects:[],
  userRequests:[],
  popular:[],
  detailsProject:null,
  isSuccessProjects: false,
  isLoadingProjects: false,
  errorProjects: null,
  showForm: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjects,
  reducers: {
    projectsRequest: (state) => {
      state.isLoadingProjects = true;
      state.errorProjects = null;
    },
    fillProjects: (state, action) => {
      state.projects = action.payload;
      state.isLoadingProjects = false;
      state.errorProjects = null;
    },
    projectsFail: (state, action) => {
      state.isLoadingProjects = false;
      state.errorProjects = action.payload;
    },
    addProjects: (state, action) => {
      state.projects.push(action.payload);
      state.isLoadingProjects = false;
      state.isSuccessProjects = true;
    },
    updateProjects: (state, action) => {
      state.projects = state.projects.map((item) =>
        action.payload.id == item.id ? { ...item, ...action.payload } : item
      );
      state.isLoadingProjects = false;
    },
    deleteProjects: (state, action) => {
      state.isLoadingProjects = false;
      state.projects = state.projects.filter(
        (item) => item.id != action.payload
      );
    },
    showFormProjects: (state, action) => {
      state.showForm = action.payload;
    },
    resetSuccess:(state) => {
      state.isSuccessProjects = false;
    },
    fillPopular: (state, action) => {
      state.popular = action.payload;
      state.isLoadingProjects = false;
      state.errorProjects = null;
    },
    fillUserProjects: (state, action) => {
      state.userProjects = action.payload;
      state.isLoadingProjects = false;
      state.errorProjects = null;
    },  
    detailsProject: (state, action) => {
      state.detailsProject = action.payload;
      state.isLoadingProjects = false;
      state.errorProjects = null;
    },  
    fillUserRequest: (state, action) => {
      state.userRequests = action.payload;
      state.isLoadingProjects = false;
      state.errorProjects = null;
    },  
  },
});

export const {
  fillUserRequest,
  detailsProject,
  fillUserProjects,
  fillPopular,
  resetSuccess,
  showFormProjects,
  projectsFail,
  projectsRequest,
  fillProjects,
  addProjects,
  updateProjects,
  deleteProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
