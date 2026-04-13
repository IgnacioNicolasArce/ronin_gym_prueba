import React, { useState, useEffect } from 'react';
import { useGym, PAYMENT_METHOD_OPTIONS } from '../context/GymContext';
import { Search, UserCheck, RefreshCw, Users, Clock, AlertTriangle, CheckCircle2, TrendingUp, Package, DollarSign, BarChart3, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { members, inventory, renewMember, markAttendance, getMemberStatus, getExpirationDate, updateInventory } = useGym();
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceSearch, setAttendanceSearch] = useState('');
    const [foundMember, setFoundMember] = useState(null);
    const [message, setMessage] = useState(null);
    const [renewModal, setRenewModal] = useState(null);
    const [renewPaymentMethod, setRenewPaymentMethod] = useState(PAYMENT_METHOD_OPTIONS[0]);
    const [renewPeriodStart, setRenewPeriodStart] = useState('');
    const [activeTab, setActiveTab] = useState('socios'); // 'socios' or 'finanzas' or 'inventario'

    const todayYmd = () => {
        const n = new Date();
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!renewModal) return;
        const current = renewModal.paymentMethod;
        const match = PAYMENT_METHOD_OPTIONS.find((o) => o === current);
        setRenewPaymentMethod(match || PAYMENT_METHOD_OPTIONS[0]);
        setRenewPeriodStart(todayYmd());
    }, [renewModal]);

    const stats = {
        total: members.length,
        active: members.filter(m => getMemberStatus(m.lastPaymentDate) === 'green').length,
        income: members.filter(m => getMemberStatus(m.lastPaymentDate) === 'green').length * 15000, // Hardcoded multiplier for demo
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.dni.includes(searchTerm)
    );

    const handleAttendanceSearch = (e) => {
        e.preventDefault();
        const member = members.find(m => m.dni === attendanceSearch || m.name.toLowerCase() === attendanceSearch.toLowerCase());
        setFoundMember(member || 'not_found');
    };

    const handleMarkPresent = (member) => {
        markAttendance(member.id);
        setMessage(`Presencia marcada para ${member.name}`);
        setTimeout(() => setMessage(null), 3000);
        setFoundMember(null);
        setAttendanceSearch('');
    };

    const handleRenewConfirm = () => {
        if (!renewModal) return;
        renewMember(renewModal.id, renewPaymentMethod, renewPeriodStart || todayYmd());
        setMessage(`Cuota registrada para ${renewModal.name} — rige desde ${renewPeriodStart || todayYmd()}`);
        setRenewModal(null);
        setTimeout(() => setMessage(null), 3000);
    };

    const StatusBadge = ({ date }) => {
        const status = getMemberStatus(date);
        const config = {
            green: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'Activo' },
            yellow: { icon: Clock, color: 'text-ronin-gold', bg: 'bg-ronin-gold/10', border: 'border-ronin-gold/20', text: 'Por Vencer' },
            red: { icon: AlertTriangle, color: 'text-ronin-red', bg: 'bg-ronin-red/10', border: 'border-ronin-red/20', text: 'Vencido' },
        };
        const { icon: Icon, color, bg, border, text } = config[status];

        return (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${bg} ${border} ${color} text-[11px] font-bold uppercase tracking-wider`}>
                <Icon size={12} />
                {text}
            </div>
        );
    };

    return (
        <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-2xl bg-ronin-red text-white text-sm font-bold shadow-lg shadow-ronin-red/30 max-w-[90vw] text-center"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black mb-1 italic uppercase tracking-tighter">Panel <span className="text-ronin-red">Estratégico</span></h1>
                    <p className="text-zinc-500">Gestión de honor, finanzas y dojo</p>
                </div>

                <div className="flex gap-2 glass p-1 rounded-xl border border-white/5">
                    {['socios', 'finanzas', 'inventario'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-ronin-red text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="glass p-6 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <Users size={16} className="text-ronin-red" />
                        <TrendingUp size={12} className="text-green-500" />
                    </div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Socios Totales</div>
                    <div className="text-3xl font-black">{stats.total}</div>
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <DollarSign size={16} className="text-ronin-gold" />
                    </div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Ingresos Estim.</div>
                    <div className="text-3xl font-black italic">${stats.income.toLocaleString()}</div>
                </div>
                <div className="lg:col-span-2 glass p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Asistencia Semanal</div>
                        <div className="flex items-end gap-1 h-12">
                            {[40, 65, 30, 85, 90, 45, 20].map((h, i) => (
                                <div key={i} className="flex-1 w-2 bg-ronin-red/20 rounded-full relative overflow-hidden h-full">
                                    <div style={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-ronin-red" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <BarChart3 size={40} className="text-zinc-800" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'socios' && (
                    <motion.div
                        key="socios"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-1 space-y-8">
                            <section className="glass p-8 rounded-[40px] border border-ronin-red/10 shadow-2xl shadow-ronin-red/5">
                                <h2 className="text-xl font-black mb-6 flex items-center gap-2 italic uppercase">
                                    <UserCheck className="text-ronin-red" size={20} /> Entradas
                                </h2>
                                <form onSubmit={handleAttendanceSearch} className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="DNI o Nombre..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-ronin-red transition-all"
                                        value={attendanceSearch}
                                        onChange={(e) => setAttendanceSearch(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-3 top-3 p-2 ronin-gradient rounded-xl shadow-lg shadow-ronin-red/20">
                                        <Search size={16} />
                                    </button>
                                </form>
                                {foundMember && foundMember !== 'not_found' && (
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 animate-fade-in">
                                        <h3 className="text-lg font-bold mb-1">{foundMember.name}</h3>
                                        <div className="mb-4"><StatusBadge date={foundMember.lastPaymentDate} /></div>
                                        <button onClick={() => handleMarkPresent(foundMember)} className="w-full py-3 ronin-gradient rounded-xl font-black uppercase text-[10px] tracking-[0.2em]">Confirmar Ingreso</button>
                                    </div>
                                )}
                            </section>
                        </div>

                        <div className="lg:col-span-2">
                            <section className="glass p-8 rounded-[40px] border border-white/5">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-xl font-black italic uppercase flex items-center gap-2"><Users className="text-ronin-red" size={20} /> Clan de Socios</h2>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Filtrar..."
                                            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-ronin-red outline-none"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                                                <th className="text-left pb-4">Guerrero</th>
                                                <th className="text-left pb-4">Cuota (inicio · vence) / Pago</th>
                                                <th className="text-left pb-4">Estado</th>
                                                <th className="text-right pb-4">Honor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredMembers.map(m => (
                                                <tr key={m.id} className="group hover:bg-white/[0.01]">
                                                    <td className="py-4">
                                                        <div className="font-bold text-sm tracking-tight">{m.name}</div>
                                                        <div className="text-[10px] text-zinc-600">DNI: {m.dni}</div>
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="text-[10px] text-zinc-500 mb-0.5">
                                                            Desde <span className="text-zinc-300 font-semibold">{new Date(m.lastPaymentDate).toLocaleDateString()}</span>
                                                            {' · '}
                                                            vence <span className="text-zinc-300 font-semibold">{getExpirationDate(m.lastPaymentDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="text-[9px] text-ronin-gold font-bold uppercase" title="Medio registrado al último pago de cuota">
                                                            {m.paymentMethod}
                                                        </div>
                                                    </td>
                                                    <td className="py-4"><StatusBadge date={m.lastPaymentDate} /></td>
                                                    <td className="py-4 text-right px-2">
                                                        <button onClick={() => setRenewModal(m)} className="p-2 glass text-ronin-gold rounded-lg hover:bg-ronin-gold hover:text-white transition-all"><RefreshCw size={14} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'inventario' && (
                    <motion.div
                        key="inventario"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {inventory.map(item => (
                            <div key={item.id} className="glass p-8 rounded-[40px] border border-white/5 group hover:border-ronin-gold/30 transition-all">
                                <div className="p-4 rounded-3xl bg-white/5 w-fit mb-6 group-hover:bg-ronin-gold/10 group-hover:text-ronin-gold transition-colors">
                                    <Package size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-1 tracking-tight">{item.name}</h3>
                                <div className="text-2xl font-black mb-6 text-zinc-500 italic">${item.price}</div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <button onClick={() => updateInventory(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors font-bold">-</button>
                                    <div className="flex flex-col items-center">
                                        <span className={`text-xl font-black ${item.stock < 5 ? 'text-ronin-red' : 'text-white'}`}>{item.stock}</span>
                                        <span className="text-[10px] text-zinc-600 font-bold uppercase">Units</span>
                                    </div>
                                    <button onClick={() => updateInventory(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors font-bold">+</button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'finanzas' && (
                    <motion.div
                        key="finanzas"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass p-12 rounded-[50px] border border-white/5 min-h-[400px] flex flex-col items-center justify-center text-center"
                    >
                        <DollarSign size={64} className="text-ronin-gold mb-6 animate-pulse" />
                        <h2 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">Bóveda de Honor</h2>
                        <p className="text-zinc-500 max-w-md mb-8">Auditoría completa de ingresos por método de pago y socio. Módulo bajo protección de datos.</p>
                        <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                            <div>
                                <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">Efectivo</div>
                                <div className="text-xl font-bold font-mono">$45.000</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">Transferencia</div>
                                <div className="text-xl font-bold font-mono">$32.000</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {renewModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRenewModal(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md glass p-8 rounded-[40px] border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-black mb-2 italic uppercase">Renovar cuota</h2>
                            <p className="text-zinc-400 text-sm mb-6">
                                Registrá la mensualidad de <span className="text-white font-semibold">{renewModal.name}</span>. Podés fijar desde qué día cuenta la cuota (reingresos, alta nueva, etc.).
                            </p>
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">
                                    <CalendarDays size={14} className="text-ronin-red" />
                                    La mensualidad arranca el
                                </label>
                                <input
                                    type="date"
                                    value={renewPeriodStart}
                                    onChange={(e) => setRenewPeriodStart(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ronin-red [color-scheme:dark]"
                                />
                                <p className="text-[11px] text-zinc-600 mt-2 leading-snug">
                                    Por defecto es hoy. Si la persona volvió después de meses sin venir, elegí el día en que retoma o en que abonó la nueva cuota.
                                </p>
                            </div>
                            <div className="mb-8">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Forma de pago de esta cuota</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {PAYMENT_METHOD_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setRenewPaymentMethod(opt)}
                                            className={`py-3 px-3 rounded-xl text-left text-xs font-bold border transition-all ${renewPaymentMethod === opt
                                                ? 'border-ronin-red bg-ronin-red/15 text-white'
                                                : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setRenewModal(null)} className="flex-1 py-4 bg-white/5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-colors">Cancelar</button>
                                <button onClick={handleRenewConfirm} className="flex-1 py-4 ronin-gradient rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-ronin-red/20">Registrar pago</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
