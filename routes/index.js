var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  currSess = req.session
  res.locals.email = currSess.email
  res.render('index', {
    title: 'Blog Post App',
    user: null,
    app: {
      message: 'Welcome to my blog post app',
    }
  });
});

module.exports = router;
