import { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { getHomeContent, updateHomeContent } from '../../services/publicidadService';

export default function Textos({ onVolver }) {
    const [textos, setTextos] = useState({ about_us: '', formation_types: '', discounts: '' });
    const [guardando, setGuardando] = useState(false);
    const [alerta, setAlerta] = useState(null);

    // Configuración limpia para el editor
    const config = {
        readonly: false,
        height: 300,
        toolbarSticky: false,
        buttons: ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', '|', 'eraser']
    };

    useEffect(() => {
        cargarData();
    }, []);

    const cargarData = async () => {
        try {
            const res = await getHomeContent();
            setTextos(res.data || { about_us: '', formation_types: '', discounts: '' });
        } catch (error) {
            mostrarAlerta('error', 'Error al cargar los textos');
        }
    };

    const mostrarAlerta = (tipo, texto) => {
        setAlerta({ tipo, texto });
        setTimeout(() => setAlerta(null), 3000);
    };

    const handleGuardar = async () => {
        setGuardando(true);
        try {
            await updateHomeContent(textos);
            mostrarAlerta('exito', 'Textos actualizados correctamente');
        } catch (error) {
            mostrarAlerta('error', 'Error al guardar los textos');
        } finally {
            setGuardando(false);
        }
    };

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
                    <h2 className="text-xl font-bold text-slate-800">Editor de Textos Principales</h2>
                    <p className="text-xs text-slate-500">Actualiza los bloques de información (Jodit Editor)</p>
                </div>
                <button onClick={onVolver} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200">
                    ← Volver al panel
                </button>
            </div>

            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Acerca de nosotros</label>
                    <JoditEditor
                        value={textos.about_us || ''}
                        config={config}
                        onBlur={newContent => setTextos(prev => ({ ...prev, about_us: newContent }))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipos de formación</label>
                    <JoditEditor
                        value={textos.formation_types || ''}
                        config={config}
                        onBlur={newContent => setTextos(prev => ({ ...prev, formation_types: newContent }))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Descuentos</label>
                    <JoditEditor
                        value={textos.discounts || ''}
                        config={config}
                        onBlur={newContent => setTextos(prev => ({ ...prev, discounts: newContent }))}
                    />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button onClick={handleGuardar} disabled={guardando} className="px-6 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark disabled:opacity-50">
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>
        </div>
    );
}