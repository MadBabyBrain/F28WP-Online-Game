const express = require('express');
const router = express.Router();
const resolve = require('path').resolve;
const usersController = require('../../controllers/users');
const SignController = require('../../controllers/signup');
const loginController = require('../../controllers/login');
const deleteController = require('../../controllers/deleteuser');

// router.get('/signup', (req, res, next) => {
//     res.sendFile(resolve('../public/html/index.html'));
//   });
// /App/public/html/index.html
// router.get('/', usersController.getAll);

// Will user endpoint need a post request ?
// router.post('/', (req, res, next) => {
//     res
//     .status(200)
//     .json({
//         message: "POST request to /users"
//     });
// });

//router.get('/:userId', usersController.getById);

//router.patch('/:userId', usersController.patchById);

// router.delete('/:userId', usersController.deleteById);

router.post('/signup', SignController.user_signup);

router.post('/login', loginController.user_login);

router.delete('/:id', deleteController.user_delete);

module.exports = router;