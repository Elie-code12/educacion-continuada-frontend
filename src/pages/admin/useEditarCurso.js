import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse, updateCourse } from '../../services/courseService';

export const useEditarCurso = () => {
    const { id } = useParams();
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

    const [currentFiles, setCurrentFiles] = useState({
        image_url: '',
        pdf_document: ''
    });

    const [modal, setModal] = useState({ isOpen: false, type: '', url: '' });

    const categorias = [
        'DIPLOMADOS DE OPCION DE GRADO',
        'DIPLOMADOS DE PUBLICO GENERAL',
        'SEMINARIOS',
        'SEMINARIOS DE INGLES',
        'CURSOS'
    ];

    const getFullUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('blob:')) return path; 
        return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${path}`; 
    };

    const abrirModal = (type, path) => {
        setModal({ isOpen: true, type, url: getFullUrl(path) });
    };

    const cerrarModal = () => {
        setModal({ isOpen: false, type: '', url: '' });
    };

    useEffect(() => {
        const cargarCurso = async () => {
            try {
                const response = await getCourse(id);
                const curso = response.data;

                // SOLUCIÓN A PRUEBA DE BALAS PARA LAS CATEGORÍAS
                let categoriaNormalizada = '';
                if (curso.category) {
                    let cat = curso.category.trim().toUpperCase();
                    
                    if (cat.includes('INGLES') || cat.includes('INGLÉS')) {
                        categoriaNormalizada = 'SEMINARIOS DE INGLES';
                    } else if (cat.includes('OPCION') || cat.includes('OPCIÓN')) {
                        categoriaNormalizada = 'DIPLOMADOS DE OPCION DE GRADO';
                    } else if (cat.includes('PUBLICO') || cat.includes('PÚBLICO')) {
                        categoriaNormalizada = 'DIPLOMADOS DE PUBLICO GENERAL';
                    } else if (cat === 'SEMINARIO' || cat === 'SEMINARIOS') {
                        categoriaNormalizada = 'SEMINARIOS';
                    } else if (cat === 'CURSO' || cat === 'CURSOS') {
                        categoriaNormalizada = 'CURSOS';
                    } else {
                        categoriaNormalizada = cat; 
                    }
                }

                setFormData({
                    title: curso.title || '',
                    category: categoriaNormalizada,
                    mode: curso.mode || '',
                    hours: curso.hours || '',
                    duration: curso.duration || '',
                    cost: curso.cost || '',
                    justification: curso.justification || '',
                    general_objective: curso.general_objective || '',
                    specific_objectives: Array.isArray(curso.specific_objectives) ? curso.specific_objectives.join('\n') : curso.specific_objectives || '',
                    topics: Array.isArray(curso.topics) ? curso.topics.join('\n') : curso.topics || ''
                });

                if (curso.schedules && curso.schedules.length > 0) {
                    setSchedules(curso.schedules);
                }

                setCurrentFiles({
                    image_url: curso.image_url || '',
                    pdf_document: curso.pdf_document || ''
                });
                
            } catch (error) {
                console.error("Error al cargar curso:", error);
                setAlerta({ tipo: 'error', texto: 'Error al cargar los datos del curso.' });
            }
        };

        cargarCurso();
    }, [id]);

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
            const file = selectedFiles[0];
            
            setFiles({ ...files, [name]: file });

            const tempUrl = URL.createObjectURL(file);
            setCurrentFiles(prev => ({
                ...prev,
                [name === 'image' ? 'image_url' : 'pdf_document']: tempUrl
            }));
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
            await updateCourse(id, data);
            setAlerta({ tipo: 'exito', texto: '¡Programa guardado correctamente!' });
            setTimeout(() => {
                navigate('/admin/cursos');
            }, 2000);
            
        } catch (error) {
            console.error("Error actualizando curso", error);
            setAlerta({ tipo: 'error', texto: 'Error al guardar. Verifica la conexión con el servidor.' });
        }
    };

    return {
        formData, schedules, currentFiles, modal, alerta, categorias,
        handleChange, handleScheduleChange, addScheduleField, removeScheduleField,
        handleFileChange, handleSubmit, abrirModal, cerrarModal
    };
};