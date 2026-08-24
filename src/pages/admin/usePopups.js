import { useState, useEffect } from 'react';
import { getPopups, createPopup, togglePopup, deletePopup } from '../../services/publicidadService';

export const usePopups = () => {
    const [popups, setPopups] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoPopup, setNuevoPopup] = useState({ title: '', link: '', image: null });
    const [guardando, setGuardando] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const apiUrl = 'http://localhost:8000/storage/';

    useEffect(() => {
        cargarData();
    }, []);

    const cargarData = async () => {
        try {
            const res = await getPopups();
            setPopups(res.data);
        } catch (error) {
            mostrarAlerta('error', 'Error al cargar las ofertas');
        }
    };

    const mostrarAlerta = (tipo, texto) => {
        setAlerta({ tipo, texto });
        setTimeout(() => setAlerta(null), 3000);
    };

    const handleSubir = async (e) => {
        e.preventDefault();
        if (!nuevoPopup.image) return;

        setGuardando(true);
        const formData = new FormData();
        formData.append('title', nuevoPopup.title);
        formData.append('image', nuevoPopup.image);
        if (nuevoPopup.link) formData.append('link', nuevoPopup.link);

        try {
            await createPopup(formData);
            mostrarAlerta('exito', 'Oferta subida exitosamente');
            setModalAbierto(false);
            setNuevoPopup({ title: '', link: '', image: null });
            cargarData();
        } catch (error) {
            mostrarAlerta('error', 'Error al subir la imagen');
        } finally {
            setGuardando(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            const res = await togglePopup(id);
            setPopups(popups.map(p => p.id === id ? { ...p, is_active: res.data.is_active } : p));
        } catch (error) {
            mostrarAlerta('error', 'Error al cambiar el estado');
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Eliminar oferta permanentemente?')) return;
        try {
            await deletePopup(id);
            setPopups(popups.filter(p => p.id !== id));
            mostrarAlerta('exito', 'Oferta eliminada');
        } catch (error) {
            mostrarAlerta('error', 'Error al eliminar');
        }
    };

    return {
        popups,
        modalAbierto,
        setModalAbierto,
        nuevoPopup,
        setNuevoPopup,
        guardando,
        alerta,
        apiUrl,
        handleSubir,
        handleToggle,
        handleEliminar
    };
};