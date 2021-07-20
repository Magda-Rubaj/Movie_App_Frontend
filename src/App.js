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
            }, (10 * 1000 * 60) - 5);
            return () => clearInterval(interval);
        }
    });

    const refresh = () => {
        const token = JSON.stringify({
            refresh: localStorage.getItem('refresh_token')
        })
        console.log(localStorage.getItem('access_token'));
        tokenServices.refresh(token)
            .then(res => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                
            })
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
