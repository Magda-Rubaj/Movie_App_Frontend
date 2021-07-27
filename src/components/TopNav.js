import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
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
            <Button variant="primary" onClick={logout}>Log out</Button>{' '}
        </React.Fragment> :
        <React.Fragment>
            <NavLink id="login" className="NavItem" to="/login">Sign in</NavLink>
            <a>|</a>
            <NavLink id="register" className="NavItem" to="/register">Sign Up</NavLink>
        </React.Fragment>
        }
        </div>
    );
}
export default TopNav;