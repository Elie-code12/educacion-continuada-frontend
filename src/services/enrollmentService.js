import api from './api';

// pedir lista de inscritos
export const getEnrollments = (category = '') => {
    const params = category ? { category } : {};
    return api.get('/admin/enrollments', { params }); 
};

// cambiar el estado
export const updateEnrollmentStatus = (id, status) => {
    return api.put(`/admin/enrollments/${id}/status`, { status });
};


export const downloadEnrollmentsExcel = (category = 'Todas', status = 'Todos') => {
    return api.get('/admin/enrollments/export', {
        params: { category, status },
        responseType: 'blob' 
    });
};

export const enrollCourse = (formData) => {
    return api.post('/enrollments', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};