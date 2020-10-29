const express = require('express');

exports.getAll = (req, res, next) => {
    res
    .status(200)
    .json({
        message: "GET request to /users"
    });
};

// Will user endpoint need a post request ?
// router.post('/', (req, res, next) => {
//     res
//     .status(200)
//     .json({
//         message: "POST request to /users"
//     });
// });

exports.getById = (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "GET request to /users with id param",
        id: `${id}`
    });
};

exports.patchById = (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "PATCH request to /users with id param",
        id: `${id}`
    });
};

exports.deleteById = (req, res, next) => {
    const id = req.params.userId;
    res
    .status(200)
    .json({
        message: "DELETE request to /users with id param",
        id: `${id}`
    });
};