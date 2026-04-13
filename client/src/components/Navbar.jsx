import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isDark, toggleDark }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/book', label: 'Book Appointment' },
        { to: '/appointments', label: 'My Appointments' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'glass dark:glass-dark shadow-card py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
                    <div className="w-11 h-11 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-dental transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <span className="text-xl">🦷</span>
                    </div>
                    <div>
                        <span className="font-display text-xl font-extrabold tracking-tight text-dental-dark dark:text-white">
                            Demo <span className="text-primary-500">Dental</span>
                        </span>
                        <span className="block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] -mt-0.5">
                            Clinic
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                isActive(link.to)
                                    ? 'bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-slate-800'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/book"
                        id="nav-cta-book"
                        className="ml-3 btn-primary text-sm !py-2.5 !px-6"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Now
                    </Link>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDark}
                        className="ml-2 w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Toggle & Dark Mode */}
                <div className="flex md:hidden gap-2">
                    <button onClick={toggleDark} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors">
                        {isDark ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <button
                        id="nav-mobile-toggle"
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <div className="space-y-1.5">
                            <span className={`block w-5 h-0.5 bg-dental-dark dark:bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-4 h-0.5 bg-dental-dark dark:bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-5 h-0.5 bg-dental-dark dark:bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="container mx-auto px-6 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                isActive(link.to)
                                    ? 'bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50/50 dark:hover:bg-slate-800'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/book" className="btn-primary w-full text-center text-sm !py-3 mt-2">
                        Book Appointment
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
