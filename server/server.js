const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const dentistRoutes = require('./routes/dentists');
const appointmentRoutes = require('./routes/appointments');

app.use('/api/auth', authRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

// Initialize WhatsApp Bot
require('./whatsappClient');


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dental_booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('🦷 Demo Dental Database Connected');
}).catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
});

// Basic test route
app.get('/', (req, res) => {
    res.json({
        name: 'Demo Dental API',
        status: 'online',
        version: '1.0.0',
        endpoints: {
            dentists: '/api/dentists',
            appointments: '/api/appointments',
            auth: '/api/auth'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Demo Dental API running on port ${PORT}`);
});
