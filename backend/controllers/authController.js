const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const SALT_ROUNDS = 10;
dotenv.config();


exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use!" })
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const newUser = await User.create({ username, password: hashedPassword, email });
        return res.status(201).json({ message: "Register successfully" })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Faild!", error: err.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {


        const loginUser = await User.findOne({ email });
        if (!loginUser) {
            return res.status(404).json({ message: "User not found!" })
        }

        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password!" })
        }
        const accessToken = generateAccessToken(loginUser)
        const refreshToken = generateRefreshToken(loginUser)

        loginUser.refreshToken = refreshToken;
        await loginUser.save();

        return res.status(200).json({
            message: "Login successsful",
            accessToken,
            refreshToken,
            role: loginUser.role
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Login failed", error: err.message })
    }
}

exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Refresh token required!" })
    }

    try {
        const userFound = await User.findOne({ refreshToken: token });
        if (!userFound) {
            return res.status(403).josn({ message: "Refresh Token invalid" });
        }
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Refresh Token invalid" })


            const accessToken = generateAccessToken({
                id: decoded.id,
                username: decoded.username,
                role: decoded.role
            })
            res.josn({ accessToken });
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}


exports.logout = async (req, res) => {
    const { token } = req.body;

    try {
        const userFound = await User.findOne({ refreshToken: token });
        if (!userFound) return res.status(204).send();

        userFound.refreshToken = null;
        await userFound.save();

        return res.status(200).json({ message: "Logout successful!" })

    } catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}


exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to get users" })
    }
}

exports.getUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const getUser = await User.findById(userId).select('username');
        return res.json(getUser)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to get users" })
    }
}