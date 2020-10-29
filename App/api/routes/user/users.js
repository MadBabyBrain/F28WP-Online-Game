const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users');

router.get('/', usersController.getAll);

// Will user endpoint need a post request ?
// router.post('/', (req, res, next) => {
//     res
//     .status(200)
//     .json({
//         message: "POST request to /users"
//     });
// });

router.get('/:userId', usersController.getById);

router.patch('/:userId', usersController.patchById);

router.delete('/:userId', usersController.deleteById);

module.exports = router;