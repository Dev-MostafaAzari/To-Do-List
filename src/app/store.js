import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import todoListReducer from "../features/TodoList/todolistSlice";
import ManualTodoReducer from "../features/TodoManual/todoManualSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer:{
        register : registerReducer,
        login : loginReducer,
        todoList : todoListReducer,
        manualTodo : ManualTodoReducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})
// create LocalStorage 
store.subscribe(()=>{
    const {TodoList , CompletedTasks} = store.getState().manualTodo;    // selecting items we want to save
    localStorage.setItem("Todos",JSON.stringify({TodoList , CompletedTasks}));
})



export default store;