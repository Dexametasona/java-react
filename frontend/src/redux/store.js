import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userAuth/userAuthSlice'
import projectsReducer from './projects/projectSlice'

const store = configureStore({
    reducer: {
        userAuth:userAuthReducer,
        projects: projectsReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

export default store;