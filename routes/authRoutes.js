const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "Användaren finns redan" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Användare skapad",
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel vid registrering" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Inloggning lyckades",
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel vid inloggning" });
    }
});

module.exports = router;