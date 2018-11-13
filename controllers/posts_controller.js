const Post = require('../models/post');
//var title = "My Blog App";

// Displays a list of all blog posts
exports.index = function (req, res, next) {
    currSess = req.session
    Post.find().exec((err, posts) => {
        console.log(posts)
        res.locals.user = currSess.email
        res.locals.posts = posts
        res.locals.title = "Blog Posts"
        res.render('posts/index')
    });
};

// /blog/:slug
// req.params.slug
exports.show = function (req, res, next) {
    Post.find().exec((err, posts) => {
        let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
        res.render('posts/show', { title: posts['title'], post })
    });
};

exports.new = function(req, res, next) {
    res.locals.title = "New Blog Post"
    res.locals.post = {title: "", content: "", summary: ""}
    res.locals.message  = ""
	res.render('posts/new');
};

// exports.new = function (req, res, next) {
// 	console.log('here')
// 	res.render('posts/create', { title: "New Post", test: 'hello'});
// };

exports.create = function (req, res, next) {

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
    let formPost = req.body
    if (formPost.summary === undefined) {
        const postSummary = truncate(req.body.content, 20) + "...";
        formPost = Object.assign(formPost, {summary: postSummary});
    }
    const newPost = new Post(formPost);

    newPost.save().then(() => {
        res.redirect('/blog')
    }).catch(next)
};
