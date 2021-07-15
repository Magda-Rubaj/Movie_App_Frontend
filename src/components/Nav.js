import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

function Nav() {

    const logout = () => {
        localStorage.clear();
        window.location.reload(false);
    };

    return (
        <div className="Nav">
            <nav>
                <div className="NavItemWrapper">
                    <NavLink id="movies" className="NavItem" to="/">Movies</NavLink>
                </div>
                <div className="NavItemWrapper">
                    <NavLink id="actors" className="NavItem" to="/">Actors</NavLink>
                </div>
                <div className="NavItemWrapper">
                    <NavLink id="directors" className="NavItem" to="/">Directors</NavLink>
                </div>
                <div className="NavItemWrapper">
                    <button id="logout" className="NavItem" onClick={logout}>Log out</button>
                </div>
            </nav>
        </div>
    );
}
export default Nav;