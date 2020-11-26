const resolve = require('path').resolve;

const userRoutes = require('./routes/user/users');
//const scoreRoute = require('./routes/score/scoreboard');
const homeRoute = require('./routes/home/home');
const gameRoute = require('./routes/game/game');

//const morgan = require('morgan'); // logs incoming HTTP requests
const bodyparser = require('body-parser');
module.exports = (app) => {

    //app.use(morgan('dev'));   // logs incoming HTTP requests
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json());

    app.use('/users', userRoutes);
    //app.use('/score', scoreRoute);
    app.use('/home', homeRoute);
    app.use('/game', gameRoute);

    app.get('/', (req, res, next) => {
        res.sendFile(resolve('./app/public/html/index.html'));
    })

    app.get('/favicon.ico', (req, res, next) => {
        res.sendFile(resolve('./App/public/images/player_placeholder.png'));
    });

    app.get('/gameroom', (req, res, next) => {
        res.sendFile(resolve('./App/public/html/gamepage.html'));
    });

    app.get('/html/:id', (req, res, next) => {
        res.sendFile(resolve(`./app/public/html/${req.params.id}`));
    });

    app.get("/images/:id", (req, res, next) => {
        res.sendFile(resolve(`./app/public/images/${req.params.id}`))
    });

    app.get("/js/select_character.js", (req, res, next) => {
        res.sendFile(resolve('./app/public/js/select_character.js'))
    });

    app.get('/css/:id', (req, res, next) => {
        res.sendFile(resolve(`./App/public/css/${req.params.id}`));
    });

    app.get('/js/:id', (req, res, next) => {
        res.sendFile(resolve(`./App/public/js/${req.params.id}`));
    });

    app.get('/images/Wood_Texture_Pack/:id', (req, res, next) => {
        res.sendFile(resolve(`./app/public/images/Wood_Texture_Pack/${req.params.id}`))
    });

    app.get('/socket.io.js', (req, res, next) => {
        res.sendFile(resolve('./App/api/node_modules/socket.io/client-dist/socket.io.min.js'));
    });

    app.get('/socket.io.min.js.map', (req, res, next) => {
        res.sendFile(resolve('./App/api/node_modules/socket.io/client-dist/socket.io.min.js.map'));
    });

    app.get('/images/unidentified.png', (req, res, next) => {
        res.sendFile(resolve('./App/public/images/player_placeholder.png'));
    });

    // app.get('/users/signup', (req, res, next) => {
    //     res.sendFile(resolve('./App/public/html/signup.html'));
    // });

    // app.get('/js/Game_Logic.js', (req, res, next) => {
    //     res.sendFile(resolve('./App/public/js/Game_Logic.js'));
    // });

    // app.get('/js/Player_Controller.js', (req, res, next) => {
    //     res.sendFile(resolve('./App/public/js/Player_Controller.js'));
    // });

    // app.get('/js/signup.js', (req, res, next) => {
    //     res.sendFile(resolve('./App/public/js/signup.js'));
    // });

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
}