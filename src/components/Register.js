import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import userApi from '../services/userServices'

function Register() {

    const { register, handleSubmit} = useForm()

    const signup = data => {
        const user = JSON.stringify({
            email: data.email,
            password: data.password
        });
        userApi.postUser(user);
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
                    <input type="submit" value="Sign Up"/><br/>
                </form>
        </div>
    );
}
export default Register;