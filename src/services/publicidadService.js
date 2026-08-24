import api from './api';

export const getHomeContent = () => api.get('/admin/home-content');
export const updateHomeContent = (data) => api.put('/admin/home-content', data);

export const getPopups = () => api.get('/admin/popups');
export const createPopup = (data) => api.post('/admin/popups', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const togglePopup = (id) => api.patch(`/admin/popups/${id}/toggle`);
export const deletePopup = (id) => api.delete(`/admin/popups/${id}`);