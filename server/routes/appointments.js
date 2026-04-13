const router = require('express').Router();
const Appointment = require('../models/Appointment');
const Dentist = require('../models/Dentist');
const whatsappClient = require('../whatsappClient');

// CREATE appointment
router.post('/', async (req, res) => {
    try {
        const { patientName, patientEmail, patientPhone, service, date, timeSlot, notes } = req.body;

        const newAppointment = new Appointment({
            patientName,
            patientEmail,
            patientPhone,
            service,
            date,
            timeSlot,
            notes: notes || ''
        });

        let saved = await newAppointment.save();
        const populated = await Appointment.findById(saved._id);

        // Prepare WhatsApp message
        const message = `🦷 *Demo Dental — Appointment Confirmation*\n\n` +
            `📋 *Booking ID:* ${saved._id}\n` +
            `👤 *Patient:* ${patientName}\n` +
            `🏥 *Service:* ${service}\n` +
            `📅 *Date:* ${date}\n` +
            `🕐 *Time:* ${timeSlot}\n` +
            `${notes ? `📝 *Notes:* ${notes}\n` : ''}\n` +
            `Thank you for booking with us! 😊`;

        // Send Automated Message
        const sent = await whatsappClient.sendMessage(patientPhone, message);
        if (sent) {
            saved = await Appointment.findByIdAndUpdate(saved._id, { whatsappSent: true }, { new: true });
        }

        res.status(201).json({
            appointment: populated,
            automated: true,
            status: sent ? 'sent' : 'bot_not_ready'
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create appointment', details: err.message });
    }
});

// GET all appointments (optionally filter by phone or email)
router.get('/', async (req, res) => {
    try {
        const { phone, email } = req.query;
        let filter = {};
        if (phone) filter.patientPhone = phone;
        if (email) filter.patientEmail = email.toLowerCase();

        const appointments = await Appointment.find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch appointments', details: err.message });
    }
});

// GET single appointment
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch appointment', details: err.message });
    }
});

// UPDATE appointment status
router.put('/:id', async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update appointment', details: err.message });
    }
});

// CANCEL appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment cancelled', appointment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to cancel appointment', details: err.message });
    }
});

module.exports = router;
