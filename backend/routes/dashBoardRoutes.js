const express = require('express');
const router = express.Router();
const dashBoardController = require('../controllers/dashBoardController')
const verifyToken = require('../middleware/verifyToken')
const checkRole = require('../middleware/checkRole')

router.get('/', verifyToken, checkRole('admin'), dashBoardController.getUserDashBoard)


module.exports = router;