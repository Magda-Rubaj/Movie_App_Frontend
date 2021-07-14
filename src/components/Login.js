import React, { useState } from 'react';
import userApi from '../services/userApi'

function Login() {
    const [authenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signin = e => {
        e.preventDefault();
        const user = JSON.stringify({
            email: email,
            password: password
        });
        userApi.postUser(user);
    };

    const emailChanged = e => {
        setEmail(e.target.value);
    };

    const passwordChanged = e => {
        setPassword(e.target.value);
    };

    return (
        <div className="Register">
            <h3>Login</h3>
             <form onSubmit={signup}>
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