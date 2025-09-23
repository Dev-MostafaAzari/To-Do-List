import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading:false,
    error : "",
}

const baseUrl = "https://fakestoreapi.com";

const axiosRegister = createAsyncThunk("register/axiosRegister",async(userdata)=>{
    const response = await axios.post(`${baseUrl}/auth/login`, userdata);   //vaghti az await estefade mishe error be tor auto mire be rejected
    return response.data;
})

const RegisterSlice = createSlice({
    name:"register",
    initialState,
    reducers:{

    },
    extraReducers:(buider)=>{
        buider.addCase(axiosRegister.pending,(state)=>{
            state.loading = true;
        });
        buider.addCase(axiosRegister.fulfilled,(state)=>{
            state.loading = false;
            state.error = "";
        })
        buider.addCase(axiosRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    }
})


export default RegisterSlice.reducer;
export {axiosRegister};