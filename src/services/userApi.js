import axios from "axios";

const API_URL = "http://0.0.0.0:8000/accounts/user/"

const postUser = body => {
    return axios.post(API_URL, body)
}

export default {
    postUser,
}