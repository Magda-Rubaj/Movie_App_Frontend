const API_URL = "http://0.0.0.0:8000/accounts-api/";

export default {
    obtain: body => 
        axios({
            method: 'post',
            url: API_URL + 'token-obtain', 
            data: body,
            headers: {'Content-Type':'application/json'},
        })  
        .then(res =>res)
        .catch(e => {
            console.log(e);
        }) 
};