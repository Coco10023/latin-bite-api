const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Kopplar databasen till server.js
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});