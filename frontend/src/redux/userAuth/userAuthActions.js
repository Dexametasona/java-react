import endpoints from "../../services/endpoints";
import axios from "axios";
import { loginFail, loginRequest, loginSucess, userToken } from "./userAuthSlice";

const actionUserInfo = async (email,config) => {

    try {
      const {data} = await axios.post(endpoints.getUser,email,config);
      return data

    } catch (error) {
      console.error(error);
      return null
    }

};

export const actionLogin = (values) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const {data} = await axios.post(endpoints.login,values);
      const config = {
        headers: { Authorization: `Bearer ${data.token}` }
      };
      dispatch(userToken(data.token))
      const response = await actionUserInfo({email:values.email},config);
      if (response != null){
        dispatch(loginSucess(response))
      }
      else{
        dispatch(loginFail("no hay respuesta de los datos de usuario "))
      }

    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};