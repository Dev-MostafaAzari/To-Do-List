import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    loading:false,
    todo:[],
    addTodo:"",
    completed:false,
    addUserId:0,
    error : "",
    addTask:false,
};

const BaseUrl="https://dummyjson.com/" ;

const axiosGetTodo = createAsyncThunk("TodoList/axiosGetTodo",async()=>{
    const response = await axios.get(`${BaseUrl}todos?limit=7`);
    return response.data;
});

const axiosAddTask = createAsyncThunk("TodoList/axiosAddTask",async(data)=>{
    const response = await axios.post(`${BaseUrl}todos/add`,{todo:data.addTodo , completed:data.completed , userId:data.addUserId});
    return response;
});


const TodoSlice = createSlice({
    name:"TodoList",
    initialState,
    reducers:{
        getTodo:(state,action)=>{
            state.addTodo = action.payload ;
        },
        getUserID : (state,action)=>{
            state.addUserId = action.payload;
        },
        IsAddTask:(state)=>{
            state.addTask = !state.addTask;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(axiosGetTodo.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(axiosGetTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.todo = action.payload;
        });
        builder.addCase(axiosGetTodo.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        }); 
        builder.addCase(axiosAddTask.fulfilled,(state)=>{
            state.addTask = false;
        });
    }
});



export default TodoSlice.reducer;
export {axiosGetTodo,axiosAddTask};
export const {getTodo,getUserID,IsAddTask} = TodoSlice.actions;

