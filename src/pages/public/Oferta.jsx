import { useOferta } from './useOferta';
import bannerImg from '../../assets/Banner.png';
import TextPublic from './TextPublic';
import CursoDetalle from './CursoDetalle';

export default function Oferta() {
    const {
        cursos,
        categorias,
        textos,
        cargando,
        categoriaActiva,
        setCategoriaActiva,
        modalActivo,
        setModalActivo,
        cursoSeleccionado,
        setCursoSeleccionado,
        titulosModal,
        getImagenSrc
    } = useOferta();

    return (
        <div className="w-full relative bg-slate-50 min-h-screen">
            <section className="w-full bg-white shadow-sm">
                <img 
                    src={bannerImg} 
                    alt="Banner Educación Continuada" 
                    className="w-full h-auto object-cover"
                />
            </section>

            <TextPublic onAbrirModal={setModalActivo} />

            {modalActivo && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden animate-fadeIn">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-2xl font-bold text-slate-800">
                                {titulosModal[modalActivo]}
                            </h3>
                            <button 
                                onClick={() => setModalActivo(null)}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto">
                            <div 
                                className="prose prose-slate max-w-none"
                                dangerouslySetInnerHTML={{ __html: textos[modalActivo] || '<p></p>' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <CursoDetalle 
                curso={cursoSeleccionado} 
                onClose={() => setCursoSeleccionado(null)} 
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800">Nuestros Programas</h2>
                    <div className="w-20 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button 
                        onClick={() => setCategoriaActiva(null)}
                        className={`px-6 py-2.5 rounded-full font-medium transition-all ${categoriaActiva === null ? 'bg-brand text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand'}`}
                    >
                        Todos
                    </button>
                    {categorias.map((cat, index) => (
                        <button 
                            key={index}
                            onClick={() => setCategoriaActiva(cat)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all ${categoriaActiva === cat ? 'bg-brand text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {cargando ? (
                    <div className="text-center py-20 text-slate-500 font-medium">Cargando programas...</div>
                ) : cursos.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-medium">No hay programas disponibles en esta categoría.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {cursos.map(curso => {
                            const imagenSrc = getImagenSrc(curso);

                            return (
                                <div key={curso.id} className="w-full max-w-[280px] relative bg-cyan-50 rounded-2xl shadow-sm border border-cyan-200 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

                                    <div className="absolute top-0 left-0 w-full h-1 bg-brand z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="h-36 bg-cyan-100 flex items-center justify-center overflow-hidden relative">
                                        {imagenSrc ? (
                                            <img 
                                                src={imagenSrc} 
                                                alt={curso.title} 
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                onError={(e) => { 
                                                    e.target.onerror = null; 
                                                    e.target.src = 'https://placehold.co/600x400?text=Error+En+Ruta+Laravel'; 
                                                }}
                                            />
                                        ) : (
                                            <span className="text-cyan-600 font-medium text-sm">Sin imagen</span>
                                        )}
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="inline-block px-2 py-1 bg-white text-cyan-700 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                                                {curso.category}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-center text-slate-800 mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-300">
                                            {curso.title}
                                        </h3>

                                        <button 
                                            onClick={() => setCursoSeleccionado(curso)}
                                            className="w-full text-center mt-auto py-2 bg-white border border-cyan-200 text-cyan-700 text-xs font-bold rounded-lg shadow-sm group-hover:border-brand group-hover:bg-brand group-hover:text-white transition-all duration-300"
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}