import './App.css';
import React, { useState , useEffect} from 'react';
import {
    Route,
    HashRouter,
    Redirect
  } from "react-router-dom";
import Login from './components/Login';
import tokenServices from './services/tokenServices';
import Register from './components/Register';
import Nav from './components/Nav';
import Movies from './components/Movies';

function App() {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if(authenticated){
            const interval = setInterval(() => {
                refresh();
            }, (10 * 1000 * 60) - 10);
            return () => clearInterval(interval);
        }
    });

    const refresh = () => {
        const token = JSON.stringify({
            refresh: localStorage.getItem('refresh_token')
        })

        tokenServices.refresh(token)
            .then(res => {
                if(res) {
                    localStorage.setItem('access_token', res.access);
                    localStorage.setItem('refresh_token', res.refresh);
                }
            })
        alert("Token refreshed")
    }
    return (
        <div className="App">
            <HashRouter>
                <div className="Main_Container">
                    <div>
                        <Route path="/login">
                            <Login loginCallback={() => setAuthenticated(true)}/>
                        </Route>
                    </div>
                    <div>
                        <Route path="/register">
                            <Register />
                        </Route>
                    </div>
                    <div>
                        <Route path="/movies">
                            <Movies />
                        </Route>
                    </div>
                </div>
            </HashRouter>
        </div>
);
}

export default App;
