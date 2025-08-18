import api from "./api";

const userSignup = async (payload) =>{
    return await api.post('/api/v1/user/register',payload)
    // console.log(res)

    
}

const userLogin = async(payload)=>{
    return await api.post('/api/v1/user/login',payload)
    // console.log(res)
    
}

const getCurrentUser = async ()=>{
    return await api.get('/api/v1/user/current-user')
}

const userLogout = async ()=>{
    return await api.post('/api/v1/user/logout')
}

export {
    userSignup,
    userLogin,
    getCurrentUser,
    userLogout,
    
};