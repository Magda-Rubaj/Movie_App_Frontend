import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import userApi from '../services/userServices'
import tokenApi from '../services/tokenServices';


function Login({loginCallback}) {
    const { register, handleSubmit} = useForm()
    let history = useHistory();

    const signin = data => {
        const user = JSON.stringify({
            email: data.email,
            password: data.password
        });
        tokenApi.obtain(user)
            .then(token => {
                const json = JSON.parse(atob(token.split('.')[1]));
                userApi.getUser(json.user_id)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                })
            })
        loginCallback();
        history.push("/movies")
    };

    return (
        <div className="Login">
            <h3>Login</h3>
             <form onSubmit={handleSubmit(signin)}>
             <h5>Email</h5>
                <input {...register('email') } type="email"/><br/>
                <br/>
                <h5>Password</h5>
                <input {...register('password')} type="password" /><br/><br/>
                <input type="submit" value="Login"/><br/>
            </form>
        </div>
    );
}
export default Login;