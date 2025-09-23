import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    loading : false,
    error : "",
}
const baseUrl = "https://fakestoreapi.com";

const LoginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{

    }
})