var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.user = currSess.user
  res.render('index', {
    title: 'Blog Post App',
    app: {
      message: 'Welcome to my blog post app',
    }
  });
});

module.exports = router;
