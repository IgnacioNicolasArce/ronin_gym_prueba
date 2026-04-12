import React, { createContext, useContext, useState, useEffect } from 'react';

const GymContext = createContext();

export const useGym = () => useContext(GymContext);

export const GymProvider = ({ children }) => {
    // Members with enhanced fields (honorPoints, PRs)
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem('ronin_members_v2');
        return saved ? JSON.parse(saved) : [
            {
                id: '1',
                name: 'Juan Perez',
                dni: '12345678',
                lastPaymentDate: new Date().toISOString(),
                paymentMethod: 'Efectivo',
                plan: 'Musculación',
                honorPoints: 150,
                lastActivityDate: new Date().toISOString(),
                prs: { 'Press de Banca': '100kg', 'Sentadilla': '140kg', 'Peso Muerto': '180kg' }
            },
            {
                id: '2',
                name: 'Maria Garcia',
                dni: '87654321',
                lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                paymentMethod: 'Mercado Pago',
                plan: 'Personalizado',
                honorPoints: 80,
                lastActivityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                prs: { 'Press de Banca': '40kg', 'Sentadilla': '60kg' }
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

    const getMemberStatus = (lastPaymentDate) => {
        const today = new Date();
        const lastPayment = new Date(lastPaymentDate);
        const diffTime = Math.abs(today - lastPayment);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 28) return 'green';
        if (diffDays <= 31) return 'yellow';
        return 'red';
    };

    const getDaysRemaining = (lastPaymentDate) => {
        const lastPayment = new Date(lastPaymentDate);
        const expiration = new Date(lastPayment);
        expiration.setDate(expiration.getDate() + 31);
        const today = new Date();
        const diffTime = expiration - today;
        return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
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

    const renewMember = (id) => {
        setMembers(prev => prev.map(m => {
            if (m.id === id) {
                const currentDate = new Date();
                const lastDate = new Date(m.lastPaymentDate);
                const expirationDate = new Date(lastDate);
                expirationDate.setDate(expirationDate.getDate() + 31);

                let newDate;
                if (currentDate > expirationDate) {
                    newDate = currentDate.toISOString();
                } else {
                    const adjustedDate = new Date(m.lastPaymentDate);
                    adjustedDate.setDate(adjustedDate.getDate() + 31);
                    newDate = adjustedDate.toISOString();
                }
                return { ...m, lastPaymentDate: newDate };
            }
            return m;
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
            getDaysRemaining,
            updateInventory
        }}>
            {children}
        </GymContext.Provider>
    );
};
