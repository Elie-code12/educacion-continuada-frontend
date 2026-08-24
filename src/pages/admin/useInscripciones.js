import { useState, useEffect } from 'react';
import { getEnrollments, updateEnrollmentStatus, downloadEnrollmentsExcel } from '../../services/enrollmentService';

export const useInscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState(null);
    const [inscripcionDetalle, setInscripcionDetalle] = useState(null);
    const [descargandoExcel, setDescargandoExcel] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            try {
                const response = await getEnrollments(categoriaSeleccionada);
                setInscripciones(response.data.enrollments || []);
                
                if (categorias.length === 0 && response.data.categories) {
                    setCategorias(response.data.categories);
                }
            } catch (error) {
                console.error(error);
                setAlerta({ tipo: 'error', texto: 'Error al cargar las inscripciones del sistema.' });
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [categoriaSeleccionada]);

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            await updateEnrollmentStatus(id, nuevoEstado);
            
            setInscripciones(inscripciones.map(insc => 
                insc.id === id ? { ...insc, status: nuevoEstado } : insc
            ));
            
            if (inscripcionDetalle && inscripcionDetalle.id === id) {
                setInscripcionDetalle({ ...inscripcionDetalle, status: nuevoEstado });
            }

            setAlerta({ tipo: 'exito', texto: `El estado ha sido actualizado a ${nuevoEstado}.` });
        } catch (error) {
            console.error(error);
            setAlerta({ tipo: 'error', texto: 'No fue posible actualizar el estado. Inténtelo de nuevo.' });
        } finally {
            setTimeout(() => setAlerta(null), 3500);
        }
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case 'Aprobado': return 'bg-emerald-100 text-emerald-800';
            case 'Rechazado': return 'bg-red-100 text-red-800';
            default: return 'bg-amber-100 text-amber-800';
        }
    };

    const verDetalles = (inscripcion) => {
        setInscripcionDetalle(inscripcion);
    };

    const cerrarDetalles = () => {
        setInscripcionDetalle(null);
    };

    const getFileUrl = (path) => {
        if (!path) return '#';
        if (path.startsWith('http')) return path;
        
        let cleanPath = path;
        if (cleanPath.startsWith('/storage/')) cleanPath = cleanPath.replace('/storage/', '');
        if (cleanPath.startsWith('storage/')) cleanPath = cleanPath.replace('storage/', '');
        if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
        
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        return `${baseUrl.replace(/\/$/, '')}/storage/${cleanPath}`;
    };

    const exportarExcel = async () => {
        setDescargandoExcel(true);
        try {
            const response = await downloadEnrollmentsExcel(categoriaSeleccionada || 'Todas', 'Todos');
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            
            const nombreArchivo = `inscripciones-${categoriaSeleccionada ? categoriaSeleccionada.replace(/\s+/g, '-').toLowerCase() : 'todas'}.xlsx`;
            link.setAttribute('download', nombreArchivo);
            
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            setAlerta({ tipo: 'exito', texto: 'Excel descargado correctamente.' });
        } catch (error) {
            console.error("Error al descargar Excel", error);
            setAlerta({ tipo: 'error', texto: 'No se pudo descargar el archivo. Intente nuevamente.' });
        } finally {
            setDescargandoExcel(false);
            setTimeout(() => setAlerta(null), 3500);
        }
    };

    return {
        inscripciones,
        categorias,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        cargando,
        alerta,
        inscripcionDetalle,
        descargandoExcel,
        cambiarEstado,
        getBadgeColor,
        verDetalles,
        cerrarDetalles,
        getFileUrl,
        exportarExcel
    };
};