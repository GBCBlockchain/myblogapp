const User = require('../models/user');

exports.register = function(req, res, next) {
    res.locals.title = "Register"
    res.render('users/register')
};

exports.login = function(req, res, next) {
    res.locals.title = "Register"
    res.render('users/register')
};

exports.logout = function(req, res, next) {
    res.locals.title = "Register"
    res.render('users/register')
};