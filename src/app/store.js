import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import todoListReducer from "../features/TodoList/todolistSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        register : registerReducer,
        login : loginReducer,
        todoList : todoListReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})


export default store;