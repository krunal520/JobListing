const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken || !headerToken.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const token = headerToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                errorMessage: "Token expired",
                isTokenExpired: true,
            });
        }
        return res.status(403).json({ errorMessage: "Invalid token" });
    }
};


module.exports = verifyToken;
