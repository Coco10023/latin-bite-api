const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Hämtar alla maträtter från databasen
router.get("/", async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Något gick fel" });
    }
});

// Skapar en ny maträtt (kräver inloggad administratör)
router.post("/", protect, async (req, res) => {
    try {
        const { title, description, price } = req.body;

        const menuItem = await MenuItem.create({
            title,
            description,
            price
        });

        res.status(201).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte skapa maträtt" });
    }
});

// Uppdaterar en befintlig maträtt via dess ID
router.put("/:id", protect, async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte uppdatera maträtt" });
    }
});

// Tar bort en maträtt via dess ID
router.delete("/:id", protect, async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Maträtt borttagen" });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte ta bort maträtt" });
    }
});

// Exporterar router med API-routes för menyn
module.exports = router;