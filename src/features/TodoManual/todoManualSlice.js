import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading : false,
    addTask : false,
    TodoList : [{Title:"Say Hello to the World",DeadLine:"3",Status:"inProgress"}],

};


const ManualSlice = createSlice({
    name:"ManualTodo",
    initialState,
    reducers:{
        AddTodo:(state,action)=>{
            state.TodoList.push(action.payload);
        },
        AddTask:(state)=>{
            state.addTask = !state.addTask;
        }
    },
});


export default ManualSlice.reducer;
export const {AddTodo,AddTask} = ManualSlice.actions;