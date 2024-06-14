import axios from "axios"
import { addRequest, chargingRequest, deleteRequest, fillIncommingRequests, fillRequests, fillRoles, processingRequest, requestsFail, requestsRequest } from "./requestsSlice"
import endpoints from "../../services/endpoints"

export const actionGetRoles = () => {
    return async (dispatch) => {
        dispatch(requestsRequest())
        try {
            const {data} = await axios.get(endpoints.getRoles)
            dispatch(fillRoles(data.filter(role => role.role !== "OWNER")))
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

  export const actionFillIncommingRequests= (userId,config) => {
    return async (dispatch) => {
      dispatch(requestsRequest());
      try {
        const { data } = await axios.get(endpoints.getRequestFromUser(userId),config);
        dispatch(fillIncommingRequests(data));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };

  export const actionAcceptRequests= (idRequest,config) => {
    return async (dispatch) => {
      dispatch(chargingRequest());
      try {
        const { data } = await axios.get(endpoints.acceptRequest(idRequest),config);
        dispatch(processingRequest(idRequest));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };

  export const actionRejectRequests= (idRequest,config) => {
    return async (dispatch) => {
      dispatch(chargingRequest());
      try {
        const { data } = await axios.get(endpoints.rejectRequest(idRequest),config);
        dispatch(processingRequest(idRequest));
      } catch (error) {
        console.error(error);
        dispatch(requestsFail());
      }
    };
  };
