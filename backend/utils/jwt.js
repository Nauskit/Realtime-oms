const jwt = require('jsonwebtoken');

const SCRET_KEY = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    },
        SCRET_KEY,
        { expiresIn: '1h' }
    )
}

module.exports = generateToken;