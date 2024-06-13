import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userAuth/userAuthSlice'
import projectsReducer from './projects/projectSlice'
import stacksReducer from './stacks/stacksSlice'
import tagsReducer from "./tags/tagsSlice";
import requestsReducer from "./request/requestsSlice";

const store = configureStore({
    reducer: {
        userAuth:userAuthReducer,
        projects: projectsReducer,
        stacks: stacksReducer,
        tags:tagsReducer,
        requests:requestsReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

export default store;