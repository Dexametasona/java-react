import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './userAuth/userAuthSlice'
import projectsReducer from './projects/projectSlice'
import stacksReducer from './stacks/stacksSlice'
import tagsReducer from "./tags/tagsSlice";

const store = configureStore({
    reducer: {
        userAuth:userAuthReducer,
        projects: projectsReducer,
        stacks: stacksReducer,
        tags:tagsReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

export default store;