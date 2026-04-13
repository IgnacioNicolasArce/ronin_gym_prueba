import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { Trophy, Zap, Clock, AlertCircle, Dumbbell, History, Bell, Calendar as CalendarIcon, Check, X } from 'lucide-react';

const formatPrLabel = (entry) => {
    if (!entry || typeof entry !== 'object') return null;
    const { weight, reps } = entry;
    if (!weight && !reps) return null;
    const parts = [];
    if (weight) parts.push(`${weight} kg`);
    if (reps) parts.push(`${reps} rep.`);
    return parts.join(' · ');
};

const Profile = () => {
    // For demo purposes, we'll assume Juan Perez is logged in
    const { members, news, getMemberStatus, getDaysRemaining, updateMemberPr, PR_EXERCISES } = useGym();
    const user = members[0] || {};
    const status = getMemberStatus(user.lastPaymentDate);
    const daysRemaining = getDaysRemaining(user.lastPaymentDate);

    const [editingExercise, setEditingExercise] = useState(null);
    const [prWeightDraft, setPrWeightDraft] = useState('');
    const [prRepsDraft, setPrRepsDraft] = useState('');

    const startEditPr = (name) => {
        setEditingExercise(name);
        const e = user.prs && user.prs[name];
        setPrWeightDraft(e && typeof e === 'object' ? (e.weight || '') : '');
        setPrRepsDraft(e && typeof e === 'object' ? (e.reps || '') : '');
    };

    const savePr = () => {
        if (!user.id || !editingExercise) return;
        updateMemberPr(user.id, editingExercise, { weight: prWeightDraft, reps: prRepsDraft });
        setEditingExercise(null);
        setPrWeightDraft('');
        setPrRepsDraft('');
    };

    const cancelEditPr = () => {
        setEditingExercise(null);
        setPrWeightDraft('');
        setPrRepsDraft('');
    };

    const StatCard = ({ icon: Icon, label, value, colorClass }) => (
        <div className="glass p-6 rounded-3xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${colorClass}`}>
                    <Icon size={20} />
                </div>
                <Zap size={14} className="text-zinc-700" />
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{label}</div>
            <div className="text-3xl font-black">{value}</div>
        </div>
    );

    return (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">
                        Perfil del <span className="text-ronin-red">Socio</span>
                    </h1>
                    <p className="text-zinc-500 font-medium">Bienvenido de vuelta, {user.name}. Sigue forjando tu honor.</p>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-white/5">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-ronin-gold' : 'bg-ronin-red'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        Estado: {status === 'green' ? 'Activo' : status === 'yellow' ? 'Por vencer' : 'Vencido'}
                    </span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Gamification */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <StatCard icon={Trophy} label="Puntos de Honor" value={user.honorPoints} colorClass="text-ronin-gold" />
                        <StatCard icon={Clock} label="Días Restantes" value={`${daysRemaining} Días`} colorClass="text-ronin-red" />
                        <StatCard icon={History} label="Asistencias" value="12/mes" colorClass="text-white" />
                    </div>

                    {/* PR Tracking */}
                    <div className="glass p-8 rounded-[40px] border border-white/5">
                        <h2 className="text-2xl font-black mb-8 uppercase italic flex items-center gap-3">
                            <Dumbbell className="text-ronin-red" size={24} />
                            Trackeo de Fuerza (PRs)
                        </h2>
                        <div className="space-y-3">
                            {PR_EXERCISES.map((exercise) => {
                                const stored = user.prs && user.prs[exercise];
                                const label = formatPrLabel(stored);
                                const isEditing = editingExercise === exercise;
                                return (
                                    <div
                                        key={exercise}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <span className="font-bold text-zinc-300 text-sm shrink-0">{exercise}</span>
                                        {isEditing ? (
                                            <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[320px]">
                                                <div className="flex flex-wrap items-end gap-3">
                                                    <div className="flex-1 min-w-[120px]">
                                                        <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Peso (kg)</label>
                                                        <input
                                                            type="number"
                                                            inputMode="decimal"
                                                            step="any"
                                                            min="0"
                                                            value={prWeightDraft}
                                                            onChange={(e) => setPrWeightDraft(e.target.value)}
                                                            placeholder="0"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-ronin-red"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') savePr();
                                                                if (e.key === 'Escape') cancelEditPr();
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[120px]">
                                                        <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Repeticiones</label>
                                                        <input
                                                            type="number"
                                                            inputMode="numeric"
                                                            min="0"
                                                            step="1"
                                                            value={prRepsDraft}
                                                            onChange={(e) => setPrRepsDraft(e.target.value)}
                                                            placeholder="0"
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-ronin-red"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') savePr();
                                                                if (e.key === 'Escape') cancelEditPr();
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={cancelEditPr}
                                                        className="px-4 py-2.5 rounded-xl bg-white/10 text-zinc-400 hover:text-white text-[10px] font-black uppercase tracking-wider transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={savePr}
                                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl ronin-gradient text-white text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                                                    >
                                                        <Check size={16} />
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                                <span className={`text-lg sm:text-xl font-black ${label ? 'text-white' : 'text-zinc-600 italic text-base font-semibold'}`}>
                                                    {label || 'Sin registrar'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => startEditPr(exercise)}
                                                    className="text-[10px] font-black uppercase tracking-wider text-zinc-500 hover:text-ronin-red transition-colors shrink-0"
                                                >
                                                    {label ? 'Editar' : 'Registrar'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="glass p-8 rounded-[40px] border border-white/5">
                        <h2 className="text-2xl font-black mb-8 uppercase italic flex items-center gap-3">
                            <CalendarIcon className="text-ronin-red" size={24} />
                            Horarios de Apertura
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { d: 'Lun-Vie', h: '07:00 - 22:00' },
                                { d: 'Sábado', h: '09:00 - 18:00' },
                                { d: 'Domingo', h: '10:00 - 14:00' },
                                { d: 'Feriados', h: 'Consultar News' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-[10px] font-black text-ronin-red uppercase mb-1">{item.d}</div>
                                    <div className="text-sm font-bold">{item.h}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: News & Community */}
                <div className="space-y-8">
                    <div className="glass p-8 rounded-[40px] border border-ronin-red/20 shadow-2xl shadow-ronin-red/5">
                        <h2 className="text-xl font-black mb-8 uppercase italic flex items-center gap-3">
                            <Bell className="text-ronin-red" size={20} />
                            Último Momento
                        </h2>
                        <div className="space-y-6">
                            {news.map(n => (
                                <div key={n.id} className="relative pl-6 border-l-2 border-ronin-red/30 py-1">
                                    <div className="text-[10px] text-zinc-600 font-bold uppercase mb-1">{n.date}</div>
                                    <h4 className="font-bold mb-1 text-sm">{n.title}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed">{n.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[40px] border border-white/5">
                        <div className="flex flex-col items-center text-center">
                            <AlertCircle className="text-ronin-gold mb-4" size={32} />
                            <h3 className="font-bold mb-2">Respeto & Honor</h3>
                            <p className="text-xs text-zinc-500 mb-6 px-4">Recuerda descargar tus pesos y mantener el dojo limpio para los demás guerreros.</p>
                            <div className="w-full h-[1px] bg-white/5 mb-6" />
                            <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Ronin Gym Rules</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
