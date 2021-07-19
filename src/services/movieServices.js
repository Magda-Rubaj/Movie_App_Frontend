import axios from "axios";


const API_URL = "http://0.0.0.0:8000/movie-api/movies/";

export default {
    getMovieList: () => 
        axios({
            method: 'get',
            url: API_URL, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),},
        })  
        .then(res =>res.data)
        .catch(e => {
            console.log(e);
        }),
    
    postMovie: body => 
        axios({
            method: 'post',
            url: API_URL, 
            data: body,
            headers: {
                'Content-Type':'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),

    deleteMovie: id => 
        axios({
            method: 'delete',
            url: API_URL + `${id}/`, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        })  
        .then(res =>res)
        .catch(e => {
            console.log(e);
        }),
}
