import React, { createContext, useContext, useState, useEffect } from 'react';

const GymContext = createContext();

export const useGym = () => useContext(GymContext);

/** Medios de pago disponibles al registrar una cuota mensual */
export const PAYMENT_METHOD_OPTIONS = [
    'Efectivo',
    'Transferencia',
];

/** Ejercicios fijos para PRs en perfil de socio */
export const PR_EXERCISES = [
    'Press Plano',
    'Press Inclinado',
    'Peso Muerto',
    'Press Militar',
    'Sentadilla',
    'Hip trust',
    'Curl con barra',
    'Prensa',
    'Extension con polea',
    'Dominadas',
    'Jalones al pecho',
    'Remo',
];

/** PR guardado como { weight, reps } (strings). Migra valores viejos tipo "100 kg". */
export const normalizePrEntry = (raw) => {
    if (raw == null) return null;
    if (typeof raw === 'object' && !Array.isArray(raw) && ('weight' in raw || 'reps' in raw)) {
        const weight = raw.weight != null ? String(raw.weight).trim() : '';
        const reps = raw.reps != null ? String(raw.reps).trim() : '';
        if (!weight && !reps) return null;
        return { weight, reps };
    }
    if (typeof raw === 'string') {
        const s = raw.trim();
        if (!s) return null;
        const m = s.match(/^([\d.,]+)\s*(.*)$/);
        if (m) return { weight: m[1].replace(',', '.'), reps: '' };
        return { weight: s, reps: '' };
    }
    return null;
};

const normalizePrsObject = (prs) => {
    const src = prs && typeof prs === 'object' && !Array.isArray(prs) ? prs : {};
    const out = {};
    for (const [key, val] of Object.entries(src)) {
        const entry = normalizePrEntry(val);
        if (entry) out[key] = entry;
    }
    return out;
};

const normalizeMember = (m) => ({
    ...m,
    paymentMethod: m.paymentMethod || 'Sin definir',
    renewalHistory: Array.isArray(m.renewalHistory) ? m.renewalHistory : [],
    prs: normalizePrsObject(m.prs),
});

/** Convierte "YYYY-MM-DD" (input date) o ISO en inicio de día local (mediodía → ISO estable). */
export const periodStartToIso = (value) => {
    if (!value) return null;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
        const [y, mo, d] = value.trim().split('-').map(Number);
        return new Date(y, mo - 1, d, 12, 0, 0, 0).toISOString();
    }
    const t = new Date(value);
    if (Number.isNaN(t.getTime())) return null;
    return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0, 0).toISOString();
};

