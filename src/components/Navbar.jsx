import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Home, UserCheck, Dumbbell, ClipboardList, Calendar, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Rutinas', path: '/rutinas', icon: ClipboardList },
        { name: 'Maquinaria', path: '/maquinaria', icon: Dumbbell },
        { name: 'Horarios', path: '/horarios', icon: Calendar },
        { name: 'Contacto', path: '/contacto', icon: MapPin },
        { name: 'Login Socio', path: '/perfil', icon: User },
        { name: 'Admin', path: '/admin', icon: LayoutDashboard },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 ronin-gradient rounded-lg flex items-center justify-center shadow-lg shadow-ronin-red/20 group-hover:scale-110 transition-transform p-1.5 overflow-hidden">
                        <img src="/images/logo.png" alt="Ronin Logo" className="w-full h-full object-contain brightness-0 invert scale-[1.8]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-lg font-black tracking-tighter leading-none">
                            RONIN<span className="text-ronin-red">GYM</span>
                        </span>
                        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">La Tablada</span>
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-wider transition-colors hover:text-ronin-red ${isActive ? 'text-ronin-red' : 'text-zinc-400'
                                    }`}
                            >
                                <Icon size={16} className={isActive ? 'text-ronin-red' : 'text-zinc-500'} />
                                <span className="hidden lg:inline">{link.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ronin-red"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
