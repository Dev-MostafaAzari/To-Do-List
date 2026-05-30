import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import ManualTodoReducer from "../features/TodoManual/todoManualSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        register : registerReducer,
        login : loginReducer,
        manualTodo : ManualTodoReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})




export default store;