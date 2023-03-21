const { serviceBlogPost } = require('../services');

module.exports = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: authorPost } = req.user;

  const post = await serviceBlogPost.getPostById(postId);
  const userLogged = post.userId;

  if (Number(authorPost) !== Number(userLogged)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};