import api from './api';

export const getCertificates = () => {
    return api.get('/admin/certificates');
};

export const getStudentData = (docNumber) => {
    return api.get(`/admin/certificates/student/${docNumber}`);
};

export const uploadCertificate = (data) => {
    return api.post('/admin/certificates', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteCertificate = (id) => {
    return api.delete(`/admin/certificates/${id}`);
};

export const downloadCertificatePdf = (id) => {
    return api.get(`/admin/certificates/${id}/pdf`, {
        responseType: 'blob'
    });
};

export const searchPublicCertificates = (data) => {
    return api.post('/certificates/search', data);
};