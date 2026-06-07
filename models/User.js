const mongoose = require("mongoose");

// Schema för administratörsanvändare
const userSchema = mongoose.Schema({

    // Unikt användarnamn för inloggning
    username: {
        type: String,
        required: true,
        unique: true
    },

    // Lösenord (lagras hashat med bcrypt)
    password: {
        type: String,
        required: true
    }
});

// Skapar och exporterar modellen User
module.exports = mongoose.model("User", userSchema);