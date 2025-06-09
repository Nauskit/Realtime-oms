const user = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwt')
const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {

        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use!" })
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const newUser = await user.create({ username, password: hashedPassword, email });
        return res.status(201).json({ message: "Register successfully" })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Faild!", error: err.message })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {


        const loginUser = await user.findOne({ username });
        if (!loginUser) {
            return res.status(404).json({ message: "User not found!" })
        }

        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password!" })
        }
        const token = generateToken(loginUser)

        return res.status(200).json({ message: "Login successsful", token })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Login failed", error: err.message })
    }
}