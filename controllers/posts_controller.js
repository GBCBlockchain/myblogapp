const Post = require('../models/post');
//var title = "My Blog App";

// Displays a list of all blog posts
exports.index = function (req, res, next) {
	// In each route where a view is rendered check whether there is a session
	// if there is get the session email to make it available for
	// the nabar.ejs render
	currSess = req.session
	Post.find().exec((err, posts) => {
		console.log(posts)
		res.locals.email = currSess.email
		res.locals.posts = posts
		res.locals.title = "Blog Posts"
		res.render('posts/index')
	});
};

// /blog/:slug
// req.params.slug
exports.show = function (req, res, next) {
	// In each route where a view is rendered check whether there is a session
	// if there is get the session email to make it available for
	// the nabar.ejs render
	currSess = req.session
	res.locals.email = currSess.email
	Post.find().exec((err, posts) => {
		let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
		res.render('posts/show', {
			title: posts['title'],
			post
		})
	});
};

// New Action loads a new form for creating a blog
exports.new = function (req, res, next) {
	// This if statement ensures only logged in users have access
	// by redirecting if a session is not set
	if (!req.session.userId) return res.redirect('/blog');
	currSess = req.session;
	res.locals.email = currSess.email;
	res.locals.title = "New Blog Post";
	res.locals.post = {
		title: "",
		content: "",
		summary: ""
	};
	res.locals.message = "";
	res.render('posts/new');
};

// New Action loads a new form for creating a blog
exports.edit = function (req, res, next) {
	// This if statement ensures only logged in users have access
	// by redirecting if a session is not set
	if (!req.session.userId) return res.redirect('/blog');
	currSess = req.session
	Post.findOne({
		slug: req.params.slug
	}).exec((err, post) => {
		console.log(post);
		res.locals.email = currSess.email;
		// locals.edit used in ejs to provide update action
		res.locals.edit = true;
		res.locals.post = post;
		res.locals.title = "Edit Blog Post";
		res.locals.message = "";
		res.render('posts/new');
	});
};

exports.create = function (req, res, next) {
	// This if statement ensures only logged in users have access
	// by redirecting if a session is not set
	if (!req.session.userId) return res.redirect('/blog');

	// BELOW WAS USED TO GENERATE A SLUG 
	// REMOVED AS USING THE NPM MODULE mongoose-slug-generator
	// const formPost = req.body;
	// const postSlug = formPost.title.replace(/\s/g,"-").toLowerCase();
	// formPost['slug'] = postSlug.toLowerCase()

	// this mongoose-slug-generator is a better solution as it ensures uniqueness
	// https://www.npmjs.com/package/mongoose-slug-generator to generate a unique
	// slug - see models/posts.js

	function truncate(str, no_words) {
		return str.split(" ").splice(0, no_words).join(" ");
	}
	let formPost = req.body;
	if (formPost.summary === undefined) {
		const postSummary = truncate(req.body.content, 20) + "...";
		formPost = Object.assign(formPost, {
			summary: postSummary
		});
	}
	const newPost = new Post(formPost);

	newPost.save().then(() => {
		res.redirect('/blog');
	}).catch(next)
};

exports.update = function (req, res, next) {
	// This if statement ensures only logged in users have access
	// by redirecting if a session is not set
	if (!req.session.userId) return res.redirect('/blog');
    Post.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}, function(err, post) {
        if (err) return next(err);
        console.log("Post Updated \n", post);
        res.redirect(`/blog/${post.slug}`);
    })
};

exports.delete = function (req, res, next) {
	// This if statement ensures only logged in users have access
	// by redirecting if a session is not set
	if (!req.session.userId) return res.redirect('/blog');
	Post.findOneAndRemove({
		slug: req.params.slug
	}, function (err, post) {
		if (err) return next(err);
		console.log("Post Deleted \n", post);
		res.redirect(`/blog`);
	})
};
