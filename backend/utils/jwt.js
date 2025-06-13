const jwt = require('jsonwebtoken');

const ACCESS_SCRET_KEY = process.env.JWT_SECRET;
const REFRESH_SCRET_KEY = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    },
        ACCESS_SCRET_KEY,
        { expiresIn: '15m' }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    },
        REFRESH_SCRET_KEY,
        { expiresIn: '5d' }
    )
}

module.exports = { generateAccessToken, generateRefreshToken };