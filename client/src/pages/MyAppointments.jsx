import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusStyles = {
    confirmed: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500', label: 'Confirmed' },
    pending:   { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500', label: 'Pending' },
    cancelled: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400', label: 'Cancelled' },
    completed: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500', label: 'Completed' },
};

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPhone, setSearchPhone] = useState('');
    const [searched, setSearched] = useState(false);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchAppointments = async (phone) => {
        if (!phone.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await axios.get(`${API}/appointments?phone=${encodeURIComponent(phone.trim())}`);
            setAppointments(res.data);
        } catch {
            setAppointments([]);
        }
        setLoading(false);
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        setCancellingId(id);
        try {
            await axios.delete(`${API}/appointments/${id}`);
            setAppointments(prev => prev.map(a =>
                a._id === id ? { ...a, status: 'cancelled' } : a
            ));
        } catch {
            alert('Failed to cancel appointment');
        }
        setCancellingId(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') fetchAppointments(searchPhone);
    };

    return (
        <div className="min-h-screen bg-gradient-hero pt-28 pb-20" id="my-appointments-page">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <h1 className="section-title !text-3xl">My Appointments</h1>
                        <p className="text-gray-500 mt-3">Search your appointments by phone number.</p>
                    </div>

                    {/* Search */}
                    <div className="card p-6 mb-8 animate-slide-up" id="appointment-search">
                        <label className="block text-sm font-bold text-dental-dark mb-3">Search by Phone Number</label>
                        <div className="flex gap-3">
                            <input
                                type="tel"
                                id="search-phone"
                                value={searchPhone}
                                onChange={(e) => setSearchPhone(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="+91 9876543210"
                                className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-dental-dark dark:text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                            />
                            <button
                                onClick={() => fetchAppointments(searchPhone)}
                                className="btn-primary !px-6"
                                id="search-btn"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                        </div>
                    ) : searched && appointments.length === 0 ? (
                        <div className="text-center py-16 animate-fade-in">
                            <span className="text-5xl block mb-4">📋</span>
                            <h3 className="font-display text-xl font-bold text-dental-dark mb-2">No Appointments Found</h3>
                            <p className="text-gray-500 text-sm mb-6">We couldn't find any appointments with that phone number.</p>
                            <Link to="/book" className="btn-primary">
                                Book Your First Appointment
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4 stagger-children">
                            {appointments.map((apt) => {
                                const status = statusStyles[apt.status] || statusStyles.pending;
                                const isPast = new Date(apt.date) < new Date();

                                return (
                                    <div key={apt._id} className="card p-6" id={`appointment-${apt._id}`}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-display font-bold text-dental-dark text-lg">{apt.service}</h3>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bg} ${status.text} text-xs font-bold`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${apt.status === 'confirmed' ? 'animate-pulse' : ''}`} />
                                                {status.label}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(apt.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {apt.timeSlot}
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-400 font-mono mb-4">
                                            ID: {apt._id?.slice(-8).toUpperCase()}
                                        </div>

                                        {apt.status !== 'cancelled' && !isPast && (
                                            <div className="flex gap-3 border-t border-gray-50 pt-4">
                                                <Link
                                                    to={`/confirmation/${apt._id}`}
                                                    className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
                                                >
                                                    View Details
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleCancel(apt._id)}
                                                    disabled={cancellingId === apt._id}
                                                    className="text-sm font-semibold text-red-400 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
                                                >
                                                    {cancellingId === apt._id ? (
                                                        <>
                                                            <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                                                            Cancelling...
                                                        </>
                                                    ) : (
                                                        <>Cancel</>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* No-search state */}
                    {!searched && !loading && (
                        <div className="text-center py-12 animate-fade-in">
                            <span className="text-5xl block mb-4">🔍</span>
                            <h3 className="font-display text-xl font-bold text-dental-dark mb-2">Find Your Appointments</h3>
                            <p className="text-gray-500 text-sm">Enter the phone number you used when booking to see your appointments.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;
