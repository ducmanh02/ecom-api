import axios from 'axios'

const API_BASE_URL = "https://api.escuelajs.co/api/v1"


const api = axios.create({
    baseURL: API_BASE_URL
})

export const fetchProducts = async () => {
    try {
        const response = await api.get('/products?offset=0&limit=60')
        return response.data;
    }
    catch (error) {
        console.log("Fetching Error:", error);
        throw error
    }
}
export const fetchCategory = async () => {
    try {
        const response = await api.get('/categories')
        return response.data;
    }
    catch (error) {
        console.log("Fetching Error:", error);
        throw error
    }
}

export const handleCheckAccount = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            "email": email,
            "password": password
        });


        return response.data
        // Xử lý dữ liệu phản hồi ở đây
    } catch (error) {
        console.error('Error checking account:', error);
        return 401
    }
};

export const getAccount = async (access_token: string) => {
    try {
        const response = await api.get("/auth/profile",{
            headers: {
            "Authorization": `Bearer ${access_token}`
        }})
        return response
    }

    catch (error) {
        console.error('Error :', error);
        return 401
    }
}

export const checkEmailExist = async (email: string) =>{
    try{
        const response = await api.post('/users/is-available', {
            "email": email
        });
        return response

    }
    catch(error){
        console.log(error)
    }
}
export const deleteProduct = async (id: number) =>{
    try{
        const response = await api.delete(`products/${id}`)
        return response
    }
    catch(error){
        console.log(error)
    }
}