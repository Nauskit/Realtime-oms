const express = require('express');
const router = express.Router();
const dashBoardController = require('../controllers/dashBoardController')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, dashBoardController.getUserDashBoard)


module.exports = router;