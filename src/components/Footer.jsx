import React from 'react';
import { AtSign, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="px-6 py-20 border-t border-white/5 bg-ronin-black">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                {/* Contact & Branding */}
                <div className="space-y-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 ronin-gradient rounded-xl flex items-center justify-center p-2">
                                <img src="/images/logo.png" alt="Ronin Logo" className="w-full h-full object-contain brightness-0 invert scale-[1.8]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-2xl font-black tracking-tighter leading-none">RONIN<span className="text-ronin-red">GYM</span></span>
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-1">Dojo La Tablada</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                            Forjando voluntad y fuerza en Gral. Nazar 849. El camino del guerrero no tiene atajos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest border-b border-ronin-red/30 pb-2 w-fit">Contacto</h4>
                            <div className="space-y-3">
                                <a href="mailto:info@ronin1gym.com" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm">
                                    <Mail size={16} className="text-ronin-red" /> info@ronin1gym.com
                                </a>
                                <a href="tel:+541122334455" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm">
                                    <Phone size={16} className="text-ronin-red" /> +54 11 2233-4455
                                </a>
                                <a href="https://instagram.com/ronin_1gym" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm">
                                    <AtSign size={16} className="text-ronin-red" /> @ronin_1gym
                                </a>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest border-b border-ronin-red/30 pb-2 w-fit">Ubicación</h4>
                            <div className="flex items-start gap-3 text-zinc-500 text-sm leading-snug">
                                <MapPin size={20} className="text-ronin-red mt-1" />
                                <span>Gral. Nazar 849,<br />La Tablada, Buenos Aires</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps Placeholder/Iframe */}
                <div className="w-full h-80 rounded-[40px] overflow-hidden glass border border-white/10 relative group">
                    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center text-center p-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <MapPin size={48} className="text-ronin-red mb-4 animate-bounce" />
                        <h4 className="font-black italic uppercase mb-2">Google Maps Live</h4>
                        <p className="text-xs text-zinc-600 max-w-xs">Gral. Nazar 849, La Tablada. Integración API activa en producción.</p>
                    </div>
                    {/* In a real scenario, use: <iframe src="https://www.google.com/maps/embed?..." ... /> */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                    &copy; 2026 Ronin Gym. Bushido Physical Culture.
                </div>
                <div className="flex gap-8 text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Términos</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Ayuda</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
