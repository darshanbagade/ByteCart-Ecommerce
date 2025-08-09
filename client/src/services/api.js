import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json' 
        // it's telling to backend that we will communicate in json format
    }
})

export default api;