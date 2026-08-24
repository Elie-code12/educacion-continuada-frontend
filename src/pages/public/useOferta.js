import { useState, useEffect } from 'react';
import { getOferta } from '../../services/courseService'; 
import { getHomeContent } from '../../services/publicidadService'; 

export const useOferta = () => {
    const [cursos, setCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [textos, setTextos] = useState({ about_us: '', formation_types: '', discounts: '' }); 
    const [cargando, setCargando] = useState(true);
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const [modalActivo, setModalActivo] = useState(null);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const apiUrl = 'http://localhost:8000/storage/';

    const titulosModal = {
        about_us: 'Quiénes Somos',
        formation_types: 'Tipos de Formación',
        discounts: 'Descuentos'
    };

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const [resCursos, resTextos] = await Promise.all([
                getOferta(categoriaActiva),
                getHomeContent() 
            ]);

            let dataCursos = [];
            const respuesta = resCursos.data;

            if (Array.isArray(respuesta)) {
                dataCursos = respuesta;
            } else if (respuesta && typeof respuesta === 'object') {
                if (Array.isArray(respuesta.courses)) {
                    dataCursos = respuesta.courses;
                } else if (Array.isArray(respuesta.data)) {
                    dataCursos = respuesta.data;
                }
            }

            setCursos(dataCursos);

            if (categoriaActiva === null) {
                const categoriasConCursos = [...new Set(dataCursos.map(c => c.category).filter(Boolean))];
                setCategorias(categoriasConCursos);
            }

            setTextos(resTextos.data || { about_us: '', formation_types: '', discounts: '' });

        } catch (error) {
            setCursos([]); 
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [categoriaActiva]);

    useEffect(() => {
        document.body.style.overflow = (modalActivo || cursoSeleccionado) ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalActivo, cursoSeleccionado]);

    const getImagenSrc = (curso) => {
        const rutaDB = curso.image_url || curso.image_path || curso.image;
        if (!rutaDB) return null;
        if (rutaDB.startsWith('http') || rutaDB.startsWith('data:image')) return rutaDB;
        const rutaLimpia = rutaDB.replace(/^\/?(storage\/|public\/)?/, '');
        return `${apiUrl}${rutaLimpia}`;
    };

    return {
        cursos,
        categorias,
        textos,
        cargando,
        categoriaActiva,
        setCategoriaActiva,
        modalActivo,
        setModalActivo,
        cursoSeleccionado,
        setCursoSeleccionado,
        titulosModal,
        getImagenSrc
    };
};