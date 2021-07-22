import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import userServices from '../services/userServices';
import { NavLink } from "react-router-dom";

function TopNav({logoutCallback}) {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
        logoutCallback();
    };

    return (
        <div className="TopNav">
        {userServices.checkIsAuth() ?
        <React.Fragment>
            <p>{ JSON.parse(localStorage.getItem('user')).email}</p>
            <button id="logout" onClick={logout}>Log Out</button>
        </React.Fragment> :
        <React.Fragment>
            <NavLink id="login" className="NavItem" to="/login">Sign in</NavLink>
            <NavLink id="register" className="NavItem" to="/register">Sign Up</NavLink>
        </React.Fragment>
        }
        </div>
    );
}
export default TopNav;