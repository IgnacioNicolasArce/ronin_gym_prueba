import React from 'react';
import { useGym } from '../context/GymContext';
import { motion } from 'framer-motion';
import { Trophy, Zap, Clock, AlertCircle, Dumbbell, History, Bell, Calendar as CalendarIcon } from 'lucide-react';

const Profile = () => {
    // For demo purposes, we'll assume Juan Perez is logged in
    const { members, news, getMemberStatus, getDaysRemaining } = useGym();
    const user = members[0] || {};
    const status = getMemberStatus(user.lastPaymentDate);
    const daysRemaining = getDaysRemaining(user.lastPaymentDate);

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
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Estado: {status === 'green' ? 'Activo' : 'Vencido'}</span>
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
                        <div className="space-y-4">
                            {Object.entries(user.prs || {}).map(([exercise, weight], idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <span className="font-bold text-zinc-300">{exercise}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{weight}</span>
                                        <button className="text-[10px] text-zinc-600 font-black uppercase hover:text-ronin-red transition-colors">Actualizar</button>
                                    </div>
                                </div>
                            ))}
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
