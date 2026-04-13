import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DentistCard from '../components/DentistCard';
import GlowingCard from '../components/GlowingCard';
import useReveal from '../hooks/useReveal';
import { WebGLShader } from '../components/ui/WebGLShader';
import { LiquidButton } from '../components/ui/LiquidButton';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const services = [
    { icon: '🪥', title: 'Teeth Cleaning', desc: 'Professional cleaning to remove plaque and tartar buildup', price: '75' },
    { icon: '✨', title: 'Teeth Whitening', desc: 'Brighten your smile with professional whitening treatments', price: '199' },
    { icon: '🦷', title: 'Cavity Filling', desc: 'Restore damaged teeth with tooth-colored composite fillings', price: '120' },
    { icon: '😁', title: 'Braces & Invisalign', desc: 'Straighten your teeth with modern orthodontic solutions', price: '3,500' },
    { icon: '🔬', title: 'Root Canal', desc: 'Save infected teeth with precision root canal therapy', price: '650' },
    { icon: '💎', title: 'Dental Veneers', desc: 'Transform your smile with custom porcelain veneers', price: '800' },
];

const stats = [
    { value: '15K+', label: 'Happy Patients' },
    { value: '12+', label: 'Years Experience' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '5', label: 'Expert Dentists' },
];

const testimonials = [
    { name: 'Ananya K.', text: 'Best dental experience ever! Dr. Chen transformed my smile with veneers. The booking was so easy.', rating: 5, avatar: '👩‍💼' },
    { name: 'Rahul M.', text: 'The WhatsApp confirmation is brilliant. Booked in 2 minutes and Dr. Mitchell was amazing.', rating: 5, avatar: '👨‍💻' },
    { name: 'Sophia L.', text: 'My kids love Dr. Sharma! She makes dental visits fun. Highly recommend for pediatric care.', rating: 5, avatar: '👩‍🦰' },
];

const faqs = [
    { q: 'How do I book an appointment?', a: 'Simply click "Book Appointment", choose your service, select a dentist, pick a date and time, fill in your details, and confirm. You\'ll receive a WhatsApp confirmation link instantly.' },
    { q: 'Can I cancel or reschedule?', a: 'Yes! Go to "My Appointments" and you can cancel any upcoming appointment. To reschedule, cancel the existing one and book a new slot.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, and insurance plans. Payment is collected at the clinic after your visit.' },
    { q: 'How does WhatsApp confirmation work?', a: 'After booking, you\'ll see a "Confirm via WhatsApp" button. Clicking it opens WhatsApp with a pre-filled message containing your appointment details, which you can send to our clinic number for confirmation.' },
];

