const User = require('../models/user');

exports.register = function(req, res, next ) {
    res.locals.message = ""
    res.locals.user = {
    	username: "",
    	email: "",
        password: "",
        confirmPassword: ""
    }
    res.locals.title = "Register"
    res.render('users/register')
};

exports.signup = function (req, res, next) {
    const newUser = new User(req.body)
    newUser.save().then((data) => {
        console.log(data)
        res.redirect('/blog')
    }).catch(next)
};

exports.newSession = function (req, res, next) {
    User.authenticate(req.body.email,req.body.password,function (error, user){
        if (error || !user) {
            let err = new Error("Email or Password is Wrong");
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id
            req.session.email = user.email
            console.log('Set Session', req.session.userId)
            return res.redirect('/blog')
        }
    })
};

exports.login = function(req, res, next) {
    res.locals.message = ""
    res.locals.title = "Log In"
    res.render('users/login')
};

exports.logout = function(req, res, next) {
    res.locals.title = "Register"
    res.render('users/register')
};