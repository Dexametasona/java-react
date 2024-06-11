import endpoints from "../../services/endpoints";
import { addProjects, fillProjects, projectsFail, projectsRequest } from "./projectSlice";
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
