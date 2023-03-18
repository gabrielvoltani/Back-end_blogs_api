const express = require('express');
const { controllerBlogPost } = require('../controllers/index');
const { verifyToken } = require('../auth/authoFunctions');
// const { blogPostValidator } = require('../middlewares/blogpostValidator');

const router = express.Router();

// router.post('/',
// verifyToken,
// blogPostValidator,
// controllerBlogPost.createPost);

router.get('/',
verifyToken,
// blogPostValidator,
controllerBlogPost.getPosts);

module.exports = router;