const Home = () => {
    const [dentists, setDentists] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        axios.get(`${API}/dentists`)
            .then(res => setDentists(res.data.slice(0, 3)))
            .catch(() => {});
    }, []);

    return (
        <div>
            {/* ====== HERO ====== */}
            <section className="min-h-screen flex items-center relative overflow-hidden transition-colors duration-300" id="hero">
                {/* WebGL Shader Background */}
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50">
                    <WebGLShader />
                </div>
                {/* Gradient overlay to blend shader with theme */}
                <div className="absolute inset-0 z-[1] bg-gradient-hero" />

                {/* Decorative orbs */}
                <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-200/20 blur-3xl animate-float pointer-events-none z-[2]" />
                <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent-200/15 blur-3xl animate-float pointer-events-none z-[2]" style={{ animationDelay: '3s' }} />

                <div className="container mx-auto px-6 pt-28 pb-20 relative z-[3]">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-8">
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                Now Accepting Online Bookings
                            </div>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-dental-dark dark:text-white leading-[1.1] tracking-tight">
                                Your Perfect
                                <span className="block bg-gradient-primary bg-clip-text text-transparent animate-gradient">
                                    Smile Awaits
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed max-w-lg">
                                Book your dental appointment in under 2 minutes. Choose your dentist, pick a time, and get instant 
                                <span className="font-bold text-[#25D366]"> WhatsApp </span>
                                confirmation.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
                                <Link to="/book" className="btn-primary text-lg !px-10 !py-4" id="hero-book-btn">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Book Appointment
                                </Link>
                                <LiquidButton className="text-dental-dark dark:text-white border border-gray-200 dark:border-slate-600 rounded-full" size="xl">
                                    ✨ Explore Services
                                </LiquidButton>
                            </div>

                            {/* Glowing Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-8 border-t border-gray-200/40 dark:border-slate-700/40">
                                {stats.map((stat, i) => (
                                    <GlowingCard key={i} value={stat.value} label={stat.label} />
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="hidden lg:flex justify-center relative">
                            <div className="relative w-[420px] h-[420px]">
                                {/* Decorative rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-200/40 animate-[spin_30s_linear_infinite]" />
                                <div className="absolute inset-6 rounded-full border-2 border-dashed border-accent-200/30 animate-[spin_25s_linear_infinite_reverse]" />
                                
                                {/* Center card */}
                                <div className="absolute inset-12 glass rounded-[2.5rem] shadow-glass-lg flex flex-col items-center justify-center p-8">
                                    <span className="text-7xl mb-4 animate-bounce-gentle">🦷</span>
                                    <h3 className="font-display text-xl font-bold text-dental-dark dark:text-white text-center">Demo Dental</h3>
                                    <p className="text-sm text-gray-400 mt-1">Dental Excellence</p>
                                    <div className="flex items-center gap-1 mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2 shadow-card animate-bounce-gentle">
                                    <span className="text-sm font-bold text-primary-600">✓ Instant Booking</span>
                                </div>
                                <div className="absolute bottom-4 -left-4 glass rounded-2xl px-4 py-2 shadow-card animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
                                    <span className="text-sm font-bold text-[#25D366]">💬 WhatsApp Confirm</span>
                                </div>
                                <div className="absolute top-1/2 -right-4 glass rounded-2xl px-4 py-2 shadow-card animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                                    <span className="text-sm font-bold text-accent-600">⭐ Top Rated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== SERVICES ====== */}
            <section className="section bg-white dark:bg-slate-900/50 transition-colors duration-500" id="services">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-500 uppercase tracking-widest">Our Services</span>
                        <h2 className="section-title mt-3">Comprehensive Dental Care</h2>
                        <p className="section-subtitle">From routine cleanings to advanced cosmetic procedures — we've got your smile covered.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                        {services.map((svc, i) => (
                            <div key={i} className="glass-card p-7 group sheen">
                                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    {svc.icon}
                                </div>
                                <h3 className="font-display font-bold text-lg text-dental-dark dark:text-white mb-2">{svc.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{svc.desc}</p>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-xs text-gray-400">from</span>
                                        <span className="font-display font-bold text-xl text-dental-dark dark:text-white ml-1">${svc.price}</span>
                                    </div>
                                    <Link to="/book" className="text-primary-500 font-semibold text-sm hover:text-primary-600 transition-colors flex items-center gap-1 group/link">
                                        Book
                                        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== OUR DENTISTS ====== */}
            <section className="section bg-gradient-hero transition-colors duration-300" id="dentists">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-500 uppercase tracking-widest">Our Team</span>
                        <h2 className="section-title mt-3">Meet Our Expert Dentists</h2>
                        <p className="section-subtitle">Experienced professionals dedicated to your oral health and beautiful smile.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto stagger-children">
                        {dentists.map((d) => (
                            <DentistCard key={d._id} dentist={d} />
                        ))}
                    </div>

                    {dentists.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <span className="text-4xl block mb-3">👨‍⚕️</span>
                            <p className="font-medium">Our dentist team will appear here once the database is seeded.</p>
                            <p className="text-sm mt-1">Run <code className="bg-gray-100 px-2 py-0.5 rounded">npm run seed</code> in the server directory</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/book" className="btn-primary">
                            Book With Our Dentists
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ====== HOW IT WORKS ====== */}
            <section className="section bg-white dark:bg-slate-900/50 transition-colors duration-500" id="how-it-works">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-500 uppercase tracking-widest">How It Works</span>
                        <h2 className="section-title mt-3">Book in 3 Simple Steps</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto stagger-children">
                        {[
                            { num: '01', icon: '🏥', title: 'Choose Service & Dentist', desc: 'Select the treatment you need and pick your preferred dentist from our expert team.' },
                            { num: '02', icon: '📅', title: 'Pick Date & Time', desc: 'Choose a convenient date and time slot. See real-time availability instantly.' },
                            { num: '03', icon: '💬', title: 'Confirm via WhatsApp', desc: 'Get instant confirmation sent directly to your WhatsApp. No calls needed!' },
                        ].map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 rounded-3xl glass-card border border-gray-100 dark:border-slate-700 shadow-card flex items-center justify-center text-3xl transition-all duration-300 group-hover:shadow-dental group-hover:scale-110 group-hover:-translate-y-1">
                                        {step.icon}
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-primary-500 text-white text-xs font-bold flex items-center justify-center shadow-dental">
                                        {step.num}
                                    </span>
                                </div>
                                <h3 className="font-display font-bold text-lg text-dental-dark dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== TESTIMONIALS ====== */}
            <section className="section bg-dental-cream dark:bg-slate-900 transition-colors duration-300" id="testimonials">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-500 uppercase tracking-widest">Testimonials</span>
                        <h2 className="section-title mt-3">What Our Patients Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
                        {testimonials.map((t, i) => (
                            <div key={i} className="glass-card p-7 sheen">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                                <div className="flex items-center gap-3 border-t border-gray-100/50 dark:border-slate-700/50 pt-4">
                                    <span className="text-2xl">{t.avatar}</span>
                                    <span className="font-bold text-sm text-dental-dark dark:text-white">{t.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== FAQ ====== */}
            <section className="section bg-white dark:bg-slate-900/50 transition-colors duration-500" id="faq">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-500 uppercase tracking-widest">FAQ</span>
                        <h2 className="section-title mt-3">Frequently Asked Questions</h2>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="card overflow-hidden" id={`faq-${i}`}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-display font-bold text-dental-dark dark:text-white pr-4">{faq.q}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== CTA ====== */}
            <section className="py-24 bg-gradient-primary relative overflow-hidden" id="cta">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 text-8xl animate-float">🦷</div>
                    <div className="absolute bottom-10 right-10 text-6xl animate-float" style={{ animationDelay: '2s' }}>✨</div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready for Your Best Smile?
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                        Book your appointment today and take the first step towards a healthier, brighter smile.
                    </p>
                    <Link to="/book" className="inline-flex items-center gap-3 px-10 py-4 bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Your Appointment
                    </Link>
                </div>
            </section>

            {/* ====== FOOTER ====== */}
            <footer className="bg-dental-dark py-16" id="footer">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                                    <span className="text-lg">🦷</span>
                                </div>
                                <span className="font-display text-xl font-extrabold text-white">
                                    Demo <span className="text-primary-400">Dental</span>
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Premier dental clinic with online booking and WhatsApp confirmation. Your health is our priority.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-400 mb-5">Quick Links</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                                <li><Link to="/book" className="hover:text-primary-400 transition-colors">Book Appointment</Link></li>
                                <li><Link to="/appointments" className="hover:text-primary-400 transition-colors">My Appointments</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-400 mb-5">Services</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li>Teeth Cleaning</li>
                                <li>Teeth Whitening</li>
                                <li>Braces & Invisalign</li>
                                <li>Dental Implants</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-400 mb-5">Contact</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex items-center gap-2">📍 123 Dental Lane, Care City</li>
                                <li className="flex items-center gap-2">📞 +1 (555) 123-4567</li>
                                <li className="flex items-center gap-2">📧 hello@demodental.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <p>© 2026 Demo Dental. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
