const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/authController');
const rateLimit = require('express-rate-limit')
const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, please try again later."
})

router.post('/register', authControllers.register);
router.post('/login', limiter, authControllers.login);
router.get('/admin', verifyToken, checkRole('admin'), authControllers.getUser);

module.exports = router;