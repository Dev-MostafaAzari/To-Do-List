import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading : false,
    addTask : false,
    TodoList : [{Title:"Say Hello to the World",DeadLine:"3",Status:"inProgress",id:Math.floor(Math.random()*10000000)}],

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
        },
        DeleteTodo:(state,action)=>{
            state.TodoList.splice(state.TodoList.findIndex(item => item.id === action.payload),1);  //ebteda ba findIndex , index {} ro dar array peda mikonim va ba splice delete mikonim
        }
    },
});


export default ManualSlice.reducer;
export const {AddTodo,AddTask,DeleteTodo} = ManualSlice.actions;