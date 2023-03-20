const express = require('express');
const { controllerBlogPost } = require('../controllers/index');
const { verifyToken } = require('../auth/authoFunctions');
const { blogPostValidator } = require('../middlewares/blogpostValidator');

const router = express.Router();

router.get('/',
verifyToken,
controllerBlogPost.getPosts);

router.post('/',
verifyToken,
blogPostValidator,
controllerBlogPost.addPost);

router.get('/:id',
verifyToken,
controllerBlogPost.getSinglePost);

router.get('/search',
verifyToken,
controllerBlogPost.getBlogPostBySearching);

module.exports = router;