import { useCertificateStudent } from './useCertificateStudent';
import iconCertificado from '../../assets/Certificaciones.png';

export default function CertificateStudent() {
    const {
        formData,
        cargando,
        resultados,
        error,
        descargandoId,
        handleChange,
        manejarBusqueda,
        descargarPdf,
        limpiarBusqueda
    } = useCertificateStudent();

    return (
        <div className="flex justify-center items-start pt-12 pb-24 px-6 bg-slate-50 min-h-[70vh]">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-lg transition-all duration-300 mt-4 sm:mt-8">
                
                {!resultados ? (
                    <div className="animate-fadeIn">
                        
                        <h2 className="text-2xl font-bold text-center text-slate-800 mb-3">Consulta de Certificados</h2>
                        
                        <div className="flex justify-center mb-4">
                            <img 
                                src={iconCertificado} 
                                alt="Certificaciones" 
                                className="w-20 h-20 object-contain drop-shadow-sm"
                            />
                        </div>

                        <p className="text-slate-500 text-center mb-8 text-sm">Ingresa tus datos para buscar y descargar tu constancia.</p>
                        
                        <form onSubmit={manejarBusqueda} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Tipo de Documento *</label>
                                <select 
                                    name="doc_type" 
                                    required 
                                    value={formData.doc_type} 
                                    onChange={handleChange} 
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white focus:border-brand focus:ring-1 focus:ring-brand text-sm"
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                                    <option value="TI">Tarjeta de Identidad (TI)</option>
                                    <option value="CE">Cédula de Extranjería (CE)</option>
                                    <option value="PPT">Permiso de Protección Temporal (PPT)</option>
                                    <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Número de Documento *</label>
                                <input
                                    type="text"
                                    name="doc_number"
                                    value={formData.doc_number}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Fecha de Expedición (Doc) *</label>
                                <input
                                    type="date"
                                    name="expedition_date"
                                    value={formData.expedition_date}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={cargando} 
                                className="w-full py-3 mt-4 bg-brand text-white rounded-lg font-bold hover:bg-brand-dark disabled:opacity-50 transition-colors shadow-sm"
                            >
                                {cargando ? 'Buscando...' : 'Buscar Certificado'}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg text-sm text-center font-bold">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-fadeIn">
                        
                        <button 
                            onClick={limpiarBusqueda}
                            className="text-slate-400 hover:text-brand transition-colors mb-2 block"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </button>

                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <img 
                                    src={iconCertificado} 
                                    alt="Certificaciones" 
                                    className="w-16 h-16 object-contain drop-shadow-sm"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                                ¡Hola, {resultados[0].student_name}!
                            </h3>
                            <p className="text-slate-500 mt-2 text-sm">Estas son tus certificaciones disponibles:</p>
                        </div>
                        
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {resultados.map((cert) => (
                                <div key={cert.id} className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-brand/30 transition-colors">
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 text-sm leading-snug">{cert.course?.title || 'Programa Aprobado'}</p>
                                        <p className="text-xs font-mono text-slate-500 mt-1">Código: <span className="font-semibold">{cert.verification_code}</span></p>
                                    </div>
                                    <button 
                                        onClick={() => descargarPdf(cert.id, cert.verification_code)}
                                        disabled={descargandoId === cert.id}
                                        className="w-full sm:w-auto px-5 py-2 bg-brand text-white text-xs font-bold rounded-lg hover:bg-brand-dark disabled:opacity-50 transition-colors shadow-sm whitespace-nowrap"
                                    >
                                        {descargandoId === cert.id ? 'Descargando...' : 'Descargar PDF'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}