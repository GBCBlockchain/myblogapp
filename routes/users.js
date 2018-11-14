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

// GET /user/logout/
// For this example can use get as all this needs to do is
// Destroy the session
// This is different from a restful resource where you would
// normally use router.delete
router.get('/logout', usersController.logout);

// Export routes
module.exports = router;
