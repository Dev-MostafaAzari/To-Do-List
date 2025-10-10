import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {motion} from "framer-motion";
import "../../styles/LoginRegister.css";
import {useSelector,useDispatch} from "react-redux";
import { getUsername,getPassword } from '../../features/login/loginSlice';
import { axiosRegister } from '../../features/register/registerSlice';
import { axiosLogin } from '../../features/login/loginSlice';

const registerSchema = yup.object().shape({
    username: yup.string().matches(/(?=^[a-zA-Z])(?=.{3})[a-zA-Z0-9]/,"invalid username"),
    email: yup.string().email("invalid Email").required("email required"),
    password : yup.string().matches(/(?=.*[!@#$%])(?=.{7})(?=^[a-zA-Z])(?=.*[A-Z])[A-Za-z0-9]/,"invalid password").required("Password Required"),
    confirmPass : yup.string().oneOf([yup.ref("password"),null],"Password dosent match").required("Confirmation Required"),
    acceptTerms : yup.boolean().oneOf([true],"you must accept our terms"),
});

const LoginRegister = () => {

    const {register,handleSubmit,watch,formState:{errors}}=useForm({resolver:yupResolver(registerSchema)});   //form validation

    /* const [logindata , setLogindata] = useState({username:"",password:""});        //state for saving input data */       //****** maghadir comment shode yani az ravesh dige raftam ******/
    
    const UserLoginData = useSelector((state)=> state.login);

    const dispatch = useDispatch();


    const RegisterDate = {
        username: watch("username"),
        password : watch("password"),
        email : watch("email"),
    }
    
    /* const LoginInput = (event)=>{        //data ro dar input dar in state mizare
        switch(event.target.name){
            case "username":
                setLogindata({...logindata, username : event.target.value});
                
                break;
            case "password":
                setLogindata({...logindata, password : event.target.value});
                
                break;
            default:
                break;        
        }
    } */

    const HandleLogin = (event)=>{      //dar submit maghadir ro dar state slice mizare va sepas axios ro ejra mikone
        event.preventDefault();
        /* dispatch(getUsername(logindata.username));
        dispatch(getPassword(logindata.password)); */
        dispatch(axiosLogin(UserLoginData));       //UserLoginData ke hamoon state dakhel LoginSlice hast ro be vorodi axios midim
    }

    return (
        <div className="LoginRegisterMain">
            <div className="FormsWrapper">
                <div className="LoginDiv">
                    <form className="LoginForm" onSubmit={HandleLogin}>
                        <h1>Login Here</h1>
                        <input name="username" type="text" value={UserLoginData.username} onChange={(event)=>dispatch(getUsername(event.target.value))} placeholder="username" />
                        <input name="password" type="password" value={UserLoginData.password} onChange={(event)=>dispatch(getPassword(event.target.value))} placeholder="password" />
                        <div className="LoginBtn">
                            <button type="submit">Login</button>
                            <button type="button">Create Account</button>
                        </div>
                    </form>
                </div>
                <div className="RegisterDiv">
                    <form className="RegisterForm" onSubmit={handleSubmit()}>
                        <h1>Register Here</h1>
                        <input type="text" placeholder="username" {...register("username")} />
                        <span>{errors.username?.message}</span>
                        <input type="text" placeholder="gmail" {...register("email")} />
                        <span>{errors.email?.message}</span>
                        <input type="password" placeholder="password" {...register("password")} />
                        <span>{errors.password?.message}</span>
                        <input type="password" placeholder="confirmpass" {...register("confirmPass")} />
                        <span>{errors.confirmPass?.message}</span>
                        <div className="RegisterCheck">
                            <span id="RegisterTermsSpan">I read the terms</span>
                            <input type="checkbox" {...register("acceptTerms")} />
                            <span>{errors.acceptTerms?.message}</span>
                        </div>
                        <div className="RegisterBtn">
                            <button type="submit">Register</button>
                            <button type="button">I Have Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister;