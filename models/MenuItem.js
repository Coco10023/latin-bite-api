const mongoose = require("mongoose");

// Schema för restaurangens maträtter
const menuItemSchema = mongoose.Schema({
    
    // Maträttens namn
    title: {
        type: String,
        required: true
    },

    // Beskrivning av maträtten
    description: {
        type: String,
        required: true
    },

    // Maträttens pris
    price: {
        type: Number,
        required: true
    }
});

// Skapar och exporterar modellen MenuItem
module.exports = mongoose.model("MenuItem", menuItemSchema);