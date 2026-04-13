const router = require('express').Router();
const Dentist = require('../models/Dentist');
const Appointment = require('../models/Appointment');

// GET all dentists
router.get('/', async (req, res) => {
    try {
        const dentists = await Dentist.find({ isActive: true }).sort({ rating: -1 });
        res.status(200).json(dentists);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dentists', details: err.message });
    }
});

// GET single dentist
router.get('/:id', async (req, res) => {
    try {
        const dentist = await Dentist.findById(req.params.id);
        if (!dentist) return res.status(404).json({ error: 'Dentist not found' });
        res.status(200).json(dentist);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dentist', details: err.message });
    }
});

// GET available slots for a dentist on a specific date
router.get('/:id/slots', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: 'Date query parameter is required' });

        const dentist = await Dentist.findById(req.params.id);
        if (!dentist) return res.status(404).json({ error: 'Dentist not found' });

        // Check which day of the week the date falls on
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        
        if (!dentist.availableDays.includes(dayOfWeek)) {
            return res.status(200).json({ availableSlots: [], message: `Dr. ${dentist.name} is not available on ${dayOfWeek}s` });
        }

        // Find already booked slots for this dentist on this date
        const bookedAppointments = await Appointment.find({
            dentist: req.params.id,
            date: date,
            status: { $ne: 'cancelled' }
        });

        const bookedSlots = bookedAppointments.map(apt => apt.timeSlot);
        const availableSlots = dentist.availableSlots.filter(slot => !bookedSlots.includes(slot));

        res.status(200).json({ availableSlots, allSlots: dentist.availableSlots, bookedSlots });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch slots', details: err.message });
    }
});

module.exports = router;
