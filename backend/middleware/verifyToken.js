const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Access token is required" })
    }
    const token = authHeader.replace("Bearer", " ").trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" })
    }
}

module.exports = verifyToken;