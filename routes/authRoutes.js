const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Route för registrering av nya administratörer
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kontrollerar om användarnamnet redan finns
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "Användaren finns redan" });
        }

        // Hashar lösenordet innan det sparas i databasen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapar ny användare
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

// Route för inloggning
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Söker efter användaren i databasen
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
        }

        // Jämför angivet lösenord med det hashade lösenordet i databasen
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Fel användarnamn eller lösenord" });
        }

        // Skapar en JWT-token för autentisering
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Returnerar token till klienten
        res.json({
            message: "Inloggning lyckades",
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel vid inloggning" });
    }
});

// Exporterar router för användning i servern
module.exports = router;