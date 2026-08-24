import { Link, Outlet } from 'react-router-dom';
import { useAdminLayout } from './useAdminLayout';

import logoUt from '../assets/Logo.png';
import iconoOferta from '../assets/Oferta.png';
import iconoInscripciones from '../assets/Inscripciones.png';
import iconoPublicidad from '../assets/Publicidad.png';
import iconoCertificados from '../assets/Certificaciones.png';

export default function AdminLayout() {
    const { 
        isActive, 
        handleLogout, 
        isMenuOpen, 
        closeMenu, 
        toggleMenu 
    } = useAdminLayout();

    const claseActiva = "flex items-center gap-3 px-4 py-3 rounded-xl bg-brand text-white font-medium shadow-sm transition-all hover:bg-brand-dark";
    const claseInactiva = "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium transition-all hover:bg-brand-light hover:text-brand-dark";

    return (
        <div className="flex h-screen bg-surface font-sans overflow-hidden">
            
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
                    onClick={closeMenu}
                ></div>
            )}

            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm flex flex-col border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center">
                    <img src={logoUt} alt="Logo Universidad del Tolima" className="w-32 h-auto mb-4 object-contain" />
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Administración
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                        Educación Continuada - UT
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <Link to="/admin" onClick={closeMenu} className={isActive('/admin', true) ? claseActiva : claseInactiva}>
                        Panel Principal
                    </Link>

                    <Link to="/admin/cursos" onClick={closeMenu} className={isActive('/admin/cursos') ? claseActiva : claseInactiva}>
                        <img src={iconoOferta} alt="Oferta" className="w-5 h-5 object-contain filter" />
                        Oferta Académica
                    </Link>

                    <Link to="/admin/inscripciones" onClick={closeMenu} className={isActive('/admin/inscripciones') ? claseActiva : claseInactiva}>
                        <img src={iconoInscripciones} alt="Inscripciones" className="w-5 h-5 object-contain" />
                        Inscripciones
                    </Link>

                    <Link to="/admin/contenido" onClick={closeMenu} className={isActive('/admin/contenido') ? claseActiva : claseInactiva}>
                        <img src={iconoPublicidad} alt="Publicidad" className="w-5 h-5 object-contain" />
                        Publicidad y Textos
                    </Link>

                    <Link to="/admin/certificados" onClick={closeMenu} className={isActive('/admin/certificados') ? claseActiva : claseInactiva}>
                        <img src={iconoCertificados} alt="Certificados" className="w-5 h-5 object-contain" />
                        Certificados
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 font-medium transition-all hover:bg-red-50">
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col w-full overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={toggleMenu} 
                            className="md:hidden p-2 text-slate-600 hover:text-brand focus:outline-none rounded-lg hover:bg-slate-50"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-lg md:text-2xl font-semibold text-slate-800 truncate">Panel de Control</h1>
                    </div>
                    
                    <div className="flex items-center gap-3 md:gap-4">
                        <span className="hidden sm:block text-sm font-medium text-slate-500">Gestión Integral</span>
                        <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold shrink-0">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}