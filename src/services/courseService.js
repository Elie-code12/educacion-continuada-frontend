import api from './api';

// rutas publicas
export const getOferta = (category = null) => {
    const params = category ? { category } : {};
    return api.get('/oferta', { params });
};

export const getCategories = () => {
    return api.get('/courses/categories');
};

export const getCourse = (id) => {
    return api.get(`/courses/${id}`);
};

// rutas admin
export const getCourses = () => {
    return api.get('/courses');
};

// crear curso con archivos
export const createCourse = (formData) => {
    return api.post('/courses', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// actualizar truco put para laravel
export const updateCourse = (id, formData) => {
    formData.append('_method', 'PUT'); 
    return api.post(`/courses/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// borrar
export const deleteCourse = (id) => {
    return api.delete(`/courses/${id}`);
};