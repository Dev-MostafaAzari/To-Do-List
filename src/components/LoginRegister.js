import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email Required"),
    username: yup.string().matches(/(?=^[a-zA-Z])[a-zA-Z0-9]/),
})

const LoginRegister = () => {
    return (
        <div>
            <div className="formsContainer">
                <div className="LoginDiv">
                    <form className="LoginForm">
                        <h3 className="LoginTitle">Login Here</h3>
                        <input type="text" />
                        <input type="text" />
                        <div className="LoginBtn">
                            <button type="submit">Login</button>
                            <button type="button">Create Account</button>
                        </div>
                    </form>
                </div>
                <div className="RegisterDiv">
                    <form className="RegisterForm">
                        <h3 className="RegisterTitle">Register Here</h3>
                        <input type="text" />
                        <input type="text" />
                        <input type="password" />
                        <input type="password" />
                        <div className="RegisterCheck">
                            <span className="RegisterSpan">I read the terms</span>
                            <input type="checkbox" />
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