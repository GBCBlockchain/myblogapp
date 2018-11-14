var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

// GET /blog/new
router.get('/new', postsController.new);

// GET all posts listings.
// GET /blog/
router.get('/', postsController.index);

// Get an Individual post listing

// GET /blog/:slug
router.get('/:slug', postsController.show);

// Create posts
// POST /blog
router.post('/', postsController.create);
// TODO: Add Edit and Delete Requests

// Edit Route
router.get('/edit/:slug', postsController.edit)

// Update Action
router.put('/edit/:slug', postsController.update)

// // Delete Action
router.delete('/delete/:slug', postsController.delete)

// Export routes
module.exports = router;
