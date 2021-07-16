import React, { useState } from 'react';
import {
    Route,
    HashRouter,
    Redirect
  } from "react-router-dom";
import Nav from './Nav';
import Movies from './Movies';

function Main() {

    return (
        <div className="Main">
            <HashRouter>
                
                <div className="Main__Container">
                    <Route path="/movies">
                        <Movies />
                    </Route>
                </div>
            </HashRouter>
        </div>
    );
}
export default Main;