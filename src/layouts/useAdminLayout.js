import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../services/authService';

export const useAdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = async () => {
        try {
            await logoutAdmin();
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            navigate('/login');
        }
    };

    const closeMenu = () => setIsMenuOpen(false);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return {
        isActive,
        handleLogout,
        isMenuOpen,
        closeMenu,
        toggleMenu
    };
};