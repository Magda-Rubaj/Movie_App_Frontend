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
import { NavLink } from "react-router-dom";
import Movies from './components/Movies';
import TopNav from './components/TopNav';
import Users from './components/Users';
import Actors from './components/Actors';

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
            <TopNav logoutCallback={() => setAuthenticated(false)} />
            <div className="App_Container">
                <div className="Side_Nav">
                    <nav>
                        <div className="NavItemWrapper">
                            <NavLink id="users" className="NavItem" to="/users">Users</NavLink>
                        </div>
                        <div className="NavItemWrapper">
                            <NavLink id="movies" className="NavItem" to="/movies">Movies</NavLink>
                        </div>
                        <div className="NavItemWrapper">
                            <NavLink id="actors" className="NavItem" to="/actors">Actors</NavLink>
                        </div>
                        <div className="NavItemWrapper">
                            <NavLink id="directors" className="NavItem" to="/">Directors</NavLink>
                        </div>
                    </nav>
                </div>
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
                    <div>
                        <Route path="/users">
                            <Users />
                        </Route>
                    </div>
                    <div>
                        <Route path="/actors">
                            <Actors />
                        </Route>
                    </div>
                </div>
                </div>
            </HashRouter>
        </div>
);
}

export default App;
