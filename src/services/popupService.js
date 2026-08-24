import api from './api';

export const getPublicPopups = () => {
   
    return api.get('/popups');
};