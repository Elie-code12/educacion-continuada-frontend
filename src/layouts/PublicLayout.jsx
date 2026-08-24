import { Link, Outlet } from 'react-router-dom';
import { usePublicLayout } from './usePublicLayout';
import logoUt from '../assets/Logo.png';
import OfertasPopup from '../components/OfertasPopup'; 

export default function PublicLayout() {
    const { 
        scrolled, 
        isMenuOpen, 
        setIsMenuOpen, 
        closeMenu 
    } = usePublicLayout();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 relative">
            
            <OfertasPopup /> 

            <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'py-6 border-b border-slate-100'}`}>
                <div className={`max-w-7xl mx-auto px-4 md:px-8 flex flex-col transition-all duration-300 ${
                    scrolled 
                        ? 'md:flex-row md:justify-between md:items-center' 
                        : 'md:flex-col md:justify-center md:items-center md:gap-5'
                }`}>
                    
                    <div className={`flex items-center justify-between w-full ${scrolled ? 'md:w-auto' : 'md:justify-center'}`}>
                        <img 
                            src={logoUt} 
                            alt="Logo Universidad del Tolima" 
                            className={`transition-all duration-300 object-contain ${scrolled ? 'w-20' : 'w-32 md:w-48'}`} 
                        />
                        
                        <button 
                            className="md:hidden p-2 text-slate-700 hover:text-brand focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    
                    <nav className={`${
                        isMenuOpen ? 'flex' : 'hidden'
                    } md:flex flex-col md:flex-row items-center w-full md:w-auto font-medium text-slate-700 transition-all duration-300 mt-4 md:mt-0 ${
                        scrolled ? 'md:gap-4 md:text-sm' : 'md:gap-6'
                    } gap-4 py-4 md:py-0 border-t md:border-none border-slate-100`}>
                        
                        <Link to="/" className="hover:text-brand transition-colors w-full text-center md:w-auto" onClick={closeMenu}>
                            Inicio
                        </Link>
                        <Link to="/certificados" className="hover:text-brand transition-colors w-full text-center md:w-auto" onClick={closeMenu}>
                            Certificados
                        </Link>
                        <a href="https://tuaulavirtual.ut.edu.co/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors w-full text-center md:w-auto" onClick={closeMenu}>
                            Tu aula virtual
                        </a>
                        <a href="http://mantis.ut.edu.co:8080/tolima/hermesoft/vortal/login/login.jsp" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors w-full text-center md:w-auto" onClick={closeMenu}>
                            Academosoft
                        </a>
                    </nav>
                </div>
            </header>

            <main className="flex-1 pt-40 md:pt-48">
                <Outlet />
            </main>

            <footer className="bg-slate-800 text-slate-300 pt-12 pb-6 mt-auto">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    
                    <div className="flex flex-col gap-3 lg:col-span-2">
                        <div>
                            <h4 className="font-bold text-base md:text-lg uppercase tracking-wide text-[#e83e58]">
                                MARÍA CAMILA NÚÑEZ MARTÍNEZ
                            </h4>
                            <p className="text-slate-400 text-sm font-medium italic mt-1">
                                Coordinación Educación Continuada - Secretaría Académica
                            </p>
                        </div>

                        <div className="mt-2 space-y-3">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-[#e83e58] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <p className="text-sm">Calle 42 # 1-02, Altos de Santa Helena<br />Bloque 31, Piso 2. Ibagué, Tolima</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#e83e58] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <a href="mailto:extension.idead@ut.edu.co" className="text-sm hover:text-white transition-colors">
                                    extension.idead@ut.edu.co
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold mb-1">Enlaces de Interés</h4>
                        <p className="text-sm text-slate-400">Política de Privacidad y Tratamiento de Datos</p>
                        <p className="text-sm text-slate-400">Términos y Condiciones</p>
                        <p className="text-sm text-slate-400">Atención al Ciudadano (PQRS)</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-8 pt-6 border-t border-slate-700 text-xs text-center text-slate-500">
                    <p>© {new Date().getFullYear()} Universidad del Tolima. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}