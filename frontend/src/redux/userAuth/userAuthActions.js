import endpoints from "../../services/endpoints";
import axios from "axios";
import { loginFail, loginRequest, loginSucess, userInfo } from "./userAuthSlice";

export const actionLogin = (values) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const {data} = await axios.post(endpoints.login,values);
      dispatch(loginSucess(data))

    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};
export const actionUserInfo = (email,config) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const {data} = await axios.post(endpoints.getUser,email,config);
      dispatch(userInfo(data))

    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};
