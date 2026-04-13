import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Confirmation = () => {
    const { id } = useParams();
    const location = useLocation();
    const [appointment, setAppointment] = useState(location.state?.appointment || null);
    const [loading, setLoading] = useState(!appointment);

    useEffect(() => {
        if (!appointment && id) {
            setLoading(true);
            axios.get(`${API}/appointments/${id}`)
                .then(res => {
                    setAppointment(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="text-center">
                    <span className="text-6xl block mb-4">😕</span>
                    <h2 className="font-display text-2xl font-bold text-dental-dark mb-2">Appointment Not Found</h2>
                    <p className="text-gray-500 mb-6">We couldn't find this appointment.</p>
                    <Link to="/book" className="btn-primary">Book New Appointment</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero pt-28 pb-20" id="confirmation-page">
            <div className="container mx-auto px-6">
                <div className="max-w-lg mx-auto">
                    {/* Success animation */}
                    <div className="text-center mb-8 animate-slide-up">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-6 animate-scale-in">
                            <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="section-title !text-3xl">Appointment Booked! 🎉</h1>
                        <p className="text-gray-500 mt-3">Your dental appointment has been scheduled successfully.</p>
                    </div>

                    {/* Appointment Details Card */}
                    <div className="card p-7 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="font-display font-bold text-dental-dark">Appointment Details</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-400 font-medium">Booking ID</span>
                                <span className="text-sm font-bold text-dental-dark font-mono">{appointment._id?.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-400 font-medium">Service</span>
                                <span className="text-sm font-bold text-dental-dark">{appointment.service}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-400 font-medium">Date</span>
                                <span className="text-sm font-bold text-dental-dark">
                                    {new Date(appointment.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-400 font-medium">Time</span>
                                <span className="text-sm font-bold text-primary-600">{appointment.timeSlot}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-400 font-medium">Patient</span>
                                <span className="text-sm font-bold text-dental-dark">{appointment.patientName}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-400 font-medium">Status</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Confirmed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Confirmation */}
                    <div className="animate-slide-up bg-green-50 border border-green-200 rounded-2xl p-5 text-center mt-6" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-center gap-3 text-green-700 font-bold mb-2">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Confirmation Sent!
                        </div>
                        <p className="text-sm text-green-700/80">
                            A confirmation message has been automatically sent to your WhatsApp number.
                        </p>
                    </div>

                    {/* Additional actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link to="/appointments" className="btn-secondary flex-1 text-center text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            View All Appointments
                        </Link>
                        <Link to="/" className="btn-secondary flex-1 text-center text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
