import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        login : loginReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})


export default store;