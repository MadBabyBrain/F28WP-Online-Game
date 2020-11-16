const dotenv = require('dotenv').config();
const resolve = require('path').resolve

const userRoutes = require('./routes/user/users');
const scoreRoute = require('./routes/score/scoreboard');
const homeRoute = require('./routes/home/home');
const gameRoute = require('./routes/game/game');

const morgan = require('morgan');
const bodyparser = require('body-parser');

module.exports = (app) => {

    app.use(morgan('dev'));
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json());

    app.use('/users', userRoutes);
    app.use('/score', scoreRoute);
    app.use('/home', homeRoute);
    app.use('/game', gameRoute);

    app.get('/socket.io.js', (req, res, next) => {
        res.sendFile(resolve('./node_modules/socket.io/client-dist/socket.io.min.js'));
    });

    app.get('/socket.io.min.js.map', (req, res, next) => {
        res.sendFile(resolve('./node_modules/socket.io/client-dist/socket.io.min.js.map'));
    });

    app.get('/images/player_placeholder.png', (req, res, next) => {
        res.sendFile(resolve('../public/images/player_placeholder.png'));
    });

    app.get('/css/player.css', (req, res, next) => {
        res.sendFile(resolve('../public/css/player.css'));
    });

    app.get('/js/Game_Logic.js', (req, res, next) => {
        res.sendFile(resolve('../public/js/Game_Logic.js'));
    });
    app.get('/js/Player_Controller.js', (req, res, next) => {
        res.sendFile(resolve('../public/js/Player_Controller.js'));
    });


    app.use((req, res, next) => {
        const err = new Error("Not found :(");
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500); // 500 - all other kinds of errors
        res.json({
            error: {
                message: err.message
            }
        });
    });
}