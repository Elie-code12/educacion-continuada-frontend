import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Dashboard from '../pages/admin/Dashboard';
import Cursos from '../pages/admin/Cursos.jsx';
import NuevoCurso from '../pages/admin/NuevoCurso.jsx';
import EditarCurso from '../pages/admin/EditarCurso.jsx';
import Inscripciones from '../pages/admin/Inscripciones.jsx';
import Certificados from '../pages/admin/Certificados.jsx';
import Publicidad from '../pages/admin/Publicidad.jsx';
import Login from '../pages/admin/Login.jsx';
import Oferta from '../pages/public/Oferta.jsx';
import CursoDetalle from '../pages/public/CursoDetalle.jsx'; 
import CertificateStudent from '../pages/public/CertificateStudent.jsx';

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('admin_token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Oferta />} />
                    <Route path="/curso/:id" element={<CursoDetalle />} /> 
                    <Route path="/certificados" element={<CertificateStudent />} />
                </Route>
                
                <Route path="/login" element={<Login />} />

                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="cursos" element={<Cursos />} />
                    <Route path="cursos/nuevo" element={<NuevoCurso />} />
                    <Route path="cursos/editar/:id" element={<EditarCurso />} />
                    <Route path="inscripciones" element={<Inscripciones />} />
                    <Route path="certificados" element={<Certificados />} />
                    <Route path="contenido" element={<Publicidad />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}