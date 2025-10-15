import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading:false,
    todo:[],
    addTodo:"",
    completed:false,
    addUserId:null,
    error : "",
};

const BaseUrl="https://dummyjson.com/" ;

const axiosGetTodo = createAsyncThunk("TodoList/axiosGetTodo",async()=>{
    const response = await axios.get(`${BaseUrl}todos?limit=7`);
    return response.data;
});


const TodoSlice = createSlice({
    name:"TodoList",
    initialState,
    reducers:{
        getTodo:(state,action)=>{
            state.addTodo = action.payload ;
        },
        getUserID : (state,action)=>{
            state.addUserId = state.payload;
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
    }
});



export default TodoSlice.reducer;
export {axiosGetTodo};
export const {getTodo,getUserID} = TodoSlice.actions;

