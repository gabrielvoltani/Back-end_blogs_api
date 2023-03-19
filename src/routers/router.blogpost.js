const express = require('express');
const { controllerBlogPost } = require('../controllers/index');
const { verifyToken } = require('../auth/authoFunctions');
const { blogPostValidator } = require('../middlewares/blogpostValidator');

const router = express.Router();

router.get('/',
verifyToken,
controllerBlogPost.getPosts);

router.get('/:id',
verifyToken,
controllerBlogPost.getSinglePost);

router.post('/',
verifyToken,
blogPostValidator,
controllerBlogPost.addPost);

module.exports = router;