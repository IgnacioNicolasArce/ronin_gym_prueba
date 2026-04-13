import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className, size = 16 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
);

/** Gral. Nazar 849, La Tablada (OSM Nominatim) */
const GYM_LAT = -34.702258;
const GYM_LNG = -58.522906;
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${GYM_LAT},${GYM_LNG}&z=17&hl=es&output=embed`;
const MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${GYM_LAT},${GYM_LNG}`;

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
                                    <InstagramIcon size={16} className="text-ronin-red shrink-0" />
                                    <span>@ronin_1gym</span>
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

                <div className="w-full h-80 rounded-[40px] overflow-hidden border border-white/10 relative bg-zinc-900 shadow-xl shadow-black/40">
                    <iframe
                        title="Ronin Gym — Gral. Nazar 849, La Tablada"
                        src={MAPS_EMBED_SRC}
                        className="absolute inset-0 w-full h-full border-0 grayscale-[0.35] contrast-[1.05] hover:grayscale-0 transition-[filter] duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                    <a
                        href={MAPS_OPEN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-widest text-white hover:bg-ronin-red hover:border-ronin-red transition-colors"
                    >
                        <ExternalLink size={14} />
                        Abrir en Google Maps
                    </a>
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
