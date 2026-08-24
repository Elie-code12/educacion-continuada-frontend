import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


api.interceptors.request.use((config) => {
   
    const token = sessionStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        
        if (error.response && error.response.status === 401) {
            console.warn('Sesión expirada o inválida. Cerrando sesión en el frontend...');
            
            
            sessionStorage.removeItem('admin_token');
            
           
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);

export default api;