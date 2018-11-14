var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
// Method override provides access to PUT & DELETE Actions in Forms
// see: https://github.com/expressjs/method-override
var methodOverride = require('method-override');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');

var database = require('./database/database');

database();

var app = express();

// Set layout
app.set('layout', 'layout')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
var sess = {
	secret: 'myblog secreycay',
	cookie: {},
	saveUninitialized: false,
	resave: false
}

var currSess;
if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
// Access to Delete and Put Actions In forms
app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));
app.use('/', indexRouter);
app.use('/blog', postsRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// The following section handles errors 
	// if a Mongoose Validation Error is generated we want to 
	// reRender our view on the Server with the relevant validation messages to provide a 'good' UX

	res.locals.message = err.message
  currSess = req.session
	res.locals.email = currSess.email
	// Catches registration/sign up errors
	if (req.path === '/user/register' && req.method === "POST" && err.name === 'ValidationError') {
    res.locals.user = req.body
		res.locals.title = "Register"
		res.render('users/register')
	// Catches Login errors
	} else if (req.path === '/user/login') {
		res.locals.user = req.body
		res.locals.title = "Log In"
		res.render('users/login')
	// Catches post creation errors
	} else if (req.path === '/posts/' ||
		req.method === "POST" || req.method === "PUT" && err.name === 'ValidationError') {
		res.locals.post = req.body
		res.render('posts/new', {
			title: "New Blog Post"
		})
	} else {
		// Catches all other errors
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		// render the error page
		res.status(err.status || 500);
		res.render('error');
	}

});

module.exports = app;
