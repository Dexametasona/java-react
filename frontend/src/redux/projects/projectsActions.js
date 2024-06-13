import endpoints from "../../services/endpoints";
import { addPositions, addProjects, detailsProject, fillPopular, fillPositions, fillProjects, fillUserProjects, fillUserRequest, projectsFail, projectsRequest } from "./projectSlice";
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

export const actionGetFilteredProjects = (filter) =>{
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getProjectFilter(filter));
      dispatch(fillProjects({
        content: data
      }));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
}

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

export const actionGetRequestUser= (config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getRequestByUser,config);
      dispatch(fillUserRequest(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionCreatePosition= (newPosition,config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.post(endpoints.postPosition,newPosition,config);
      dispatch(addPositions(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

export const actionGetPositionProject= (idProject,config) => {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const { data } = await axios.get(endpoints.getRequestByProject(idProject),config);
      dispatch(fillPositions(data));
    } catch (error) {
      console.error(error);
      dispatch(projectsFail());
    }
  };
};

