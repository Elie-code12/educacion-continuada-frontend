import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../services/courseService';

export const useNuevoCurso = () => {
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        mode: '',
        hours: '',
        duration: '',
        cost: '',
        justification: '',
        general_objective: '',
        specific_objectives: '',
        topics: ''
    });

    const [schedules, setSchedules] = useState(['']);

    const [files, setFiles] = useState({
        image: null,
        pdf_document: null
    });

    const categorias = [
        'DIPLOMADOS DE OPCION DE GRADO',
        'DIPLOMADOS DE PUBLICO GENERAL',
        'SEMINARIOS',
        'DIPLOMADOS DE INGLES',
        'CURSOS'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleScheduleChange = (index, value) => {
        const newSchedules = [...schedules];
        newSchedules[index] = value;
        setSchedules(newSchedules);
    };

    const addScheduleField = () => setSchedules([...schedules, '']);

    const removeScheduleField = (index) => {
        const newSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(newSchedules);
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles.length > 0) {
            setFiles({ ...files, [name]: selectedFiles[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        schedules.forEach((schedule, index) => {
            if (schedule.trim() !== '') {
                data.append(`schedules[${index}]`, schedule);
            }
        });

        if (files.image) data.append('image', files.image);
        if (files.pdf_document) data.append('pdf_document', files.pdf_document);

        try {
            await createCourse(data); 

            setAlerta({ tipo: 'exito', texto: '¡Programa creado correctamente!' });

            setTimeout(() => {
                navigate('/admin/cursos');
            }, 2000);
            
        } catch (error) {
            setAlerta({ tipo: 'error', texto: 'Ocurrió un error al guardar. Verifica la conexión con el servidor.' });
        }
    };

    return {
        alerta,
        formData,
        schedules,
        categorias,
        handleChange,
        handleScheduleChange,
        addScheduleField,
        removeScheduleField,
        handleFileChange,
        handleSubmit
    };
};