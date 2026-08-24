import { useEffect, useRef } from 'react';

export default function TextPublic({ onAbrirModal }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const numParticles = 40; 
        const connectionDistance = 110; 
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2 + 1.5 // Puntos ligeramente más grandes
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                         
                       
                        const opacity = 1 - (distance / connectionDistance);
                        
                        
                        ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`; 
                        ctx.lineWidth = 1.2; 
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                
                
                ctx.fillStyle = 'rgba(220, 38, 38, 1)'; 
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <section className="relative w-full py-20 bg-slate-50 overflow-hidden border-y border-slate-200 shadow-inner">
            
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            ></canvas>

            
            <div className="relative z-10 max-w-4xl mx-auto px-8 flex flex-wrap justify-center gap-12">
                
                <button 
                    onClick={() => onAbrirModal('about_us')}
                    className="w-48 h-48 rounded-full bg-white shadow-xl border-2 border-white flex items-center justify-center text-center p-6 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-3 transition-all duration-300 group"
                >
                    <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-brand transition-colors">Quiénes Somos</h3>
                </button>

                <button 
                    onClick={() => onAbrirModal('formation_types')}
                    className="w-48 h-48 rounded-full bg-white shadow-xl border-2 border-white flex items-center justify-center text-center p-6 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-3 transition-all duration-300 group"
                >
                    <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-brand transition-colors">Tipos de Formación</h3>
                </button>

                <button 
                    onClick={() => onAbrirModal('discounts')}
                    className="w-48 h-48 rounded-full bg-white shadow-xl border-2 border-white flex items-center justify-center text-center p-6 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-3 transition-all duration-300 group"
                >
                    <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-brand transition-colors">Descuentos</h3>
                </button>
                
            </div>
        </section>
    );
}