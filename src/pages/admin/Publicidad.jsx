import { useState } from 'react';
import iconoTexto from '../../assets/EditarTexto.png'; 
import iconoPublicidad from '../../assets/Publicidad.png'; 
import Textos from './Textos'; 
import Popups from './Popups'; 

export default function Publicidad() {
    const [subModulo, setSubModulo] = useState(null); 

    return (
        <div className="space-y-6 relative">
            {subModulo === null && (
                <div className="space-y-10 animate-fadeIn pt-4">
                    
                    {/* Título limpio sin fondo blanco */}
                    <div className="px-6">
                        <h2 className="text-2xl font-bold text-slate-800">Publicidad y Textos</h2>
                    </div>

                    {/* Contenedor centrado solo con iconos gigantes y texto */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-40 pt-10">
                        
                        <div 
                            onClick={() => setSubModulo('textos')}
                            className="cursor-pointer flex flex-col items-center text-center group"
                        >
                            <img 
                                src={iconoTexto} 
                                alt="Editar Textos" 
                                className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                            />
                            <h3 className="text-xl font-bold text-slate-700 mt-4 group-hover:text-brand transition-colors">
                                Editar Textos
                            </h3>
                        </div>

                        <div 
                            onClick={() => setSubModulo('ads')}
                            className="cursor-pointer flex flex-col items-center text-center group"
                        >
                            <img 
                                src={iconoPublicidad} 
                                alt="Publicidad" 
                                className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                            />
                            <h3 className="text-xl font-bold text-slate-700 mt-4 group-hover:text-brand transition-colors">
                                Subir Publicidad
                            </h3>
                        </div>
                        
                    </div>
                </div>
            )}

            {subModulo === 'textos' && (
                <div className="animate-fadeIn">
                    <Textos onVolver={() => setSubModulo(null)} />
                </div>
            )}

            {subModulo === 'ads' && (
                <div className="animate-fadeIn">
                    <Popups onVolver={() => setSubModulo(null)} />
                </div>
            )}
        </div>
    );
}