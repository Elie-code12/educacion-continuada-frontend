import { usePopups } from './usePopups';

export default function Popups({ onVolver }) {
    const {
        popups,
        modalAbierto,
        setModalAbierto,
        nuevoPopup,
        setNuevoPopup,
        guardando,
        alerta,
        apiUrl,
        handleSubir,
        handleToggle,
        handleEliminar
    } = usePopups();

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 relative">
            {alerta && (
                <div className="fixed bottom-10 right-10 z-50 animate-bounce">
                    <div className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 ${alerta.tipo === 'exito' ? 'bg-brand-light text-brand-dark border-brand/20' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        <span className="text-xl">{alerta.tipo === 'exito' ? '✅' : '❌'}</span>
                        <span className="font-bold">{alerta.texto}</span>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Gestión de Publicidad</h2>
                    <p className="text-xs text-slate-500">Administra las imágenes promocionales</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setModalAbierto(true)} className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark shadow-sm">
                        + Nueva Imagen
                    </button>
                    <button onClick={onVolver} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200">
                        ← Volver
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popups.map(p => (
                    <div key={p.id} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                        <img src={`${apiUrl}${p.image_path}`} alt={p.title} className="w-full h-48 object-cover bg-slate-100" />
                        <div className="p-5 space-y-4">
                            <h3 className="font-bold text-slate-800 truncate">{p.title}</h3>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                <button onClick={() => handleToggle(p.id)} className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${p.is_active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    {p.is_active ? '✅ Activo' : '⚪ Inactivo'}
                                </button>
                                <button onClick={() => handleEliminar(p.id)} className="text-xs text-red-600 font-semibold hover:text-red-800">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalAbierto && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Subir Publicidad</h3>
                        <form onSubmit={handleSubir} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-700">Título</label>
                                <input type="text" required className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-brand" value={nuevoPopup.title} onChange={e => setNuevoPopup({...nuevoPopup, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-700">Link (opcional)</label>
                                <input type="url" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-brand" placeholder="https://..." value={nuevoPopup.link} onChange={e => setNuevoPopup({...nuevoPopup, link: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-700">Imagen</label>
                                <input type="file" accept="image/*" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-dark" onChange={e => setNuevoPopup({...nuevoPopup, image: e.target.files[0]})} />
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                                <button type="button" onClick={() => setModalAbierto(false)} className="px-4 py-2 text-sm text-slate-600 font-medium">Cancelar</button>
                                <button type="submit" disabled={guardando} className="px-5 py-2 bg-brand text-white rounded-lg text-sm font-medium disabled:opacity-50">
                                    {guardando ? 'Subiendo...' : 'Guardar y Subir'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}