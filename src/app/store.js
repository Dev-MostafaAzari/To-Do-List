import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        register : registerReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})


export default store;