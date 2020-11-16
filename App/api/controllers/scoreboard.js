const express = require('express');

exports.getAll = (req, res, next) => {
    res
    .status(200)
    .json({
        message: "GET request to /score"
    });
};