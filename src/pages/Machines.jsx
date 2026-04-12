import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Info, ExternalLink } from 'lucide-react';

const Machines = () => {
    const [selectedMachine, setSelectedMachine] = useState(null);

    const machines = [
        {
            id: 1,
            name: 'Prensa a 45°',
            image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
            video: 'https://www.youtube.com/watch?v=IZxyjW7mpJQ',
            desc: 'Ideal para desarrollo de cuádriceps y glúteos. Mantenga la espalda pegada al respaldo.'
        },
        {
            id: 2,
            name: 'Polea al Pecho',
            image: 'https://images.unsplash.com/photo-1594737625785-a49938f69201?w=800&q=80',
            video: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
            desc: 'Focalizado en el dorsal ancho. Evite el balanceo excesivo del tronco.'
        },
        {
            id: 3,
            name: 'Rack de Sentadillas',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
            video: 'https://www.youtube.com/watch?v=QhZf738H8P0',
            desc: 'El rey de los ejercicios. Fundamental para fuerza máxima.'
        }
    ];

    return (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <h1 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">
                Biblioteca de <span className="text-ronin-red">Maquinaria</span>
            </h1>
            <p className="text-zinc-500 mb-12">Técnica impecable para guerreros incansables.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {machines.map((m) => (
                    <motion.div
                        key={m.id}
                        whileHover={{ y: -5 }}
                        className="group relative glass rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
                        onClick={() => setSelectedMachine(m)}
                    >
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={m.image}
                                alt={m.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold uppercase italic">{m.name}</h3>
                                <span className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-1">
                                    <Info size={10} className="text-ronin-red" /> Ver técnica
                                </span>
                            </div>
                            <div className="w-10 h-10 ronin-gradient rounded-full flex items-center justify-center shadow-lg shadow-ronin-red/20 group-hover:scale-110 transition-transform">
                                <Play size={18} fill="white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedMachine && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMachine(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-4xl glass rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedMachine(null)}
                                className="absolute top-6 right-6 z-50 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className="aspect-square md:aspect-auto">
                                    <img src={selectedMachine.image} alt={selectedMachine.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-10 flex flex-col justify-center">
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] bg-ronin-red/20 text-ronin-red font-black px-2 py-0.5 rounded border border-ronin-red/20 uppercase">Equipamiento Pro</span>
                                    </div>
                                    <h2 className="text-4xl font-black italic uppercase mb-6 tracking-tighter">{selectedMachine.name}</h2>
                                    <p className="text-zinc-400 leading-relaxed mb-8">{selectedMachine.desc}</p>

                                    <div className="space-y-4">
                                        <a
                                            href={selectedMachine.video}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full flex items-center justify-center gap-3 py-4 ronin-gradient rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-ronin-red/20 hover:scale-105 transition-transform"
                                        >
                                            <Play size={18} fill="white" /> Ver Técnica en YouTube
                                        </a>
                                        <p className="text-[10px] text-zinc-600 font-bold text-center uppercase tracking-widest">Aprende la ejecución correcta para evitar lesiones.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Machines;
