const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user and respond
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch (err) {
        res.status(500).json({ error: "Failed to register user", details: err });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found!");

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong credentials!");

        // Create token
        const tokenToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "AXLEHOST_SECRET", { expiresIn: "5d" });

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token: tokenToken });

    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err });
    }
});

module.exports = router;
