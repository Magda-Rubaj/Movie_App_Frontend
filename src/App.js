import './App.css';
import React, { useState , useEffect} from 'react';
import {
    Route,
    HashRouter,
    Redirect
  } from "react-router-dom";
import Login from './components/Login';
import tokenServices from './services/tokenServices';
import userServices from './services/userServices';
import Register from './components/Register';
import { NavLink } from "react-router-dom";
import Movies from './components/Movies';
import TopNav from './components/TopNav';
import Users from './components/Users';
import Actors from './components/Actors';
import Directors from './components/Directors';
import axios from "axios";


function App() {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        axios.interceptors.response.use(res => res,
        error => {
            const {status, data, config } = error.response;
            const originalRequest = config
            if(status === 401 && userServices.checkIsAuth()){
                refresh();
                originalRequest.headers['Authorization'] = "Bearer " + localStorage.getItem('access_token')
                return axios(originalRequest);
            }
            return Promise.reject(error);
        })
    }, [authenticated]);

    const refresh = () => {
        const token = JSON.stringify({
            refresh: localStorage.getItem('refresh_token')
        })
        tokenServices.refresh(token)
            .then(res => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
            })
            .catch(e => {
                if(e.response.status === 401){
                    localStorage.clear();
                }
            })
        
    }

    return (
        <div className="App">
            <HashRouter>
            <TopNav logoutCallback={() => setAuthenticated(false)} />
            <div className="App_Container">
                <div className="Side_Nav">
                    <h4>Movies App</h4>
                    <nav>
                        {userServices.checkIsAdmin() &&
                            <div className="NavItemWrapper">
                                <NavLink id="users" className="NavItem" activeClassName="active" to="/users">Users</NavLink>
                            </div>
                        }
                        <div className="NavItemWrapper">
                            <NavLink id="movies" className="NavItem" activeClassName="active"  to="/movies">Movies</NavLink>
                        </div>
                        <div className="NavItemWrapper">
                            <NavLink id="actors" className="NavItem" activeClassName="active"   to="/actors">Actors</NavLink>
                        </div>
                        <div className="NavItemWrapper">
                            <NavLink id="directors" className="NavItem" activeClassName="active" to="/directors">Directors</NavLink>
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
                    <div>
                        <Route path="/directors">
                            <Directors />
                        </Route>
                    </div>
                </div>
                </div>
            </HashRouter>
        </div>
);
}

export default App;
