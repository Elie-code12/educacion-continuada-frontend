import { useState } from 'react';
import FormularioInscripcion from './FormularioInscripcion';

export default function CursoDetalle({ curso, onClose }) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    if (!curso) return null;

    const apiUrl = 'http://localhost:8000/storage/';

    const getPdfSrc = (cursoData) => {
        if (!cursoData.pdf_document) return null;
        const rutaPdfLimpia = cursoData.pdf_document.replace(/^\/?(storage\/|public\/)?/, '');
        return `${apiUrl}${rutaPdfLimpia}`;
    };

    return (
        <>
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                <div className="bg-slate-50 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-fadeIn">
                    
                    <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white z-10">
                        <h3 className="text-lg font-bold text-slate-800 pr-4 truncate uppercase tracking-wide">
                            {curso.category}
                        </h3>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-lg font-bold flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-3 leading-tight">
                                {curso.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {curso.justification || 'Sin descripción detallada.'}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6">
                                <button 
                                    onClick={() => setMostrarFormulario(true)}
                                    className="inline-flex items-center justify-center px-6 py-2.5 bg-brand text-white text-sm font-bold rounded-lg shadow-md hover:bg-cyan-600 transition-colors"
                                >
                                    Inscribirme
                                </button>
                                
                                {getPdfSrc(curso) && (
                                    <a 
                                        href={getPdfSrc(curso)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-cyan-700 hover:text-cyan-900 font-semibold text-sm underline underline-offset-4 transition-colors flex items-center gap-1.5"
                                    >
                                        Normativa.pdf
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {curso.mode && (
                                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                                    <span className="block text-xl mb-1">💻</span>
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Modalidad</span>
                                    <span className="block text-sm font-bold text-slate-700">{curso.mode}</span>
                                </div>
                            )}
                            {curso.duration && (
                                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                                    <span className="block text-xl mb-1">⏱️</span>
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Duración</span>
                                    <span className="block text-sm font-bold text-slate-700">{curso.duration}</span>
                                </div>
                            )}
                            {curso.hours && (
                                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                                    <span className="block text-xl mb-1">⏳</span>
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Horas</span>
                                    <span className="block text-sm font-bold text-slate-700">{curso.hours} hrs</span>
                                </div>
                            )}
                            {curso.cost && (
                                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                                    <span className="block text-xl mb-1">💰</span>
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Inversión</span>
                                    <span className="block text-sm font-bold text-slate-700">{curso.cost}</span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                {curso.general_objective && (
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <span className="text-cyan-600">🎯</span> Objetivo General
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {curso.general_objective}
                                        </p>
                                    </div>
                                )}

                                {curso.specific_objectives && curso.specific_objectives.length > 0 && (
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <span className="text-cyan-600">📌</span> Objetivos Específicos
                                        </h4>
                                        <ul className="space-y-2">
                                            {curso.specific_objectives.map((obj, index) => (
                                                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                                                    <div className="min-w-[6px] h-[6px] rounded-full bg-cyan-400 mt-1.5"></div>
                                                    <span>{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {curso.topics && curso.topics.length > 0 && (
                                    <div className="bg-cyan-50 p-5 rounded-2xl border border-cyan-100">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <span>📚</span> Temario
                                        </h4>
                                        <ul className="space-y-2">
                                            {curso.topics.map((tema, index) => (
                                                <li key={index} className="px-3 py-2 bg-white rounded-lg text-slate-700 text-xs font-semibold shadow-sm border border-cyan-50">
                                                    {tema}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {curso.schedules && curso.schedules.length > 0 && (
                                    <div className="bg-slate-800 p-5 rounded-2xl">
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <span>🗓️</span> Horarios
                                        </h4>
                                        <ul className="space-y-2">
                                            {curso.schedules.map((horario, index) => (
                                                <li key={index} className="flex items-center gap-2 text-slate-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                    {horario}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {mostrarFormulario && (
                <FormularioInscripcion 
                    curso={curso} 
                    onClose={() => setMostrarFormulario(false)} 
                />
            )}
        </>
    );
}