const mongoose = require('mongoose');
require('dotenv').config();

const Dentist = require('./models/Dentist');

const dentists = [
    {
        name: 'Sarah Mitchell',
        specialization: 'General Dentistry',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        experience: 12,
        bio: 'Dr. Sarah Mitchell brings over 12 years of experience in general dentistry. She is passionate about preventive care and creating beautiful, healthy smiles for her patients.',
        rating: 4.9,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableSlots: [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '12:00 PM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM', '05:00 PM'
        ],
        services: ['General Checkup', 'Teeth Cleaning', 'Cavity Filling', 'Teeth Whitening']
    },
    {
        name: 'James Rodriguez',
        specialization: 'Orthodontics',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        experience: 15,
        bio: 'Dr. James Rodriguez is a board-certified orthodontist specializing in braces, Invisalign, and bite correction. He has transformed thousands of smiles with his precise, patient-centered approach.',
        rating: 4.8,
        availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        availableSlots: [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM'
        ],
        services: ['Braces', 'Invisalign', 'Bite Correction', 'Retainers']
    },
    {
        name: 'Emily Chen',
        specialization: 'Cosmetic Dentistry',
        photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964f267?w=400&h=400&fit=crop&crop=face',
        experience: 10,
        bio: 'Dr. Emily Chen is an expert in cosmetic dental procedures, helping patients achieve their dream smiles. She specializes in veneers, teeth whitening, and smile makeovers.',
        rating: 4.9,
        availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableSlots: [
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
            '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM',
            '03:30 PM', '04:00 PM', '04:30 PM'
        ],
        services: ['Veneers', 'Teeth Whitening', 'Smile Makeover', 'Bonding']
    },
    {
        name: 'Michael Thompson',
        specialization: 'Oral Surgery',
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
        experience: 18,
        bio: 'Dr. Michael Thompson is a skilled oral surgeon with 18 years of experience. He specializes in wisdom teeth extractions, dental implants, and complex surgical procedures.',
        rating: 4.7,
        availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
        availableSlots: [
            '09:00 AM', '10:00 AM', '11:00 AM',
            '02:00 PM', '03:00 PM', '04:00 PM'
        ],
        services: ['Tooth Extraction', 'Dental Implants', 'Wisdom Teeth', 'Root Canal']
    },
    {
        name: 'Priya Sharma',
        specialization: 'Pediatric Dentistry',
        photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
        experience: 8,
        bio: 'Dr. Priya Sharma loves working with children and making dental visits fun. She specializes in preventive care for kids and creates a comfortable, anxiety-free environment.',
        rating: 4.9,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
        availableSlots: [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '12:00 PM',
            '02:00 PM', '02:30 PM', '03:00 PM'
        ],
        services: ['Child Checkup', 'Fluoride Treatment', 'Sealants', 'Child Cavity Filling']
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dental_booking', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('📦 Connected to MongoDB');

        // Clear existing dentists
        await Dentist.deleteMany({});
        console.log('🗑️  Cleared existing dentists');

        // Insert new dentists
        const created = await Dentist.insertMany(dentists);
        console.log(`✅ Seeded ${created.length} dentists:`);
        created.forEach(d => {
            console.log(`   → Dr. ${d.name} (${d.specialization})`);
        });

        await mongoose.connection.close();
        console.log('\n🦷 Database seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    }
}

seedDatabase();
