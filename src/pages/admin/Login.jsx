import { useLogin } from './useLogin';
import bgImage from '../../assets/Fondo2.png';
import logoUt from '../../assets/Logo.png';

export default function Login() {
    const {
        credentials,
        error,
        cargando,
        handleChange,
        handleSubmit
    } = useLogin();

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                
                <div className="text-center mb-8">
                    <img 
                        src={logoUt} 
                        alt="Logo" 
                        className="w-40 h-auto mx-auto mb-4 object-contain" 
                    />
                    <h2 className="text-2xl font-bold text-slate-800">Panel Administrativo</h2>
                    <p className="text-slate-500 text-sm mt-1">Educación Continuada</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100 text-center animate-fadeIn">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                            placeholder="admin@ut.edu.co"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                        <input 
                            type="password" 
                            name="password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={cargando}
                        className="w-full py-3 px-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-70 mt-6 shadow-sm"
                    >
                        {cargando ? 'Verificando datos...' : 'Ingresar al sistema'}
                    </button>
                </form>
            </div>
        </div>
    );
}