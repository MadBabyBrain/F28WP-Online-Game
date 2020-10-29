const express = require('express');
const router = express.Router();
const loginController = require('../../../controllers/login');

router.get('/', loginController.getAll);

module.exports = router;