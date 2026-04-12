import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronRight, Zap, Target, Users, Calendar } from 'lucide-react';

const Routines = () => {
    const [filters, setFilters] = useState({
        days: '4',
        goal: 'Hipertrofia',
        experience: 'Pro',
        sex: 'M'
    });

    const mockRoutines = [
        {
            id: 1,
            name: 'Ronin Split: Poder Absoluto',
            days: '4',
            goal: 'Hipertrofia',
            experience: 'Pro',
            sex: 'M',
            desc: 'Enfoque en grupos grandes con alta intensidad y volumen controlado.',
            exercises: ['Press Banca (4x10)', 'Sentadilla (4x8)', 'Remo con barra (3x12)']
        },
        {
            id: 2,
            name: 'Ninja Shred',
            days: '5',
            goal: 'Pérdida de peso',
            experience: 'Novato',
            sex: 'F',
            desc: 'Circuito metabólico diseñado para máxima quema calórica.',
            exercises: ['HIIT 20min', 'Estocadas (3x15)', 'Plancha (3x45s)']
        }
    ];

    const filtered = mockRoutines.filter(r =>
        r.days === filters.days &&
        r.goal === filters.goal &&
        r.experience === filters.experience
    );

    return (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <h1 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">
                Sistema de <span className="text-ronin-red">Rutinas</span>
            </h1>
            <p className="text-zinc-500 mb-12">Filtrado inteligente para tu camino del guerrero.</p>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-2xl border border-white/5">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-ronin-red mb-6 flex items-center gap-2">
                            <Filter size={14} /> Personalizar
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Días por semana</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['3', '4', '5', '6'].map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setFilters({ ...filters, days: d })}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all ${filters.days === d ? 'ronin-gradient' : 'bg-white/5 hover:bg-white/10'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Objetivo</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ronin-red"
                                    value={filters.goal}
                                    onChange={(e) => setFilters({ ...filters, goal: e.target.value })}
                                >
                                    <option value="Hipertrofia">Hipertrofia</option>
                                    <option value="Pérdida de peso">Pérdida de peso</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Experiencia</label>
                                <div className="flex gap-2">
                                    {['Novato', 'Pro'].map(exp => (
                                        <button
                                            key={exp}
                                            onClick={() => setFilters({ ...filters, experience: exp })}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${filters.experience === exp ? 'bg-ronin-red' : 'bg-white/5 hover:bg-white/10'}`}
                                        >
                                            {exp}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Routines List */}
                <div className="lg:col-span-3 space-y-6">
                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            filtered.map((r) => (
                                <motion.div
                                    key={r.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass p-8 rounded-3xl group hover:border-ronin-red/30 transition-all border border-white/5"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                        <div>
                                            <div className="flex gap-2 mb-3">
                                                <span className="bg-ronin-red/10 text-ronin-red text-[9px] font-black uppercase px-2 py-0.5 rounded border border-ronin-red/20">{r.days} Días</span>
                                                <span className="bg-white/5 text-zinc-400 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-white/5">{r.goal}</span>
                                            </div>
                                            <h2 className="text-3xl font-black italic tracking-tighter uppercase">{r.name}</h2>
                                        </div>
                                        <button className="px-6 py-3 ronin-gradient rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                            Empezar Rutina
                                        </button>
                                    </div>
                                    <p className="text-zinc-500 mb-8 max-w-2xl">{r.desc}</p>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {r.exercises.map((ex, idx) => (
                                            <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between group-hover:bg-white/5 transition-colors">
                                                <span className="text-sm font-bold">{ex.split(' (')[0]}</span>
                                                <span className="text-[10px] text-ronin-red font-black">({ex.split(' (')[1]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-white/5 rounded-3xl">
                                <Target size={48} className="mb-4 opacity-20" />
                                <p>No hay rutinas que coincidan con tus filtros.</p>
                                <button onClick={() => setFilters({ days: '4', goal: 'Hipertrofia', experience: 'Pro', sex: 'M' })} className="mt-4 text-ronin-red text-xs font-bold underline">Restablecer</button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Routines;
