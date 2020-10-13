const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res
    .status(200)
    .json({
        message: "GET request to /users"
    });
});

// Will user endpoint need a post request ?
// router.post('/', (req, res, next) => {
//     res
//     .status(200)
//     .json({
//         message: "POST request to /users"
//     });
// });

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "GET request to /users with id param",
        id: `${id}`
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "PATCH request to /users with id param",
        id: `${id}`
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "DELETE request to /users with id param",
        id: `${id}`
    });
});

module.exports = router;