const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users');
const SignController = require('../../controllers/signup');
const loginController = require('../../controllers/login');
const deleteController = require('../../controllers/deleteuser');
const scoreboardController = require('../../controllers/scoreboard');

// Will user endpoint need a post request ?
// router.post('/', (req, res, next) => {
//     res
//     .status(200)
//     .json({
//         message: "POST request to /users"
//     });
// });

router.post('/signup', SignController.user_signup);

router.post('/login', loginController.user_login);

// router.post('/score', scoreboardController.insert_score_dev);

router.patch('/score', scoreboardController.update_score_id);

router.get('/score', scoreboardController.get_all);

router.get('/score/id/', scoreboardController.get_by_id);

router.get('/score/:token', scoreboardController.get_by_token);

router.get('/:userId', usersController.getById);

router.patch('/:userId', usersController.patchById);

// router.delete('/:userId', usersController.deleteById);

router.delete('/:id', deleteController.user_delete);

router.get('/', usersController.getAll);

module.exports = router;