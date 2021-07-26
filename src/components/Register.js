import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import userApi from '../services/userServices'

function Register() {

    const { register, handleSubmit} = useForm()
    const [emailError, setEmailError] = useState("")
    let history = useHistory();

    const signup = data => {
        const user = JSON.stringify({
            email: data.email,
            password: data.password
        });
        userApi.postUser(user)
            .then(res => {
                if(res.status === 201){
                    history.push("/login")
                }
            })
            .catch(e => {
                setEmailError(e.response.data.email[0]);
            })
    };

    return (
        <div className="Register">
            <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(signup)}>
                    <h5>Email</h5>
                    <input {...register('email') } type="email"/><br/>
                    <br/>
                    <h5>Password</h5>
                    <input {...register('password')} type="password" /><br/><br/>
                    {emailError && <p>{emailError}</p>}
                    <input type="submit" value="Sign Up"/><br/>
                </form>
        </div>
    );
}
export default Register;