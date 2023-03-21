const express = require('express');
const { controllerBlogPost } = require('../controllers/index');
const { verifyToken } = require('../auth/authoFunctions');
const { blogPostValidator } = require('../middlewares/blogpostValidator');
// const validateHasId = require('../middlewares/idValidatior');
const validateAuthorization = require('../middlewares/authorizationValidator');

const router = express.Router();

router.get('/search',
verifyToken,
controllerBlogPost.searchBlogPost);

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

router.put(
  '/:id',
  verifyToken,
  validateAuthorization,
  controllerBlogPost.updateBlogPost,
);

// router.delete('/:id',
// verifyToken,
// // validateHasId,
// validateAuthorization,
// controllerBlogPost.deleteBlogPost);

module.exports = router;