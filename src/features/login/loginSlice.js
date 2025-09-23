import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading:false,
    error : "",
}

const baseUrl = "https://fakestoreapi.com";

const axiosLogin = createAsyncThunk("login/axiosLogin",async(userdata)=>{
    const response = await axios.post(`${baseUrl}/auth/login`, userdata);   //vaghti az await estefade mishe error be tor auto mire be rejected
    return response.data;
})

const LoginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{

    },
    extraReducers:(buider)=>{
        buider.addCase(axiosLogin.pending,(state)=>{
            state.loading = true;
        });
        buider.addCase(axiosLogin.fulfilled,(state)=>{
            state.loading = false;
            state.error = "";
        })
        buider.addCase(axiosLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    }
})


export default LoginSlice.reducer;
export {axiosLogin};