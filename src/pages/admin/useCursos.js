import { useState, useEffect } from 'react';
import { getCourses, deleteCourse } from '../../services/courseService';

export const useCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState(null);
    const [modalEliminar, setModalEliminar] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const cargarCursos = async () => {
            try {
                const response = await getCourses();
                setCursos(response.data); 
            } catch (error) {
                console.error(error);
                setAlerta({ tipo: 'error', texto: 'error al cargar programas' });
            } finally {
                setCargando(false);
            }
        };

        cargarCursos();
    }, []);

    const confirmarEliminacion = async () => {
        const id = modalEliminar.id;
        setModalEliminar({ isOpen: false, id: null });

        try {
            await deleteCourse(id);
            setCursos(cursos.filter(curso => curso.id !== id));
            setAlerta({ tipo: 'exito', texto: 'curso eliminado correctamente' });
        } catch (error) {
            console.error(error);
            setAlerta({ tipo: 'error', texto: 'error al eliminar' });
        } finally {
            setTimeout(() => {
                setAlerta(null);
            }, 3000);
        }
    };

    return {
        cursos,
        cargando,
        alerta,
        modalEliminar,
        setModalEliminar,
        confirmarEliminacion
    };
};