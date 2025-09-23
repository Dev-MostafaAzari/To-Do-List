import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        register : registerReducer,
        login : loginReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})


export default store;