import axios from "axios";


const API_URL = "http://0.0.0.0:8000/movie-api/movies/";

export default {
    getMovieList: () => 
        axios({
            method: 'get',
            url: API_URL, 
            headers: {'Content-Type':'application/json'},
        })  
        .then(res =>res.data)
        .catch(e => {
            console.log(e);
        }),
}