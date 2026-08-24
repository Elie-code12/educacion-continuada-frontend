import { useState, useEffect } from 'react';
import { getPublicPopups } from '../services/popupService';

export const useOfertasPopup = () => {
    const [ofertas, setOfertas] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('has_seen_ofertas');

        if (!hasSeenPopup) {
            cargarOfertas();
        }
    }, []);

    const cargarOfertas = async () => {
        try {
            const res = await getPublicPopups();
            const activas = res.data.filter(p => p.is_active === 1 || p.is_active === true);

            if (activas.length > 0) {
                setOfertas(activas);
                setIsOpen(true);
                sessionStorage.setItem('has_seen_ofertas', 'true');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSiguiente = () => {
        if (currentIndex < ofertas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsOpen(false);
        }
    };

    const handleCerrar = () => {
        setIsOpen(false);
    };

    return {
        ofertas,
        currentIndex,
        isOpen,
        handleSiguiente,
        handleCerrar
    };
};