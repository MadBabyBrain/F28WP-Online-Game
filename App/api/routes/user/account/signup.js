const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const user = {
        email: req.body.email,
        pass: req.body.pass,

    };
    res
    .status(200)
    .json({
        message: "POST request to /signup",
        createUser: res.body.email
    });
});

module.exports = router;