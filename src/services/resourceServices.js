import axios from "axios";


const API_URL = "http://0.0.0.0:8000/movie-api/";

export default {
    getResourceList: type => 
        axios({
            method: 'get',
            url: API_URL + `${type}/`, 
            headers: {'Content-Type':'application/json'}
        })  
        .then(res => res.data)
        .catch(e => {
            console.log(e);
        }),
    
    postResource: (body, type) => 
        axios({
            method: 'post',
            url: API_URL + `${type}/`, 
            data: body,
            headers: {
                'Content-Type':'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),

    deleteResource: (id, type) => 
        axios({
            method: 'delete',
            url: API_URL + `${type}/${id}/`, 
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        })  
        .then(res => res)
        .catch(e => {
            console.log(e);
        }),

    patchResource: (id, body, type) => 
        axios({
            method: 'patch',
            url: API_URL + `${type}/${id}/`, 
            data: body,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),
    
    patchImage: (id, img, type) =>
        axios({
            method: 'patch',
            url: API_URL + `${type}/${id}/`, 
            data: img,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            },
        }),


    getResource: (id, type) => 
        axios({
            method: 'get',
            url: API_URL + `${type}/${id}/`,
            headers: {
                'Content-Type':'application/json'
            }
        })  
        .then(res => res.data)
        .catch(e => {
            console.log(e);
        }),
    
}
