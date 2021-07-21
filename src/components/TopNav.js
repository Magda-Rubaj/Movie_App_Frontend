import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

function TopNav({logoutCallback}) {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
        logoutCallback();
    };

    return (
        <div className="TopNav">
            <NavLink id="login" className="NavItem" to="/login">Sign in</NavLink>
            <NavLink id="register" className="NavItem" to="/register">Sign Up</NavLink>
            <button id="logout" onClick={logout}>Log Out</button>
        </div>
    );
}
export default TopNav;