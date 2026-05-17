const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Hämta alla maträtter
router.get("/", async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Något gick fel" });
    }
});

// Skapa ny maträtt
router.post("/", async (req, res) => {
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

// Uppdatera maträtt
router.put("/:id", async (req, res) => {
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

// Ta bort maträtt
router.delete("/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Maträtt borttagen" });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte ta bort maträtt" });
    }
});

module.exports = router;