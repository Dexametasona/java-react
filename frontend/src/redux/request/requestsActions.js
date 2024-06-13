import axios from "axios"
import { addRequest, deleteRequest, fillRequests, fillRoles, requestsFail, requestsRequest } from "./requestsSlice"
import endpoints from "../../services/endpoints"

export const actionGetRoles = () => {
    return async (dispatch) => {
        dispatch(requestsRequest())
        try {
            const {data} = await axios.get(endpoints.getRoles)
            dispatch(fillRoles(data))
        } catch (error) {
            console.error(error);
            dispatch(requestsFail(error.message))
        }
    }
}

export const actionFillRequestUser= (config) => {
    return async (dispatch) => {
      dispatch(requestsRequest());
      try {
        const { data } = await axios.get(endpoints.getRequestByUser,config);
        dispatch(fillRequests(data));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };
export const actionCreateRequest= (newRequest,config) => {
    return async (dispatch) => {
      dispatch(requestsRequest());
      try {
        const { data } = await axios.post(endpoints.postRequest,newRequest,config);
        dispatch(addRequest(data));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };

export const actionCancelRequest= (idRequest,config) => {
    return async (dispatch) => {
      dispatch(requestsRequest());
      try {
        const { data } = await axios.delete(endpoints.cancelRequest(idRequest),config);
        dispatch(deleteRequest(idRequest));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };
