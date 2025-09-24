import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    username : "",
    password : "",
    loading : false,
    error : "",
}

const baseUrl = "https://dummyjson.com";

const axiosLogin = createAsyncThunk("login/axiosLogin",async(userdata)=>{  //userdata hammon vorodi state hast ke be tabe axiosLogin dade shod
    const response = await axios.post(`${baseUrl}/auth/login`, {username : userdata.username , password : userdata.password});
    return response;
})

const LoginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        getUsername : (state,action)=>{
            state.username = action.payload;
        },
        getPassword : (state,action)=>{
            state.password = action.payload;
        },
    },
    extraReducers : (builder)=>{
        builder.addCase(axiosLogin.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(axiosLogin.fulfilled,(state)=>{
            state.loading = false;
        });
        builder.addCase(axiosLogin.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
    }
    
})



export default LoginSlice.reducer;
export const {getUsername,getPassword} = LoginSlice.actions;
export {axiosLogin};