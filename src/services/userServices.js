import axios from "axios";

const API_URL = "http://0.0.0.0:8000/accounts-api/users/";

export default {
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

    checkIsAdmin: () => JSON.parse(localStorage.getItem('user')).is_admin,
    
};