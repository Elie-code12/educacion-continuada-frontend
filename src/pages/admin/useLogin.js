import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/authService';

export const useLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);

        try {
            const response = await loginAdmin(credentials);
            
            const token = response.data.token || response.data.access_token;
            const user = response.data.user;

            if (token) {
                sessionStorage.setItem('admin_token', token);
                sessionStorage.setItem('admin_user', JSON.stringify(user));
                navigate('/admin');
            } else {
                setError('No se recibió el token de acceso.');
            }
            
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 422)) {
                setError('Correo o contraseña incorrectos.');
            } else if (err.response && err.response.status === 429) {
                setError(err.response.data.message);
            } else {
                setError('Ocurrió un error al conectar con el servidor.');
            }
        } finally {
            setCargando(false);
        }
    };

    return {
        credentials,
        error,
        cargando,
        handleChange,
        handleSubmit
    };
};