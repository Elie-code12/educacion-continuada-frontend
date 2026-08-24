import { Link } from 'react-router-dom';

import fondoDashboard from '../../assets/Fondo.png';
import iconoOferta from '../../assets/Oferta.png';
import iconoInscripciones from '../../assets/Inscripciones.png';
import iconoPublicidad from '../../assets/Publicidad.png';
import iconoCertificados from '../../assets/Certificaciones.png';

export default function Dashboard() {
    return (
        <div
            className="relative w-full h-full min-h-[calc(100vh-80px)] bg-cover bg-center bg-no-repeat -m-4 p-4 md:-m-6 md:p-6"
            style={{ backgroundImage: `url('${fondoDashboard}')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/60"></div>

            <div className="relative z-10 space-y-4 md:space-y-6">
                
                <div className="inline-block w-full md:w-auto bg-slate-900/40 backdrop-blur-md p-4 md:p-5 rounded-xl border border-white/10 shadow-lg text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">¡Hola! ¿Qué deseas gestionar hoy?</h2>
                    <p className="text-sm md:text-base text-slate-200 mt-1 font-medium">Selecciona un módulo para continuar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
                  
                    <Link to="/admin/cursos" className="block p-5 md:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-brand-light group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-brand-light flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 shadow-inner">
                            <img src={iconoOferta} alt="Oferta Académica" className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">Oferta Académica</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Crear y gestionar diplomados, seminarios y cursos.</p>
                    </Link>

                    <Link to="/admin/inscripciones" className="block p-5 md:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-brand-light group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 shadow-inner">
                            <img src={iconoInscripciones} alt="Inscripciones" className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">Inscripciones</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Revisar y gestiona registros.</p>
                    </Link>

                    <Link to="/admin/contenido" className="block p-5 md:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-brand-light group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-fuchsia-50 flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 shadow-inner">
                            <img src={iconoPublicidad} alt="Publicidad y Textos" className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">Publicidad y Textos</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Editar inicio, información y subir Pop-ups.</p>
                    </Link>

                    <Link to="/admin/certificados" className="block p-5 md:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-brand-light group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 shadow-inner">
                            <img src={iconoCertificados} alt="Certificados" className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">Certificados</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Cargar y administrar diplomas.</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}