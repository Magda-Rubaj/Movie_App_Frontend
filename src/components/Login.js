import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import userApi from '../services/userServices'
import tokenApi from '../services/tokenServices';


function Login({loginCallback}) {
    const { register, handleSubmit} = useForm()
    const [credentialsError, setCredentialsError] = useState("")
    let history = useHistory();

    const signin = data => {
        const user = JSON.stringify({
            email: data.email,
            password: data.password
        });
        tokenApi.obtain(user)
        .then(res => {
            if(res.status === 200){
                const token = res.data.access
                const json = JSON.parse(atob(token.split('.')[1]));
                userApi.getUser(json.user_id)
                .then(user_res => {
                        localStorage.setItem('user', JSON.stringify(user_res.data));
                        loginCallback();
                        history.push("/movies")
                })
            }   
        })
        .catch(e => {
            if(e.response.status === 401){
                setCredentialsError(e.response.data.detail)
            }
        })
    };

    return (
        <div className="Login"  className="auth_form">
            <h3>Login</h3>
             <form onSubmit={handleSubmit(signin)}>
             <label>Email</label>
                <input {...register('email') } type="email"/>
                <label>Password</label>
                <input {...register('password')} type="password" />
                {credentialsError && <p>{credentialsError}</p>}
                <Button variant="primary" type="submit">Login</Button>
            </form>
        </div>
    );
}
export default Login;