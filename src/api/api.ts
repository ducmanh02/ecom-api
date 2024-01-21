import axios from 'axios'

const API_BASE_URL = "https://api.escuelajs.co/api/v1"

const api = axios.create({
    baseURL : API_BASE_URL
})

export const fetchProducts = async () => {
    try{
        const response = await api.get('/products?offset=0&limit=60')
        return response.data;
    }
    catch(error){
        console.log("Fetching Error:", error);
        throw error
    }
}
export const fetchCategory = async () => {
    try{
        const response = await api.get('/categories')
        return response.data;
    }
    catch(error){
        console.log("Fetching Error:", error);
        throw error
    }
}