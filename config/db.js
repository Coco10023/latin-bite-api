const mongoose = require("mongoose");

// Funktion som ansluter applikationen till MongoDB
const connectDB = async () => {
    try {
        // Ansluter till databasen med URI från environment variables
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        // Skriver ut felmeddelande om anslutningen misslyckas
        console.log(error);

        // Avslutar applikationen med felkod
        process.exit(1);
    }
};

// Exporterar funktionen så att den kan användas i andra filer
module.exports = connectDB;