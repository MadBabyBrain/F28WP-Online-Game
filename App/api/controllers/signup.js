const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Score = require("../models/scoreboard");

exports.user_signup = (req, res, next) => {
  User.find({ "email": req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: "Mail Exists"
        });
      } else {
        User.find({ "username": req.body.username })
          .exec()
          .then(username => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  username: req.body.username,
                  email: req.body.email,
                  password: hash
                });

                user
                  .save()
                  .then(result => {

                    const score = new Score({
                      _id: user._id,
                      score: 0
                    }).save();

                    console.log(result);
                    res.status(201).json({
                      message: "User created"
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              }
            });
          });
      }
    });
}