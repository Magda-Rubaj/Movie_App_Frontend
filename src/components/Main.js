import React, { useState } from 'react';
import {
    Route,
    HashRouter,
    Redirect
  } from "react-router-dom";
import Nav from './Nav';

function Main() {

    return (
        <div className="Main">
            <HashRouter>
                <Nav />
            </HashRouter>
        </div>
    );
}
export default Main;