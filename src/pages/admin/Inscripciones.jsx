import { useInscripciones } from './useInscripciones';

export default function Inscripciones() {
    const {
        inscripciones,
        categorias,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        cargando,
        alerta,
        inscripcionDetalle,
        descargandoExcel,
        cambiarEstado,
        getBadgeColor,
        verDetalles,
        cerrarDetalles,
        getFileUrl,
        exportarExcel
    } = useInscripciones();

    const documentoIdentidad = inscripcionDetalle?.id_document_path;
    const documentoAval = inscripcionDetalle?.approval_document_path;

    return (
        <div className="space-y-6 relative">
            
            {alerta && (
                <div className="fixed bottom-4 left-4 right-4 md:bottom-10 md:left-auto md:right-10 z-[60] animate-fadeIn">
                    <div className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 ${alerta.tipo === 'exito' ? 'bg-brand/10 text-brand border-brand/20' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        <span className="font-bold text-sm">{alerta.texto}</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Inscripciones</h2>
                    <p className="text-slate-500 mt-1 text-xs md:text-sm">Gestión y revisión de solicitudes de aspirantes.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                    <select 
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="w-full sm:w-auto p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-brand focus:border-brand outline-none bg-white cursor-pointer"
                    >
                        <option value="">Todas las Categorías</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <button 
                        onClick={exportarExcel}
                        disabled={descargandoExcel}
                        className={`w-full sm:w-auto px-5 py-2.5 justify-center text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2 ${descargandoExcel ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand hover:bg-cyan-600'}`}
                    >
                        {descargandoExcel ? '⏳ Generando...' : '↓ Exportar Excel'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                
                <div className="md:hidden flex flex-col divide-y divide-slate-100">
                    {cargando ? (
                        <div className="p-8 text-center text-slate-500 text-sm">Cargando información...</div>
                    ) : inscripciones.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">No hay registros para los filtros seleccionados.</div>
                    ) : (
                        inscripciones.map((insc) => (
                            <div key={insc.id} className="p-4 space-y-3">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-slate-800 capitalize truncate">{insc.student?.full_name?.toLowerCase()}</p>
                                        <p className="text-xs text-slate-500">{insc.student?.doc_type} {insc.student?.doc_number}</p>
                                    </div>
                                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getBadgeColor(insc.status)}`}>
                                        {insc.status}
                                    </span>
                                </div>
                                
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Programa de Interés</p>
                                    <p className="font-bold text-brand text-sm leading-snug">
                                        {insc.course?.title || 'Programa no disponible'}
                                    </p>
                                    <p className="text-[10px] text-slate-500 uppercase mt-1">{insc.course?.category}</p>
                                </div>

                                <div className="flex gap-2 pt-1">
                                    <button 
                                        onClick={() => verDetalles(insc)}
                                        className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-200 transition-colors"
                                    >
                                        Ver Detalles
                                    </button>
                                    <select 
                                        value={insc.status}
                                        onChange={(e) => cambiarEstado(insc.id, e.target.value)}
                                        className="flex-1 px-2 py-2 border border-slate-300 font-bold rounded-lg outline-none text-xs bg-white cursor-pointer hover:border-brand focus:border-brand"
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Aprobado">Aprobar</option>
                                        <option value="Rechazado">Rechazar</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                                <th className="p-4 font-bold">Aspirante</th>
                                <th className="p-4 font-bold">Documento</th>
                                <th className="p-4 font-bold">Programa de Interés</th>
                                <th className="p-4 font-bold">Estado</th>
                                <th className="p-4 font-bold text-right">Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {cargando ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">Cargando información del servidor...</td>
                                </tr>
                            ) : inscripciones.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">No hay registros de inscripciones para los filtros seleccionados.</td>
                                </tr>
                            ) : (
                                inscripciones.map((insc) => (
                                    <tr key={insc.id} className="hover:bg-slate-50/80 transition-colors text-sm text-slate-700">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-800 capitalize">{insc.student?.full_name?.toLowerCase()}</p>
                                            <p className="text-xs text-slate-500">{insc.student?.personal_email}</p>
                                        </td>
                                        <td className="p-4 font-medium">
                                            {insc.student?.doc_type} {insc.student?.doc_number}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-brand max-w-xs truncate" title={insc.course?.title}>
                                                {insc.course?.title || 'Programa no disponible'}
                                            </p>
                                            <p className="text-xs text-slate-500 uppercase">{insc.course?.category}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${getBadgeColor(insc.status)}`}>
                                                {insc.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                            <button 
                                                onClick={() => verDetalles(insc)}
                                                className="px-3 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded hover:bg-slate-200 transition-colors"
                                            >
                                                Ver Detalles
                                            </button>
                                            <select 
                                                value={insc.status}
                                                onChange={(e) => cambiarEstado(insc.id, e.target.value)}
                                                className="px-2 py-1.5 border border-slate-300 font-bold rounded outline-none text-xs bg-white cursor-pointer hover:border-brand focus:border-brand"
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="Aprobado">Aprobar</option>
                                                <option value="Rechazado">Rechazar</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {inscripcionDetalle && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-slate-50 rounded-none md:rounded-3xl shadow-2xl w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden relative">
                        
                        <div className="flex justify-between items-center p-4 md:p-6 bg-white border-b border-slate-100 sticky top-0 z-10 shrink-0">
                            <div className="overflow-hidden pr-2">
                                <h3 className="text-lg md:text-xl font-extrabold text-slate-800 truncate">Expediente de Inscripción</h3>
                                <p className="text-[10px] md:text-xs font-bold text-brand uppercase mt-0.5 md:mt-1">Ref: #{inscripcionDetalle.id}</p>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                <span className={`hidden sm:inline-block px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide border ${getBadgeColor(inscripcionDetalle.status)}`}>
                                    ESTADO: {inscripcionDetalle.status}
                                </span>
                                <button onClick={cerrarDetalles} className="w-8 h-8 md:w-9 md:h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-bold shrink-0">✕</button>
                            </div>
                        </div>

                        <div className="p-4 md:p-8 overflow-y-auto flex-1 space-y-4 md:space-y-6">
                            
                            <div className="sm:hidden mb-2">
                                <span className={`inline-block px-4 py-2 w-full text-center rounded-lg text-xs font-bold uppercase tracking-wide border ${getBadgeColor(inscripcionDetalle.status)}`}>
                                    Estado Actual: {inscripcionDetalle.status}
                                </span>
                            </div>

                            <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b border-slate-100 pb-2">1. Información Personal</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Nombre Completo</p>
                                        <p className="text-sm font-bold text-slate-800 capitalize">{inscripcionDetalle.student?.full_name?.toLowerCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Documento</p>
                                        <p className="text-sm font-bold text-slate-800">{inscripcionDetalle.student?.doc_type} {inscripcionDetalle.student?.doc_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Expedición</p>
                                        <p className="text-sm font-medium text-slate-700">{inscripcionDetalle.student?.expedition_date} - {inscripcionDetalle.student?.expedition_place}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Nacimiento y Edad</p>
                                        <p className="text-sm font-medium text-slate-700">{inscripcionDetalle.student?.birth_date} ({inscripcionDetalle.student?.age} años)</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Lugar de Residencia</p>
                                        <p className="text-sm font-medium text-slate-700">{inscripcionDetalle.student?.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Dirección Exacta</p>
                                        <p className="text-sm font-medium text-slate-700">{inscripcionDetalle.student?.address}</p>
                                    </div>
                                    <div className="sm:col-span-2 md:col-span-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Contacto</p>
                                        <p className="text-sm font-medium text-slate-700">Cel: {inscripcionDetalle.student?.phone_number}</p>
                                        <p className="text-xs font-medium text-brand truncate">{inscripcionDetalle.student?.personal_email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Datos Demográficos</p>
                                        <p className="text-sm font-medium text-slate-700">Sexo: {inscripcionDetalle.student?.gender} | RH: {inscripcionDetalle.student?.blood_type}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b border-slate-100 pb-2">2. Perfil Académico (UT)</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">¿Estudiante Activo UT?</p>
                                            <p className="text-sm font-bold text-slate-800">{inscripcionDetalle.extra_details?.is_ut_student === 'yes' ? 'Sí, activo' : 'No'}</p>
                                        </div>
                                        
                                        {inscripcionDetalle.extra_details?.is_ut_student === 'yes' && (
                                            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                                <div className="sm:col-span-2">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Programa</p>
                                                    <p className="text-sm font-bold text-slate-800">{inscripcionDetalle.extra_details?.academic_program} - {inscripcionDetalle.extra_details?.semester}° Semestre</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Código</p>
                                                    <p className="text-sm font-medium text-slate-700">{inscripcionDetalle.extra_details?.student_code}</p>
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Correo Institucional</p>
                                                    <p className="text-xs font-medium text-brand truncate">{inscripcionDetalle.student?.institutional_email}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Títulos Obtenidos</p>
                                            <p className="text-sm font-bold text-slate-800 mb-1">{inscripcionDetalle.extra_details?.has_degree === 'yes' ? 'Registra títulos finalizados' : 'Ninguno registrado'}</p>
                                            {inscripcionDetalle.extra_details?.has_degree === 'yes' && (
                                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs font-medium text-slate-700">
                                                    {inscripcionDetalle.extra_details?.degrees_info}
                                                    <span className="block mt-2 font-bold text-brand">¿Egresado UT?: {inscripcionDetalle.extra_details?.is_ut_graduate === 'yes' ? 'Sí' : 'No'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6 flex flex-col">
                                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                                        <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b border-slate-100 pb-2">3. Detalles del Programa</h4>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Curso / Diplomado Solicitado</p>
                                            <p className="text-sm font-extrabold text-slate-800">{inscripcionDetalle.course?.title}</p>
                                            <p className="text-xs font-bold text-brand mt-1 uppercase">{inscripcionDetalle.course?.category}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
                                        <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b border-slate-100 pb-2">Soporte Documental</h4>
                                        <div className="space-y-3">
                                            {documentoIdentidad ? (
                                                <a 
                                                    href={getFileUrl(documentoIdentidad)}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-brand hover:bg-brand/5 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                                                        <span className="text-xl opacity-50 group-hover:text-brand transition-colors shrink-0">📄</span>
                                                        <span className="text-sm font-bold text-slate-700 group-hover:text-brand transition-colors truncate">Documento de Identidad</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-brand shrink-0">Ver PDF</span>
                                                </a>
                                            ) : null}

                                            {documentoAval ? (
                                                <a 
                                                    href={getFileUrl(documentoAval)}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-brand hover:bg-brand/5 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                                                        <span className="text-xl opacity-50 group-hover:text-brand transition-colors shrink-0">📑</span>
                                                        <span className="text-sm font-bold text-slate-700 group-hover:text-brand transition-colors truncate">Aval Opción de Grado</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-brand shrink-0">Ver PDF</span>
                                                </a>
                                            ) : null}

                                            {!documentoIdentidad && !documentoAval && (
                                                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                                    <p className="text-xs font-medium text-slate-500 italic">No se encontraron documentos adjuntos para esta inscripción.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center text-[10px] text-slate-400 pt-2 md:pt-4 border-t border-slate-200 pb-4 md:pb-0">
                                Fecha de solicitud: {new Date(inscripcionDetalle.created_at).toLocaleString('es-CO')}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}