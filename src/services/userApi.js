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
        }) 
};