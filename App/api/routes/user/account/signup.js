const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res
    .status(200)
    .json({
        message: "POST request to /signup"
    });
});

module.exports = router;