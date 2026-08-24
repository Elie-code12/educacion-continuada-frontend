import { useCertificados } from './useCertificados';

export default function Certificados() {
    const {
        certificados, cargando, alerta, descargandoPdfId,
        modalAbierto, setModalAbierto, docNumber, setDocNumber,
        buscando, studentData, selectedCourse, setSelectedCourse,
        setPdfFile, guardando,
        modoManual, setModoManual, datosManuales, handleDatosManualesChange, todosLosCursos,
        handleBuscarEstudiante, handleSubir, handleEliminar, handleVerPdf, cerrarModal
    } = useCertificados();

    return (
        <div className="space-y-6 relative">
            
            {alerta && (
                <div className="fixed top-8 right-8 z-[9999] animate-fadeIn">
                    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[300px] ${alerta.tipo === 'exito' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' : 'bg-red-50/95 border-red-200 text-red-800'}`}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-inner ${alerta.tipo === 'exito' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            <span className="text-xl leading-none">{alerta.tipo === 'exito' ? '✓' : '✕'}</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-extrabold text-sm mb-0.5">{alerta.tipo === 'exito' ? '¡Operación Exitosa!' : 'Atención'}</p>
                            <p className="text-xs font-medium opacity-90">{alerta.texto}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Certificados</h2>
                    <p className="text-slate-500 mt-1">Gestión de diplomas y constancias</p>
                </div>
                <button 
                    onClick={() => setModalAbierto(true)}
                    className="px-5 py-2.5 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-sm"
                >
                    + Subir Certificado
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                                <th className="p-4 font-semibold">Código</th>
                                <th className="p-4 font-semibold">Estudiante</th>
                                <th className="p-4 font-semibold">Programa</th>
                                <th className="p-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {cargando ? (
                                <tr><td colSpan="4" className="p-4 text-center text-slate-500 py-8">Cargando certificados...</td></tr>
                            ) : certificados.length === 0 ? (
                                <tr><td colSpan="4" className="p-4 text-center text-slate-500 py-8">No hay certificados registrados.</td></tr>
                            ) : (
                                certificados.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                        <td className="p-4 font-mono font-medium text-slate-900">{cert.verification_code}</td>
                                        <td className="p-4">
                                            <p className="font-medium text-slate-900">{cert.student_name}</p>
                                            <p className="text-xs text-slate-500">{cert.doc_type} {cert.doc_number}</p>
                                        </td>
                                        <td className="p-4 max-w-xs truncate">{cert.course?.title}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button 
                                                onClick={() => handleVerPdf(cert.id)}
                                                disabled={descargandoPdfId === cert.id}
                                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 text-xs font-semibold disabled:opacity-50"
                                            >
                                                {descargandoPdfId === cert.id ? 'Cargando...' : 'Ver PDF'}
                                            </button>
                                            <button 
                                                onClick={() => handleEliminar(cert.id)}
                                                className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-xs font-semibold"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalAbierto && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-0 shadow-xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        
                        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-800">Vincular Nuevo Certificado</h3>
                            <button onClick={cerrarModal} className="text-slate-400 hover:text-slate-600 text-xl font-bold transition-colors">✕</button>
                        </div>

                        <div className="flex border-b border-slate-200 shrink-0 bg-white">
                            <button 
                                onClick={() => setModoManual(false)} 
                                className={`flex-1 py-3 text-sm font-bold transition-colors ${!modoManual ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                Buscar en Sistema
                            </button>
                            <button 
                                onClick={() => setModoManual(true)} 
                                className={`flex-1 py-3 text-sm font-bold transition-colors ${modoManual ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                Ingreso Manual
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {!modoManual ? (
                                <div>
                                    <form onSubmit={handleBuscarEstudiante} className="flex gap-2 mb-6">
                                        <input 
                                            type="text" 
                                            placeholder="Número de Documento del estudiante..." 
                                            className="flex-1 p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm"
                                            value={docNumber}
                                            onChange={(e) => setDocNumber(e.target.value)}
                                            disabled={buscando}
                                        />
                                        <button 
                                            type="submit"
                                            disabled={buscando || !docNumber.trim()}
                                            className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors shadow-sm"
                                        >
                                            {buscando ? 'Buscando...' : 'Buscar'}
                                        </button>
                                    </form>

                                    {studentData && (
                                        <form onSubmit={handleSubir} className="space-y-4 animate-fadeIn">
                                            <div className="p-4 bg-brand/5 rounded-xl border border-brand/20">
                                                <p className="text-sm font-bold text-slate-800">{studentData.student_name}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Expedición: {studentData.expedition_date}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Programa Aprobado *</label>
                                                <select 
                                                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white focus:border-brand focus:ring-1 focus:ring-brand text-sm disabled:bg-slate-50"
                                                    value={selectedCourse}
                                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Seleccione el programa...</option>
                                                    {studentData.courses.map(c => (
                                                        <option 
                                                            key={c.id} 
                                                            value={c.id} 
                                                            disabled={c.has_certificate}
                                                            className={c.has_certificate ? 'text-slate-400 bg-slate-50' : 'text-slate-800'}
                                                        >
                                                            {c.title} {c.has_certificate ? '(Ya certificado)' : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Archivo PDF del Certificado *</label>
                                                <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer disabled:opacity-50" required disabled={!selectedCourse} />
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <button type="submit" disabled={guardando || !selectedCourse} className="w-full py-3 bg-brand text-white rounded-lg font-bold hover:bg-brand-dark disabled:opacity-50 transition-colors shadow-sm">
                                                    {guardando ? 'Guardando...' : 'Subir Certificado'}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={handleSubir} className="space-y-4 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Doc. *</label>
                                            <select name="doc_type" required value={datosManuales.doc_type} onChange={handleDatosManualesChange} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white focus:border-brand text-sm">
                                                <option value="">Seleccione...</option>
                                                <option value="CC">Cédula de Ciudadanía (CC)</option>
                                                <option value="TI">Tarjeta de Identidad (TI)</option>
                                                <option value="CE">Cédula de Extranjería (CE)</option>
                                                <option value="PPT">Permiso de Protección Temporal (PPT)</option>
                                                <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Número de Doc. *</label>
                                            <input type="text" required value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand text-sm" placeholder="Ej: 1110000" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Nombres y Apellidos *</label>
                                        <input type="text" name="student_name" required value={datosManuales.student_name} onChange={handleDatosManualesChange} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand text-sm" placeholder="Nombre completo del estudiante" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Expedición (Doc) *</label>
                                        <input type="date" name="expedition_date" required value={datosManuales.expedition_date} onChange={handleDatosManualesChange} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand text-sm" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Programa Académico (Todos) *</label>
                                        <select required value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white focus:border-brand text-sm">
                                            <option value="" disabled>Seleccione el curso a certificar...</option>
                                            {todosLosCursos.map(c => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Archivo PDF del Certificado *</label>
                                        <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer" required />
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
                                        <button type="submit" disabled={guardando} className="w-full py-3 bg-brand text-white rounded-lg font-bold hover:bg-brand-dark disabled:opacity-50 transition-colors shadow-sm">
                                            {guardando ? 'Guardando...' : 'Subir Certificado Manual'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}