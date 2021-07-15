import axios from "axios";


const API_URL = "http://0.0.0.0:8000/accounts-api/token/";

export default {
    obtain: body => 
        axios({
            method: 'post',
            url: API_URL + 'obtain', 
            data: body,
            headers: {'Content-Type':'application/json'},
        })  
        .then(res => {
            console.log(res);
            if(res.data.access){
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
            }
            return res.data.access
        })
        .catch(e => {
            console.log(e);
        }),
    
    refresh: body =>
        axios({
            method: 'post',
            url: API_URL + 'refresh', 
            data: body,
            headers: {'Content-Type':'application/json'},
        }) 
};