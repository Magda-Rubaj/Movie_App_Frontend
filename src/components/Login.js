import React, { useState } from 'react';
import userApi from '../services/userServices'
import tokenApi from '../services/tokenServices';

function Login({loginCallback}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signin = e => {
        e.preventDefault();
        const user = JSON.stringify({
            email: email,
            password: password
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
        userApi.checkIsAdmin();
    };

    const emailChanged = e => {
        setEmail(e.target.value);
    };

    const passwordChanged = e => {
        setPassword(e.target.value);
    };

    return (
        <div className="Login">
            <h3>Login</h3>
             <form onSubmit={signin}>
             <h5>Email</h5>
                <input 
                    type="email"
                    value={email}
                    onChange={emailChanged}
                /><br/>
                <h5>Password</h5>
                <input 
                    type="password"
                    value={password}
                    onChange={passwordChanged}
                /><br/>
                <input type="submit" value="Login"/><br/>
            </form>
        </div>
    );
}
export default Login;