const express = require('express');
const router = express.Router();
const sbController = require('../../controllers/scoreboard');

router.get('/', sbController.getAll);

module.exports = router;