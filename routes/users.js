var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');

// GET /user/register/
router.get('/register', usersController.register);

// GET /user/login/
router.get('/login', usersController.login);

// POST /user/logout/
router.post('/logout', usersController.logout);

// Export routes
module.exports = router;
