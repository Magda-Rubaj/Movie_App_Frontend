import axios from "axios";

const API_URL = "http://0.0.0.0:8000/accounts-api/users/";

const userServices = {
    postUser: body => 
        axios({
            method: 'post',
            url: API_URL, 
            data: body,
            headers: {'Content-Type':'application/json'},
        })  
        .then(res =>res)
        .catch(e => {
            console.log(e);
        }),

    getUser: id => 
        axios({
            method: 'get',
            url: API_URL + `${id}/`, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),

    getUserList: () => 
        axios({
            method: 'get',
            url: API_URL, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),
    
    deleteUser: id => 
        axios({
            method: 'delete',
            url: API_URL + `${id}/`, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        })  
        .then(res => res)
        .catch(e => {
            console.log(e);
        }),
    
    patchUser: (id, body) => 
        axios({
            method: 'patch',
            url: API_URL + `${id}/`, 
            data: body,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),

    checkIsAuth: () => localStorage.getItem('access_token') != null ? true : false,

    checkIsAdmin: () => userServices.checkIsAuth() ? JSON.parse(localStorage.getItem('user')).is_admin : false,

    getUserID: () => JSON.parse(localStorage.getItem('user')).id,
    
};
export default userServices