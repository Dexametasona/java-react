import endpoints from "../../services/endpoints";
import { addProjects, detailsProject, fillPopular, fillProjects, fillUserProjects, projectsFail, projectsRequest } from "./projectSlice";
import axios from "axios";

export const actionGetProjects = (page = 0, size = 9, sort = 'id', direction = 'asc') => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getAllProjects, {
        params: {
          page,
          size,
          sort,
          direction,
        },
      });
      dispatch(fillProjects(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionCreateProject = (newProject,config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.post(endpoints.getAllProjects,newProject,config);
      dispatch(addProjects(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionGetPopularProjects = (page = 0, size = 5, sort = 'rating', direction = 'asc') => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getAllProjects, {
        params: {
          page,
          size,
          sort,
          direction,
        },
      });
      dispatch(fillPopular(data.content));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionGetUserProject = (email,config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.post(endpoints.getUserProjects,{email:email},config);
      dispatch(fillUserProjects(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionDetailsProject = (idProject,config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getProjectsById(idProject),config);
      dispatch(detailsProject(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};