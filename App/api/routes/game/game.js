const express = require('express');
const router = express.Router();
const resolve = require('path').resolve

router.get('/', (req, res, next) => {
    res.sendFile(resolve('./App/public/html/lobbyroom.html'));
});



module.exports = router;