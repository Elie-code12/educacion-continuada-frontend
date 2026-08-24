import api from './api';

export const loginAdmin = (credentials) => {
    return api.post('/login', credentials);
};

export const logoutAdmin = () => {
    return api.post('/logout');
};