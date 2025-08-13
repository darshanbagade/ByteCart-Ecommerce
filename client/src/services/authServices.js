import api from "./api";

const userLogin = async(payload)=>{
    return await api.post('/api/v1/user/login',payload)
    // console.log(res)
    
}

const getCurrentUser = async ()=>{
    return await api.get('/api/v1/user/current-user')
}
export {
    userLogin,
    getCurrentUser
};