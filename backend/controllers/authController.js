const user = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwt')
const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use!" })
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const newUser = await user.create({ username, password: hashedPassword, email });
        return res.status(201).json({ message: "Register successfully" })
    } catch (err) {
        return res.status(400).json({ message: "Faild!" })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginUser = await user.findOne({ username });
        const isMatch = await bcrypt.compare(password, loginUser.password);

        if (!loginUser) {
            return res.status(404).json({ message: "User not found!" })
        }
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password!" })
        }
        const token = generateToken(user)

        return res.status(200).json({ message: "Login successsful", token })
    } catch (err) {
        return res.status(500).json({ message: "Login failed" })
    }
}