import { useOfertasPopup } from './useOfertasPopup';

export default function OfertasPopup() {
    const {
        ofertas,
        currentIndex,
        isOpen,
        handleSiguiente,
        handleCerrar
    } = useOfertasPopup();

    if (!isOpen || ofertas.length === 0) return null;

    const ofertaActual = ofertas[currentIndex];
    
    const imageUrl = `http://localhost:8000/storage/${ofertaActual.image_path}`;

    const renderImagen = () => {
        const imgClass = "max-w-full max-h-full object-contain drop-shadow-sm rounded mx-auto";
        
        if (ofertaActual.link) {
            return (
                <a 
                    href={ofertaActual.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleCerrar}
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                    <img src={imageUrl} alt="Oferta" className={imgClass} />
                </a>
            );
        }
        
        return <img src={imageUrl} alt="Oferta" className={imgClass} />;
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            
            <div className="bg-white rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh]">
                
                <button 
                    onClick={handleCerrar} 
                    className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                    ✕
                </button>

                <div className="relative w-full max-h-[85vh] bg-slate-50 flex items-center justify-center p-1 md:p-2 overflow-hidden flex-shrink-0">
                    {renderImagen()}
                </div>

                {ofertas.length > 1 && (
                    <div className="p-4 text-center bg-white border-t border-slate-100 flex flex-col items-center justify-center">
                        {currentIndex < ofertas.length - 1 && (
                            <button 
                                onClick={handleSiguiente} 
                                className="px-8 py-2.5 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors mb-2 shadow-sm"
                            >
                                Siguiente Oferta
                            </button>
                        )}
                        <p className="text-xs text-slate-400 font-medium">
                            {currentIndex + 1} de {ofertas.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}