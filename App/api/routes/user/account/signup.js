const express = require('express');
const router = express.Router();

const SignController = require('../../../controllers/signup');

router.post('/', SignController.user_signup);

module.exports = router;