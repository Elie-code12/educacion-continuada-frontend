import { Link } from 'react-router-dom';
import { useCursos } from './useCursos';

export default function Cursos() {
    const {
        cursos,
        cargando,
        alerta,
        modalEliminar,
        setModalEliminar,
        confirmarEliminacion
    } = useCursos();

    return (
        <div className="space-y-6 relative">

            {alerta && (
                <div className="fixed bottom-10 right-10 z-50 animate-bounce">
                    <div className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 ${alerta.tipo === 'exito' ? 'bg-brand-light text-brand-dark border-brand/20' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        <span className="text-xl">{alerta.tipo === 'exito' ? '✅' : '❌'}</span>
                        <span className="font-bold">{alerta.texto}</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Oferta Académica</h2>
                    <p className="text-slate-500 mt-1">Gestiona los diplomados, seminarios y cursos vigentes.</p>
                </div>
                <Link
                    to="/admin/cursos/nuevo"
                    className="px-5 py-2.5 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-sm"
                >
                    + Nuevo Programa
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                                <th className="p-4 font-semibold">Nombre del Programa</th>
                                <th className="p-4 font-semibold">Categoría</th>
                                <th className="p-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">

                            {cargando ? (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-slate-500">
                                        cargando info...
                                    </td>
                                </tr>
                            ) : cursos.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-slate-500">
                                        no hay programas registrados
                                    </td>
                                </tr>
                            ) : (
                                cursos.map((curso) => (
                                    <tr key={curso.id} className="hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                        <td className="p-4 font-medium text-slate-900">{curso.title}</td>
                                        <td className="p-4">{curso.category}</td>
                                        <td className="p-4 text-right space-x-3">

                                            <Link
                                                to={`/admin/cursos/editar/${curso.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() => setModalEliminar({ isOpen: true, id: curso.id })}
                                                className="text-red-600 hover:text-red-800 font-medium"
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

            {modalEliminar.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col relative overflow-hidden transform transition-all">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ⚠️
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">¿Estás seguro?</h3>
                            <p className="text-slate-500 mb-6 text-sm">
                                se eliminara el programa para siempre
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setModalEliminar({ isOpen: false, id: null })}
                                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors w-full"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmarEliminacion}
                                    className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors w-full shadow-sm"
                                >
                                    Sí, eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}