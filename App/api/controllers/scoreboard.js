const dotenv = require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Score = require("../models/scoreboard");
const User = require("../models/user");


exports.get_all = (req, res, next) => {
    let all = {};

    Score.find({}, (err, result) => {
        if (err) {
            return res.status(404).json({ error: err });
        }
        all["scores"] = result;

        User.find({}, (e, resu) => {
            if (e) {
                return res.status(404).json({ error: e });
            }

            all["users"] = resu;

            return res.status(200).json(all);
        })
    })
};

exports.get_by_id = (req, res, next) => {
    Score.findById(req.body.id, (error, score) => {
        if (error) {
            return res.status(500).json({
                error: error
            });
        }

        return res.status(200).json(score);
    });
}

exports.get_by_token = (req, res, next) => {
    jwt.verify(req.param.token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "Invalid token"
            });
        }

        Score.findById(decode.userId, (error, score) => {
            if (error) {
                return res.status(500).json({
                    error: error
                });
            }

            return res.status(200).json(score);
        });
    });
}

exports.insert_score_dev = (req, res, next) => {
    Score.findById(req.body.id, (err, user) => {
        if (err) {
            const score = new Score({
                _id: req.body.id,
                score: req.body.score
            });

            score.save();
            res.status(200).json({ message: "oh baby, new score" });
        }

        Score.updateOne({ _id: user._id }, { score: req.body.score })
            .exec()
            .then(result => {
                return res.status(200).json({
                    message: "score updated"
                });
            })
            .catch(e => {
                console.log(e);
                return res.status(500).json({
                    message: e
                });
            });
    })
}

exports.update_score_id = (req, res, next) => {
    jwt.verify(req.body.token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "Invalid token"
            });
        }


        const result = Score.updateOne({ _id: decode.userId }, { score: req.body.score });

        console.log(result);

        return res.status(200).json({
            done: result
        });
    });
}
