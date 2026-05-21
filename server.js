require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");

// Kopplar databasen till server.js
const connectDB = require("./config/db");

// Kopplar routes till server.js
const menuRoutes = require("./routes/menuRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});