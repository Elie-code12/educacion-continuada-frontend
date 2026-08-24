import { Link } from 'react-router-dom';
import { useNuevoCurso } from './useNuevoCurso';

export default function NuevoCurso() {
    const {
        alerta,
        formData,
        schedules,
        categorias,
        handleChange,
        handleScheduleChange,
        addScheduleField,
        removeScheduleField,
        handleFileChange,
        handleSubmit
    } = useNuevoCurso();

    return (
        <div className="max-w-5xl mx-auto space-y-6 relative">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <div className="flex items-center gap-3">
                        <Link to="/admin/cursos" className="text-slate-400 hover:text-brand transition-colors">
                            ← Volver
                        </Link>
                        <h2 className="text-2xl font-bold text-slate-800">Crear Nuevo Programa</h2>
                    </div>
                    <p className="text-slate-500 mt-1 ml-12">Completa los campos para publicar una nueva oferta académica.</p>
                </div>
            </div>

            {alerta && (
                <div className="fixed bottom-10 right-10 z-50 animate-bounce">
                    <div className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 ${alerta.tipo === 'exito' ? 'bg-brand-light text-brand-dark border-brand/20' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        <span className="text-xl">{alerta.tipo === 'exito' ? '✅' : '❌'}</span>
                        <span className="font-bold">{alerta.texto}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">1. Información Principal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Título del Programa *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Ej. Diplomado en Gestión Ambiental..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría *</label>
                            <select name="category" required value={formData.category} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none bg-white">
                                <option value="">Selecciona una categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Modalidad *</label>
                            <input type="text" name="mode" required value={formData.mode} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Ej. Presencial, Virtual, Híbrido" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Intensidad Horaria (Horas) *</label>
                            <input type="number" name="hours" required value={formData.hours} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Ej. 120" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Duración (Opcional)</label>
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Ej. 3 meses" />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Costo (Opcional)</label>
                            <input type="text" name="cost" value={formData.cost} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Ej. $1.500.000 COP o 'Gratuito'" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">2. Contenido Académico</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Justificación *</label>
                            <textarea name="justification" required rows="4" value={formData.justification} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Escribe la justificación del programa..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Objetivo General</label>
                            <textarea name="general_objective" rows="2" value={formData.general_objective} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Objetivos Específicos</label>
                                <p className="text-xs text-slate-500 mb-2">Escribe un objetivo por línea. Presiona Enter para separar.</p>
                                <textarea name="specific_objectives" rows="5" value={formData.specific_objectives} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Objetivo 1&#10;Objetivo 2&#10;Objetivo 3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Temario (Módulos)</label>
                                <p className="text-xs text-slate-500 mb-2">Escribe un tema por línea. Presiona Enter para separar.</p>
                                <textarea name="topics" rows="5" value={formData.topics} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none" placeholder="Módulo 1: Introducción&#10;Módulo 2: Desarrollo&#10;Módulo 3: Conclusión"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 className="text-lg font-bold text-slate-800">3. Horarios</h3>
                        <button type="button" onClick={addScheduleField} className="text-sm px-3 py-1 bg-brand-light text-brand-dark rounded hover:bg-brand/20 font-medium transition-colors">
                            + Agregar Horario
                        </button>
                    </div>
                    <div className="space-y-3">
                        {schedules.map((schedule, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={schedule}
                                    onChange={(e) => handleScheduleChange(index, e.target.value)}
                                    className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                                    placeholder="Ej. Lunes y Miércoles 6:00 PM - 8:00 PM"
                                />
                                {schedules.length > 1 && (
                                    <button type="button" onClick={() => removeScheduleField(index)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">4. Archivos Adjuntos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Imagen Portada (JPG, PNG, WEBP. Max 2MB)</label>
                            <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-dark hover:file:bg-brand/20 cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Documento Adjunto (Solo PDF. Max 5MB)</label>
                            <input type="file" name="pdf_document" accept=".pdf" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pb-10">
                    <Link to="/admin/cursos" className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                        Cancelar
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-sm">
                        Publicar Programa
                    </button>
                </div>
            </form>
        </div>
    );
}