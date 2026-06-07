require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");

// Importerar funktion för databasanslutning
const connectDB = require("./config/db");

// Importerar routes för menyhantering
const menuRoutes = require("./routes/menuRoutes");

const app = express();

// Ansluter till MongoDB
connectDB();

// Middleware
app.use(cors()); // Tillåter anrop från frontend
app.use(express.json()); // Gör det möjligt att läsa JSON-data i requests

// Routes
app.use("/api/auth", authRoutes); // Routes för registrering och inloggning
app.use("/api/menu", menuRoutes); // Routes för menyhantering

const PORT = process.env.PORT || 3000;

// Startar servern och lyssnar på angiven port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});