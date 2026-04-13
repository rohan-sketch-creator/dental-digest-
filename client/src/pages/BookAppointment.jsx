import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from '../components/StepIndicator';
import ServiceCard from '../components/ServiceCard';
import TimeSlotPicker from '../components/TimeSlotPicker';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SERVICES = [
    { icon: '🪥', title: 'General Checkup', description: 'Complete oral examination and consultation', price: '50' },
    { icon: '🧹', title: 'Teeth Cleaning', description: 'Professional plaque and tartar removal', price: '75' },
    { icon: '✨', title: 'Teeth Whitening', description: 'Professional whitening for a brighter smile', price: '199' },
    { icon: '🦷', title: 'Cavity Filling', description: 'Tooth-colored composite fillings', price: '120' },
    { icon: '😁', title: 'Braces', description: 'Orthodontic braces for teeth alignment', price: '3,500' },
    { icon: '🔬', title: 'Root Canal', description: 'Root canal therapy for infected teeth', price: '650' },
    { icon: '💎', title: 'Veneers', description: 'Custom porcelain veneers for your smile', price: '800' },
    { icon: '🏗️', title: 'Dental Implants', description: 'Permanent tooth replacement implants', price: '2,000' },
    { icon: '👶', title: 'Child Checkup', description: 'Pediatric dental examination', price: '40' },
    { icon: '🛡️', title: 'Fluoride Treatment', description: 'Protective fluoride for stronger teeth', price: '35' },
    { icon: '🔩', title: 'Tooth Extraction', description: 'Safe and painless tooth removal', price: '150' },
    { icon: '😬', title: 'Invisalign', description: 'Clear aligners for invisible correction', price: '4,000' },
];

const STEPS = ['Service', 'Date & Time', 'Details', 'Review'];

const BookAppointment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        // Automatically set generic static slots when service selected
    }, []);

    const canProceed = () => {
        switch (step) {
            case 0: return !!selectedService;
            case 1: return !!selectedDate && !!selectedTime;
            case 2: return !!patientName && !!patientEmail && !!patientPhone;
            case 3: return true;
            default: return false;
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError('');
        try {
            const res = await axios.post(`${API}/appointments`, {
                patientName,
                patientEmail,
                patientPhone,
                service: selectedService,
                date: selectedDate,
                timeSlot: selectedTime,
                notes
            });
            navigate(`/confirmation/${res.data.appointment._id}`, {
                state: {
                    appointment: res.data.appointment,
                    whatsappLink: res.data.whatsappLink
                }
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to book appointment. Please try again.');
            setSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 3) {
            handleSubmit();
        } else {
            setStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-hero pt-28 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="section-title">Book Your Appointment</h1>
                    <p className="section-subtitle">Complete the steps below to schedule your dental visit.</p>
                </div>

                {/* Step Indicator */}
                <StepIndicator steps={STEPS} currentStep={step} />

                {/* Step Content */}
                <div className="max-w-4xl mx-auto">
                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2 animate-slide-down">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* STEP 0: Select Service */}
                    {step === 0 && (
                        <div className="animate-slide-up" id="step-service">
                            <h2 className="font-display font-bold text-2xl text-dental-dark mb-2">Select a Service</h2>
                            <p className="text-gray-500 mb-8">Choose the dental treatment you need.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {SERVICES.map((svc, i) => (
                                    <ServiceCard
                                        key={svc.title}
                                        icon={svc.icon}
                                        title={svc.title}
                                        description={svc.description}
                                        price={svc.price}
                                        selected={selectedService === svc.title}
                                        onClick={() => setSelectedService(svc.title)}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 1: Select Date & Time */}
                    {step === 1 && (
                        <div className="animate-slide-up" id="step-datetime">
                            <h2 className="font-display font-bold text-2xl text-dental-dark mb-2">Pick Date & Time</h2>
                            <p className="text-gray-500 mb-8">
                                Scheduling for <span className="font-semibold text-primary-600">{selectedService}</span>
                            </p>
                            <div className="max-w-md mx-auto">
                                <TimeSlotPicker
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                    availableSlots={['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']}
                                    bookedSlots={[]}
                                    dentistAvailableDays={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
                                    loading={false}
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Patient Details */}
                    {step === 2 && (
                        <div className="animate-slide-up max-w-lg mx-auto" id="step-details">
                            <h2 className="font-display font-bold text-2xl text-dental-dark mb-2">Your Details</h2>
                            <p className="text-gray-500 mb-8">Fill in your contact information.</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-dental-dark mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        id="input-name"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-dental-dark dark:text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dental-dark mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        id="input-email"
                                        value={patientEmail}
                                        onChange={(e) => setPatientEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-dental-dark dark:text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dental-dark mb-2">Phone Number * <span className="text-xs text-gray-400">(with country code)</span></label>
                                    <input
                                        type="tel"
                                        id="input-phone"
                                        value={patientPhone}
                                        onChange={(e) => setPatientPhone(e.target.value)}
                                        placeholder="+91 9876543210"
                                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-dental-dark dark:text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dental-dark mb-2">Additional Notes <span className="text-xs text-gray-400">(optional)</span></label>
                                    <textarea
                                        id="input-notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Any allergies, concerns, or special requests..."
                                        rows={3}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-dental-dark dark:text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Review */}
                    {step === 3 && (
                        <div className="animate-slide-up max-w-lg mx-auto" id="step-review">
                            <h2 className="font-display font-bold text-2xl text-dental-dark mb-2">Review & Confirm</h2>
                            <p className="text-gray-500 mb-8">Please review your appointment details before confirming.</p>

                            <div className="card p-7 space-y-5">
                                {/* Service */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service</span>
                                        <p className="font-display font-bold text-dental-dark mt-1">{selectedService}</p>
                                    </div>
                                    <button onClick={() => setStep(0)} className="text-primary-500 text-xs font-bold hover:underline">Edit</button>
                                </div>

                                <hr className="border-gray-100" />



                                {/* Date & Time */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</span>
                                        <p className="font-display font-bold text-dental-dark mt-1">
                                            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="text-sm text-primary-600 font-semibold">{selectedTime}</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-primary-500 text-xs font-bold hover:underline">Edit</button>
                                </div>

                                <hr className="border-gray-100" />

                                {/* Patient */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patient</span>
                                        <p className="font-display font-bold text-dental-dark mt-1">{patientName}</p>
                                        <p className="text-xs text-gray-500">{patientEmail}</p>
                                        <p className="text-xs text-gray-500">{patientPhone}</p>
                                    </div>
                                    <button onClick={() => setStep(2)} className="text-primary-500 text-xs font-bold hover:underline">Edit</button>
                                </div>

                                {notes && (
                                    <>
                                        <hr className="border-gray-100" />
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notes</span>
                                            <p className="text-sm text-gray-600 mt-1">{notes}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 p-4 rounded-2xl bg-primary-50 border border-primary-100 flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <p className="text-sm text-primary-800">
                                    After confirming, you'll be able to <strong>send your appointment details via WhatsApp</strong> for instant clinic confirmation.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 max-w-lg mx-auto">
                        {step > 0 ? (
                            <button
                                onClick={prevStep}
                                className="btn-secondary !px-6"
                                id="btn-back"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={nextStep}
                            disabled={!canProceed() || submitting}
                            className={`btn-primary !px-8 ${!canProceed() ? 'opacity-50 cursor-not-allowed !translate-y-0 !shadow-none' : ''}`}
                            id="btn-next"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Booking...
                                </>
                            ) : step === 3 ? (
                                <>
                                    Confirm Booking
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Continue
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
