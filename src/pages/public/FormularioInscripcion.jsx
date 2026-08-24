import { useFormularioInscripcion } from './useFormularioInscripcion';

export default function FormularioInscripcion({ curso, onClose }) {
    if (!curso) return null;

    const {
        isDiplomadoGrado, isSeminarioIngles,
        pasoActual, cargando, error, exito,
        isUtStudent, setIsUtStudent, hasDegree, setHasDegree, isUtGraduate, setIsUtGraduate,
        formData, lugarExpedicion, lugarResidencia, 
        titulos, titulosActivos, agregarCampoTitulo, removerCampoTitulo,
        terminosAceptados, setTerminosAceptados,
        paisesDisponibles, getDepartamentos, getCiudades,
        handleInputChange, handleLocationChange, handleTitulosChange, handleFileChange,
        siguientePaso, pasoAnterior, handleSubmit, isPasoValido
    } = useFormularioInscripcion(curso);

    const opcionesTitulos = [
        { id: 'pregrado', label: 'Título de Pregrado' },
        { id: 'especializacion', label: 'Título de Especialización' },
        { id: 'maestria', label: 'Título de Maestría' },
        { id: 'doctorado', label: 'Título de Doctorado' }
    ];

    if (exito) {
        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl animate-fadeIn">
                    <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Inscripción Exitosa</h3>
                    <p className="text-sm text-slate-600 mb-8">Su solicitud ha sido enviada correctamente al sistema.</p>
                    <button onClick={onClose} className="px-6 py-2.5 bg-brand text-white text-sm font-bold rounded-full hover:bg-cyan-600 transition-colors w-full shadow-lg shadow-brand/30">Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm md:p-4">
            <div className="bg-white md:rounded-3xl w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn relative">
                
                <div className="px-5 md:px-8 py-5 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-20">
                    <div className="pr-10">
                        <h2 className="text-lg md:text-xl font-extrabold text-slate-800 line-clamp-1">{curso.title}</h2>
                        <span className="text-[10px] md:text-xs font-bold text-brand uppercase tracking-wider block mt-0.5">
                            {curso.mode || 'Virtual'} | {curso.category}
                        </span>
                    </div>
                    <button onClick={onClose} className="absolute right-4 top-4 w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-lg font-bold">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8">
                    
                    <div className="flex justify-between bg-white p-2 rounded-2xl mb-6 shadow-sm border border-slate-100 w-full mx-auto">
                        <span className={`text-[10px] md:text-xs font-bold px-2 py-2 rounded-xl text-center w-1/3 transition-colors ${pasoActual === 1 ? 'bg-brand text-white shadow-md' : 'text-slate-400'}`}>1. Identidad</span>
                        <span className={`text-[10px] md:text-xs font-bold px-2 py-2 rounded-xl text-center w-1/3 transition-colors ${pasoActual === 2 ? 'bg-brand text-white shadow-md' : 'text-slate-400'}`}>2. Académico</span>
                        <span className={`text-[10px] md:text-xs font-bold px-2 py-2 rounded-xl text-center w-1/3 transition-colors ${pasoActual === 3 ? 'bg-brand text-white shadow-md' : 'text-slate-400'}`}>3. Requisitos</span>
                    </div>

                    {error && (
                        <div className="bg-red-50 p-4 rounded-xl mb-6 border border-red-200 w-full mx-auto">
                            <p className="font-bold text-red-700 text-sm mb-1">Inscripción no procesada</p>
                            <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full mx-auto pb-6" noValidate>
                        
                        {/* PASO 1 */}
                        <div className={pasoActual === 1 ? 'block animate-fadeIn' : 'hidden'}>
                            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Nombre Completo *</label>
                                        <input type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} placeholder="Nombres y apellidos completos" className="w-full bg-slate-50 border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand" />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Tipo de Documento *</label>
                                        <select name="doc_type" required value={formData.doc_type} onChange={handleInputChange} className="w-full max-w-full truncate bg-slate-50 border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
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
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Número de Documento *</label>
                                        <input type="text" name="doc_number" required value={formData.doc_number} onChange={handleInputChange} placeholder="Ej: 1110000000" className="w-full bg-slate-50 border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                    </div>

                                    <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <label className="block text-[11px] font-extrabold text-slate-500 uppercase mb-3">Fecha de Nacimiento *</label>
                                        <div className="flex gap-2 w-full md:w-1/2">
                                            <input type="date" name="birth_date" required value={formData.birth_date} onChange={handleInputChange} className="w-full bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            <input type="text" readOnly value={formData.age ? `${formData.age} años` : ''} placeholder="Edad" className="w-20 bg-slate-100 border border-slate-200 p-2.5 text-sm rounded-lg text-center text-slate-500 cursor-not-allowed" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <label className="block text-[11px] font-extrabold text-slate-500 uppercase mb-3">Expedición del Documento *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                            <select required value={lugarExpedicion.paisCode} onChange={(e) => handleLocationChange('expedicion', 'pais', e.target.value)} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
                                                <option value="">País...</option>
                                                {paisesDisponibles.map(pais => (
                                                    <option key={pais.isoCode} value={pais.isoCode}>{pais.name}</option>
                                                ))}
                                            </select>
                                            <select required value={lugarExpedicion.deptoCode} onChange={(e) => handleLocationChange('expedicion', 'departamento', e.target.value)} disabled={!lugarExpedicion.paisCode} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand disabled:opacity-50 disabled:bg-slate-100">
                                                <option value="">Departamento...</option>
                                                {getDepartamentos(lugarExpedicion.paisCode).map(depto => (
                                                    <option key={depto.isoCode} value={depto.isoCode}>{depto.name}</option>
                                                ))}
                                            </select>
                                            <select required value={lugarExpedicion.ciudadName} onChange={(e) => handleLocationChange('expedicion', 'ciudad', e.target.value)} disabled={!lugarExpedicion.deptoCode} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand disabled:opacity-50 disabled:bg-slate-100">
                                                <option value="">Municipio...</option>
                                                {getCiudades(lugarExpedicion.paisCode, lugarExpedicion.deptoCode).map(ciudad => (
                                                    <option key={ciudad.name} value={ciudad.name}>{ciudad.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/3 mt-2">
                                            <input type="date" name="expedition_date" required value={formData.expedition_date} onChange={handleInputChange} className="w-full bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <label className="block text-[11px] font-extrabold text-slate-500 uppercase mb-3">Lugar de Residencia *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                                            <select required value={lugarResidencia.paisCode} onChange={(e) => handleLocationChange('residencia', 'pais', e.target.value)} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
                                                <option value="">País...</option>
                                                {paisesDisponibles.map(pais => (
                                                    <option key={pais.isoCode} value={pais.isoCode}>{pais.name}</option>
                                                ))}
                                            </select>
                                            <select required value={lugarResidencia.deptoCode} onChange={(e) => handleLocationChange('residencia', 'departamento', e.target.value)} disabled={!lugarResidencia.paisCode} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand disabled:opacity-50 disabled:bg-slate-100">
                                                <option value="">Departamento...</option>
                                                {getDepartamentos(lugarResidencia.paisCode).map(depto => (
                                                    <option key={depto.isoCode} value={depto.isoCode}>{depto.name}</option>
                                                ))}
                                            </select>
                                            <select required value={lugarResidencia.ciudadName} onChange={(e) => handleLocationChange('residencia', 'ciudad', e.target.value)} disabled={!lugarResidencia.deptoCode} className="w-full max-w-full truncate bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand disabled:opacity-50 disabled:bg-slate-100">
                                                <option value="">Municipio...</option>
                                                {getCiudades(lugarResidencia.paisCode, lugarResidencia.deptoCode).map(ciudad => (
                                                    <option key={ciudad.name} value={ciudad.name}>{ciudad.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Dirección Exacta *</label>
                                                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="Ej: Calle 42 #3-12" className="w-full bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Correo Personal *</label>
                                                <input type="email" name="personal_email" required value={formData.personal_email} onChange={handleInputChange} placeholder="ejemplo@correo.com" className="w-full bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Celular / WhatsApp *</label>
                                                <input type="tel" name="phone_number" required value={formData.phone_number} onChange={handleInputChange} placeholder="Ej: 315XXXXXXX" className="w-full bg-white border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Tipo de Sangre *</label>
                                        <select name="blood_type" required value={formData.blood_type} onChange={handleInputChange} className="w-full max-w-full truncate bg-slate-50 border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
                                            <option value="">Seleccione...</option>
                                            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Sexo *</label>
                                        <select name="gender" required value={formData.gender} onChange={handleInputChange} className="w-full max-w-full truncate bg-slate-50 border border-slate-200 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
                                            <option value="">Seleccione una opción</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="No Binario">No Binario</option>
                                            <option value="Prefiero no decir">Prefiero no decir</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2 bg-brand/5 p-4 rounded-xl border border-brand/20">
                                        <label className="block text-[11px] font-bold text-brand mb-1">Copia de Documento de Identidad (PDF) *</label>
                                        <span className="text-[10px] text-slate-500 block mb-3">Adjunte una copia legible. (Máx. 5MB)</span>
                                        <input type="file" name="id_document" accept=".pdf" required onChange={handleFileChange} className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-white file:text-brand hover:file:bg-brand/10 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PASO 2 */}
                        <div className={pasoActual === 2 ? 'block animate-fadeIn' : 'hidden'}>
                            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                                
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                    <p className="font-bold text-sm text-slate-800 mb-3">¿Actualmente es estudiante activo(a) de la Universidad del Tolima?</p>
                                    
                                    <div className="flex gap-6 mb-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="yes" checked={isUtStudent === 'yes'} onChange={(e) => setIsUtStudent(e.target.value)} className="w-4 h-4 text-brand" /> Sí</label>
                                        <label className={`flex items-center gap-2 text-sm ${isDiplomadoGrado ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                            <input type="radio" value="no" checked={isUtStudent === 'no'} disabled={isDiplomadoGrado} onChange={(e) => setIsUtStudent(e.target.value)} className="w-4 h-4 text-brand disabled:opacity-50" /> No
                                        </label>
                                    </div>

                                    {isUtStudent === 'yes' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
                                            <div className="md:col-span-2">
                                                <label className="block text-[11px] font-bold text-brand mb-1.5">Correo Institucional *</label>
                                                <input type="email" name="institutional_email" required={isUtStudent === 'yes'} value={formData.institutional_email} onChange={handleInputChange} placeholder="usuario@ut.edu.co" className="w-full bg-white border border-slate-300 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Código Estudiantil *</label>
                                                <input type="text" name="student_code" required={isUtStudent === 'yes'} value={formData.student_code} onChange={handleInputChange} className="w-full bg-white border border-slate-300 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Programa Académico *</label>
                                                <input type="text" name="academic_program" required={isUtStudent === 'yes'} value={formData.academic_program} onChange={handleInputChange} className="w-full bg-white border border-slate-300 p-2.5 text-sm rounded-lg outline-none focus:border-brand" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Semestre Actual *</label>
                                                <select name="semester" required={isUtStudent === 'yes'} value={formData.semester} onChange={handleInputChange} className="w-full max-w-full truncate md:w-1/2 bg-white border border-slate-300 p-2.5 text-sm rounded-lg outline-none focus:border-brand">
                                                    <option value="">Seleccione...</option>
                                                    {[1,2,3,4,5,6,7,8,9,10].map(i => <option key={i} value={i}>{i}° Semestre</option>)}
                                                    <option value="Egresado No Graduado">Egresado(a) No Graduado(a)</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                    <p className="font-bold text-sm text-slate-800 mb-3">¿Cuenta con algún título de educación superior finalizado?</p>
                                    <div className="flex gap-6 mb-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="yes" checked={hasDegree === 'yes'} onChange={(e) => setHasDegree(e.target.value)} className="w-4 h-4 text-brand" /> Sí</label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="no" checked={hasDegree === 'no'} onChange={(e) => setHasDegree(e.target.value)} className="w-4 h-4 text-brand" /> No</label>
                                    </div>

                                    {hasDegree === 'yes' && (
                                        <div className="mt-4 pt-4 border-t border-slate-200">
                                            <label className="block text-[11px] font-bold text-slate-700 mb-3">Registre sus títulos obtenidos *</label>
                                            
                                            <div className="space-y-3 mb-4">
                                                {titulosActivos.map(tipo => {
                                                    const label = opcionesTitulos.find(opt => opt.id === tipo)?.label;
                                                    return (
                                                        <div key={tipo} className="relative bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5">{label}</label>
                                                            <div className="flex gap-2">
                                                                <input 
                                                                    type="text" 
                                                                    required 
                                                                    value={titulos[tipo]} 
                                                                    onChange={(e) => handleTitulosChange(tipo, e.target.value)} 
                                                                    placeholder={`Ej: ${label}...`} 
                                                                    className="w-full bg-slate-50 border border-slate-200 p-2 text-sm rounded-md outline-none focus:border-brand" 
                                                                />
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => removerCampoTitulo(tipo)}
                                                                    className="px-3 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-md hover:bg-red-100 transition-colors"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {titulosActivos.length < opcionesTitulos.length && (
                                                <div className="mb-6">
                                                    <select 
                                                        value="" 
                                                        onChange={(e) => agregarCampoTitulo(e.target.value)} 
                                                        className="w-full max-w-full truncate md:w-1/2 bg-brand/5 border border-brand/20 text-brand font-bold p-2.5 text-xs rounded-lg outline-none focus:border-brand cursor-pointer"
                                                    >
                                                        <option value="" disabled>+ Agregar un título...</option>
                                                        {opcionesTitulos.filter(opt => !titulosActivos.includes(opt.id)).map(opt => (
                                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            
                                            <p className="font-bold text-[11px] text-brand mb-2 uppercase pt-3 border-t border-slate-200">¿Es persona graduada de la Universidad del Tolima?</p>
                                            <div className="flex gap-6">
                                                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="yes" checked={isUtGraduate === 'yes'} onChange={(e) => setIsUtGraduate(e.target.value)} className="w-4 h-4 text-brand" /> Sí</label>
                                                <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" value="no" checked={isUtGraduate === 'no'} onChange={(e) => setIsUtGraduate(e.target.value)} className="w-4 h-4 text-brand" /> No</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* PASO 3 - REQUISITOS (Limpio y directo a términos si no hay horarios) */}
                        <div className={pasoActual === 3 ? 'block animate-fadeIn' : 'hidden'}>
                            <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl">
                                
                                {/* Mostrar aval, seminario u horarios SOLO si existen */}
                                {(isDiplomadoGrado || isSeminarioIngles || curso.schedules?.length > 0) && (
                                    <div className="text-center mb-8">
                                        {isDiplomadoGrado ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-14 h-14 bg-brand/10 text-brand rounded-full flex items-center justify-center text-2xl mb-3">📑</div>
                                                <h4 className="text-base font-bold mb-1 text-slate-800">Aval de Opción de Grado</h4>
                                                <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">Es indispensable adjuntar el documento de aval firmado para este diplomado.</p>
                                                <div className="w-full max-w-sm text-left bg-white p-4 border border-brand/30 rounded-xl shadow-sm">
                                                    <label className="text-[11px] font-bold text-brand mb-2 block uppercase">Adjuntar Aval (PDF) *</label>
                                                    <input type="file" name="approval_document" accept=".pdf" required onChange={handleFileChange} className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer" />
                                                </div>
                                            </div>
                                        ) : isSeminarioIngles ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-3">✅</div>
                                                <h4 className="text-base font-bold mb-1 text-green-700">Requisitos Completos</h4>
                                                <p className="text-xs text-slate-500">No se requiere documentación adicional ni selección de horarios para este seminario.</p>
                                            </div>
                                        ) : curso.schedules?.length > 0 ? (
                                            <div className="flex flex-col items-center text-left w-full">
                                                <div className="w-14 h-14 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-2xl mb-3">🗓️</div>
                                                <h4 className="text-base font-bold mb-4 text-slate-800">Selección de Horario</h4>
                                                <div className="w-full max-w-sm mx-auto">
                                                    <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase">Horarios Disponibles *</label>
                                                    <select name="schedule" required value={formData.schedule} onChange={handleInputChange} className="w-full max-w-full truncate bg-white border border-slate-300 p-3 text-sm rounded-lg outline-none focus:border-brand shadow-sm">
                                                        <option value="">Seleccione un horario...</option>
                                                        {curso.schedules.map((horario, idx) => (
                                                            <option key={idx} value={horario}>{horario}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                )}

                                {/* Términos y Condiciones */}
                                <div className={`text-left ${(isDiplomadoGrado || isSeminarioIngles || curso.schedules?.length > 0) ? 'border-t border-slate-200 pt-6 mt-6' : ''}`}>
                                    <label className={`flex items-start gap-3 cursor-pointer p-3.5 border rounded-xl transition-colors ${terminosAceptados ? 'bg-brand/5 border-brand/40' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                        <input 
                                            type="checkbox" 
                                            required
                                            checked={terminosAceptados} 
                                            onChange={(e) => setTerminosAceptados(e.target.checked)} 
                                            className="mt-0.5 w-4 h-4 text-brand rounded border-slate-300 focus:ring-brand"
                                        />
                                        <span className="text-[11px] md:text-xs text-slate-700 font-medium leading-tight">
                                            He leído, entendido y acepto la <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/terminos-y-condiciones.pdf`} target="_blank" rel="noopener noreferrer" className="text-brand font-bold underline hover:text-cyan-700" onClick={(e) => e.stopPropagation()}>Política de Tratamiento de Datos Personales y los Términos de Inscripción</a>. *
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white md:bg-transparent pt-4 pb-2 px-2 md:p-0 md:mt-8 border-t border-slate-100 md:border-t-0 flex justify-between z-10">
                            {pasoActual > 1 ? (
                                <button type="button" onClick={pasoAnterior} className="px-5 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-full hover:bg-slate-200 transition-colors flex items-center gap-1.5">
                                    <span>←</span> Atrás
                                </button>
                            ) : (
                                <div className="w-20"></div>
                            )}
                            
                            {pasoActual < 3 ? (
                                <button 
                                    type="button" 
                                    onClick={siguientePaso} 
                                    disabled={!isPasoValido()}
                                    className={`px-6 py-2.5 text-white text-sm font-bold rounded-full flex items-center gap-1.5 transition-all ${!isPasoValido() ? 'bg-slate-400 opacity-50 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-900 shadow-md'}`}
                                >
                                    Siguiente <span>→</span>
                                </button>
                            ) : (
                                <button 
                                    type="submit" 
                                    disabled={cargando || !isPasoValido()} 
                                    className={`px-6 py-2.5 text-white text-sm font-bold rounded-full flex items-center gap-1.5 transition-all ${cargando || !isPasoValido() ? 'bg-brand opacity-50 cursor-not-allowed shadow-none' : 'bg-brand shadow-lg shadow-brand/30 hover:bg-cyan-600 hover:-translate-y-0.5'}`}
                                >
                                    {cargando ? 'Enviando...' : 'Finalizar'}
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}