export const GymProvider = ({ children }) => {
    // Members with enhanced fields (honorPoints, PRs)
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem('ronin_members_v2');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return Array.isArray(parsed) ? parsed.map(normalizeMember) : [];
            } catch {
                return [];
            }
        }
        return [
            {
                id: '1',
                name: 'Juan Perez',
                dni: '12345678',
                lastPaymentDate: new Date().toISOString(),
                paymentMethod: 'Efectivo',
                plan: 'Musculación',
                honorPoints: 150,
                lastActivityDate: new Date().toISOString(),
                renewalHistory: [],
                prs: {
                    'Press Plano': { weight: '100', reps: '5' },
                    'Sentadilla': { weight: '140', reps: '3' },
                    'Peso Muerto': { weight: '180', reps: '1' },
                }
            },
            {
                id: '2',
                name: 'Maria Garcia',
                dni: '87654321',
                lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                paymentMethod: 'Transferencia',
                plan: 'Personalizado',
                honorPoints: 80,
                lastActivityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                renewalHistory: [],
                prs: {
                    'Press Plano': { weight: '40', reps: '8' },
                    'Sentadilla': { weight: '60', reps: '10' },
                }
            }
        ];
    });

    const [attendance, setAttendance] = useState(() => {
        const saved = localStorage.getItem('ronin_attendance_v2');
        return saved ? JSON.parse(saved) : [];
    });

    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('ronin_inventory');
        return saved ? JSON.parse(saved) : [
            { id: 'i1', name: 'Agua 500ml', stock: 24, price: 1200 },
            { id: 'i2', name: 'Gatorade Blue', stock: 12, price: 2500 },
            { id: 'i3', name: 'Proteína Whey (Scoop)', stock: 50, price: 3000 },
            { id: 'i4', name: 'Barra Energética', stock: 15, price: 1800 }
        ];
    });

    const [news, setNews] = useState([
        { id: 1, title: 'Nuevas Mancuernas', content: 'Ya están disponibles las mancuernas de 40kg y 50kg.', date: '2026-04-10' },
        { id: 2, title: 'Feriado 1ro de Mayo', content: 'El gimnasio permanecerá cerrado por el Día del Trabajador.', date: '2026-04-05' }
    ]);

    useEffect(() => {
        localStorage.setItem('ronin_members_v2', JSON.stringify(members));
    }, [members]);

    useEffect(() => {
        localStorage.setItem('ronin_attendance_v2', JSON.stringify(attendance));
    }, [attendance]);

    useEffect(() => {
        localStorage.setItem('ronin_inventory', JSON.stringify(inventory));
    }, [inventory]);

    const getExpirationDate = (lastPaymentDate) => {
        const lastPayment = new Date(lastPaymentDate);
        const expiration = new Date(lastPayment);
        expiration.setDate(expiration.getDate() + 31);
        return expiration;
    };

    /** Días hasta el vencimiento (negativo si ya venció). No usar Math.abs: evita fallos con cuotas apiladas o lastPayment en el futuro. */
    const getDaysUntilExpiration = (lastPaymentDate) => {
        const expiration = getExpirationDate(lastPaymentDate);
        const today = new Date();
        const diffTime = expiration - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    /** Activo / por vencer / vencido según la fecha de fin de cuota, no según días desde el último pago. */
    const getMemberStatus = (lastPaymentDate) => {
        const daysLeft = getDaysUntilExpiration(lastPaymentDate);
        if (daysLeft < 0) return 'red';
        if (daysLeft <= 7) return 'yellow';
        return 'green';
    };

    const getDaysRemaining = (lastPaymentDate) => {
        return Math.max(0, getDaysUntilExpiration(lastPaymentDate));
    };

    const markAttendance = (id) => {
        const newRecord = { memberId: id, date: new Date().toISOString() };
        setAttendance(prev => [...prev, newRecord]);

        // Update honor points (+10 for attendance) and last activity
        setMembers(prev => prev.map(m => {
            if (m.id === id) {
                return {
                    ...m,
                    honorPoints: (m.honorPoints || 0) + 10,
                    lastActivityDate: new Date().toISOString()
                };
            }
            return m;
        }));
        return newRecord;
    };

    // Penalty logic: Run periodically or on load to check for inactivity
    useEffect(() => {
        const checkPenalties = () => {
            const now = new Date();
            setMembers(prev => prev.map(m => {
                const lastAct = new Date(m.lastActivityDate);
                const diffDays = Math.floor((now - lastAct) / (1000 * 60 * 60 * 24));
                if (diffDays > 7 && m.honorPoints > 0) {
                    // Penalty: -5 points for every day beyond 7 days of inactivity
                    const penalty = (diffDays - 7) * 5;
                    return { ...m, honorPoints: Math.max(0, m.honorPoints - penalty) };
                }
                return m;
            }));
        };
        checkPenalties();
    }, []);

    const updateInventory = (id, amount) => {
        setInventory(prev => prev.map(item =>
            item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
        ));
    };

    const updateMemberPr = (memberId, exerciseName, { weight, reps }) => {
        const w = weight != null ? String(weight).trim() : '';
        const r = reps != null ? String(reps).trim() : '';
        setMembers(prev => prev.map(m => {
            if (m.id !== memberId) return m;
            const next = { ...(m.prs || {}) };
            if (!w && !r) delete next[exerciseName];
            else next[exerciseName] = { weight: w, reps: r };
            return { ...m, prs: next };
        }));
    };

    /**
     * Registra una cuota mensual. `periodStart` = primer día en que rige la mensualidad (ej. reingreso).
     * Puede ser "YYYY-MM-DD" o ISO; si falta o es inválido, usa hoy.
     */
    const renewMember = (id, paymentMethod, periodStart) => {
        const todayLocalNoon = () => {
            const n = new Date();
            return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, 0).toISOString();
        };
        const startIso = periodStartToIso(periodStart) || todayLocalNoon();

        setMembers(prev => prev.map(m => {
            if (m.id !== id) return m;

            const method = (paymentMethod && String(paymentMethod).trim())
                ? paymentMethod.trim()
                : (m.paymentMethod || 'Sin definir');
            const registeredAt = new Date().toISOString();
            const entry = { date: registeredAt, method, periodStart: startIso };

            return {
                ...m,
                lastPaymentDate: startIso,
                paymentMethod: method,
                renewalHistory: [...(m.renewalHistory || []), entry],
            };
        }));
    };

    return (
        <GymContext.Provider value={{
            members,
            attendance,
            inventory,
            news,
            renewMember,
            markAttendance,
            getMemberStatus,
            getExpirationDate,
            getDaysRemaining,
            updateInventory,
            updateMemberPr,
            PR_EXERCISES
        }}>
            {children}
        </GymContext.Provider>
    );
};
