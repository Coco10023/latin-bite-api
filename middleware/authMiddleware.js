const jwt = require("jsonwebtoken");

// Middleware som skyddar routes och verifierar JWT-token
const protect = (req, res, next) => {
    let token;

    // Kontrollerar om Authorization-headern innehåller en Bearer-token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Hämtar token från Authorization-headern
            token = req.headers.authorization.split(" ")[1];

            // Verifierar token med JWT-secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Sparar användarinformation i request-objektet
            req.user = decoded;

            // Går vidare till nästa middleware eller route
            next();

        } catch (error) {
            return res.status(401).json({
                message: "Inte behörig, token misslyckades"
            });
        }
    }

    // Returnerar fel om ingen token skickades med
    if (!token) {
        return res.status(401).json({
            message: "Inte behörig, ingen token"
        });
    }
};

// Exporterar middleware-funktionen
module.exports = protect;