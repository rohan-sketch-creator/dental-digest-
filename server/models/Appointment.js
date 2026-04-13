const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    patientEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    patientPhone: {
        type: String,
        required: true,
        trim: true
    },
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dentist',
        required: false
    },
    dentistName: {
        type: String,
        required: false
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    notes: {
        type: String,
        default: ''
    },
    whatsappSent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
