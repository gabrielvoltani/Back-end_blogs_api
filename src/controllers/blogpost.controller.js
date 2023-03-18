const { serviceBlogPost } = require('../services/index');
// arrumar o import aqui, botar la no index

// const createPost = async (req, res) => {
// try {
//   const { emailUser } = req.data;
//   const { title, content, categoryIds } = req.body;
//   const { message } = await serviceBlogPost.createPost(emailUser, title, content, categoryIds);
//   return res.status(201).json(message);
// } catch (error) {
//   console.log(error.message);
//   return res.status(400).json({ message: 'one or more "categoryIds" not found' });
// }
// };

const getPosts = async (_req, res) => {
  try {
  const post = await serviceBlogPost.getAllposts();
    return res.status(200).json(post);
} catch (e) {
    console.log(e.message);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await serviceBlogPost.getPostById(id);
    if (!getPost) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(getPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Error banco');
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  // createPost,
};