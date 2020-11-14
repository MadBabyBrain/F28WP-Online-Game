const express = require('express');
const router = express.Router();

const SignController = require('../../../controllers/signup');

router.post('/', SignController.userSignup);

module.exports = router;