import React from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Apple, DollarSign, Users, Award, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
    const staff = [
        { name: 'Kaito Tanaka', role: 'Head Coach / Jiu-Jitsu', image: '/images/staff1.png' },
        { name: 'Sarah Miller', role: 'Fitness Pro / Nutrition', image: '/images/staff2.png' },
    ];

    const plans = [
        {
            name: 'Plan Mensual',
            price: '$15.000',
            features: ['Acceso ilimitado', 'Rutina básica', 'Seguimiento de peso', 'Uso de lockers'],
            featured: false
        },
        {
            name: 'Ronin Elite',
            price: '$25.000',
            features: ['Personal Trainer', 'Plan nutricional', 'Acceso clases grupales', 'Evaluación mensual'],
            featured: true
        },
        {
            name: 'Personal Trainer',
            price: '$12.000',
            features: ['Sesiones individuales', 'Solo servicio PT', 'Consultas 24/7'],
            featured: false,
            footer: '* Adicional a la cuota mensual'
        }
    ];

    const nutritionCategories = [
        { title: 'Volumen', desc: 'Aumento de masa muscular con superávit calórico controlado.', color: 'ronin-red' },
        { title: 'Definición', desc: 'Pérdida de grasa manteniendo la fuerza muscular.', color: 'ronin-gold' },
        { title: 'Mantenimiento', desc: 'Estabilidad y optimización del rendimiento físico.', color: 'zinc-400' }
    ];

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative px-6 py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                            DOMINA TU <br />
                            <span className="text-ronin-red">DESTINO.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg mb-8 max-w-md">
                            En Ronin Gym no solo entrenamos cuerpos, forjamos voluntades. Disciplina, fuerza y honor en cada repetición.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 ronin-gradient rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition-transform">
                                Empezar Ahora
                            </button>
                            <button className="px-8 py-4 glass rounded-xl font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                Ver Instalaciones
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-ronin-red/20 blur-3xl rounded-full" />
                        <img
                            src="/images/staff1.png"
                            alt="Ronin Gym Training"
                            className="relative z-10 w-full aspect-square object-cover rounded-3xl border border-white/10 shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Staff Section */}
            <section className="px-6 py-24 bg-ronin-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Nuestros <span className="text-ronin-red">Maestros</span></h2>
                        <p className="text-zinc-500">Expertos dedicados a llevarte a tu máximo nivel.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {staff.map((p, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group relative overflow-hidden rounded-3xl bg-ronin-card border border-white/5"
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                                    <p className="text-ronin-red font-semibold uppercase text-sm tracking-widest">{p.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prices Section */}
            <section className="px-6 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Planes de <span className="text-ronin-gold">Honor</span></h2>
                        <p className="text-zinc-500">Sin contratos ocultos, solo compromiso contigo mismo.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className={`p-8 rounded-3xl relative overflow-hidden ${plan.featured ? 'bg-ronin-card border-2 border-ronin-red/50 shadow-2xl shadow-ronin-red/10' : 'bg-ronin-card/50 border border-white/5'
                                    }`}
                            >
                                {plan.featured && <div className="absolute top-0 right-0 ronin-gradient px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">Más Popular</div>}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-6">
                                    <span className="text-4xl font-black">{plan.price}</span>
                                    <span className="text-zinc-500 text-sm mb-1">/mes</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-zinc-400 text-sm">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                                <Check size={12} className="text-ronin-red" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition-all ${plan.featured ? 'ronin-gradient hover:shadow-lg hover:shadow-ronin-red/30' : 'bg-white/5 hover:bg-white/10'
                                    }`}>
                                    Elegir Plan
                                </button>
                                {plan.footer && <p className="mt-4 text-center text-xs text-zinc-500 italic">{plan.footer}</p>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nutrition Section */}
            <section className="px-6 py-24 bg-ronin-dark/50 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute inset-0 bg-ronin-gold/10 blur-[100px] rounded-full" />
                        <img
                            src="/images/nutrition.png"
                            alt="Nutrition Plans"
                            className="relative z-10 w-full rounded-3xl border border-white/10 shadow-2xl"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-4xl font-bold mb-6">Nutrición <span className="text-ronin-gold">Guerrea</span></h2>
                        <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                            El 70% del guerrero se forja en la cocina. Nuestros planes alimentarios están diseñados para complementar tu entrenamiento y potenciar tus resultados.
                        </p>
                        <div className="space-y-6">
                            {nutritionCategories.map((cat, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform`}>
                                        <Zap className={cat.color === 'ronin-red' ? 'text-ronin-red' : cat.color === 'ronin-gold' ? 'text-ronin-gold' : 'text-zinc-400'} size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{cat.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-snug">{cat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;
