import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
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
        <div className="Register" className="auth_form">
            <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(signup)}>
                    <label>Email</label>
                    <input {...register('email') } type="email"/>
                    <label>Password</label>
                    <input {...register('password')} type="password" />
                    {emailError && <p>{emailError}</p>}
                    <Button variant="primary" type="submit">Sign Up</Button>
                </form>
        </div>
    );
}
export default Register;