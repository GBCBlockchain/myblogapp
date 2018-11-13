const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

// GET /user/register/
router.get('/register', usersController.register);

router.post('/register', usersController.signup)

// GET /user/login/
router.get('/login', usersController.login);

// POST /user/login
router.post('/login', usersController.newSession)

// POST /user/logout/
router.post('/logout', usersController.logout);

// Export routes
module.exports = router;
