import { useState } from 'react';
import { searchPublicCertificates, downloadCertificatePdf } from '../../services/certificateService';

export const useCertificateStudent = () => {
    const [formData, setFormData] = useState({
        doc_type: '',
        doc_number: '',
        expedition_date: ''
    });
    
    const [cargando, setCargando] = useState(false);
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState('');
    const [descargandoId, setDescargandoId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const manejarBusqueda = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        setResultados(null);

        try {
            const response = await searchPublicCertificates(formData);
            
            if (response.data && response.data.length > 0) {
                setResultados(response.data);
            } else {
                setError('No se encontraron certificados con estos datos.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al buscar el certificado en el sistema.');
        } finally {
            setCargando(false);
        }
    };

    const descargarPdf = async (id, verificationCode) => {
        setDescargandoId(id);
        try {
            const response = await downloadCertificatePdf(id);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Certificado_UT_${verificationCode}.pdf`);
            
            document.body.appendChild(link);
            link.click();
            
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Error al intentar descargar el documento PDF.');
        } finally {
            setDescargandoId(null);
        }
    };

    const limpiarBusqueda = () => {
        setResultados(null);
        setError('');
        setFormData({ doc_type: '', doc_number: '', expedition_date: '' });
    };

    return {
        formData,
        cargando,
        resultados,
        error,
        descargandoId,
        handleChange,
        manejarBusqueda,
        descargarPdf,
        limpiarBusqueda
    };
};