import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
    user:null,
    isAuth:null,
    isLoading:false,
    error:null,
    showLogin:false,
}

const userAuthSlice = createSlice({
    name:"userAuth",
    initialState: initialUser,
    reducers:{
        loginSucess: (state,action) =>{
            // state.user=action.payload;
            state.isAuth=action.payload;
            state.isLoading=false;
            state.error=null;
        },
        loginRequest: (state) => {
            state.isLoading = true;
            state.error=null;
        },
        loginFail:(state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) =>{
            state.user = initialUser.user
            state.isAuth=initialUser.isAuth
            state.isLoading= initialUser.isLoading;
            state.error= initialUser.error;
        },
        showLogin: (state,action) =>{
            state.showLogin = action.payload;
        },
        userInfo: (state,action) =>{
            state.user = action.payload
        }
    }
});

export const {userInfo,loginSucess,loginRequest,loginFail,logout,showLogin}=userAuthSlice.actions;
export default userAuthSlice.reducer