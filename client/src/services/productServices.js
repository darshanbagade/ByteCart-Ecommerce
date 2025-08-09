import api from "./api";

const getAllProducts = ()=>{
    return api.get('/api/v1/product')
}

export {getAllProducts}
