import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {motion} from "framer-motion";
import "../styles/LoginRegister.css";
import {useSelector,useDispatch} from "react-redux";
import { axiosRegister } from '../features/register/registerSlice';

const registerSchema = yup.object().shape({
    username: yup.string().matches(/(?=^[a-zA-Z])(?=.{3})[a-zA-Z0-9]/,"invalid username"),
    email: yup.string().email("invalid Email").required("email required"),
    password : yup.string().matches(/(?=.*[!@#$%])(?=.{7})(?=^[a-zA-Z])(?=.*[A-Z])[A-Za-z0-9]/,"invalid password").required("Password Required"),
    confirmPass : yup.string().oneOf([yup.ref("password"),null],"Password dosent match").required("Confirmation Required"),
    acceptTerms : yup.boolean().oneOf([true],"you must accept our terms"),
});

const LoginRegister = () => {

    const {register,handleSubmit,watch,formState:{errors}}=useForm({resolver:yupResolver(registerSchema)});

    const dispatch = useDispatch()

    const RegisterDate = {
        username: watch("username"),
        password : watch("password"),
        email : watch("email"),
    }
    

    return (
        <div className="LoginRegisterMain">
            <div className="formsContainer">
                <div className="LoginDiv">
                    <form className="LoginForm">
                        <h3 className="LoginTitle">Login Here</h3>
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <div className="LoginBtn">
                            <button type="submit">Login</button>
                            <button type="button">Create Account</button>
                        </div>
                    </form>
                </div>
                <div className="RegisterDiv">
                    <form className="RegisterForm" onSubmit={handleSubmit()}>
                        <h3 className="RegisterTitle">Register Here</h3>
                        <input type="text" placeholder="username" {...register("username")} />
                        <span>{errors.username?.message}</span>
                        <input type="text" placeholder="gmail" {...register("email")} />
                        <span>{errors.email?.message}</span>
                        <input type="password" placeholder="password" {...register("password")} />
                        <span>{errors.password?.message}</span>
                        <input type="password" placeholder="confirmpass" {...register("confirmPass")} />
                        <span>{errors.confirmPass?.message}</span>
                        <div className="RegisterCheck">
                            <span className="RegisterSpan">I read the terms</span>
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