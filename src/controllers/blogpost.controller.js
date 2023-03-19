const { serviceBlogPost } = require('../services/index');

const addPost = async (req, res) => {
try {
  const { emailUser } = req.data;
  const { title, content, categoryIds } = req.body;
  const { message } = await serviceBlogPost.createPost(emailUser, title, content, categoryIds);
  return res.status(201).json(message);
} catch (error) {
  return res.status(400).json({ message: 'one or more "categoryIds" not found' });
}
};

// talvez era só arrumar o nome aqui

// const postsController = {
//   create: async (req, res) => {

//     const validateBody = validatePost(req.body);
//     if (validateBody.error) {
//       return res.status(validateBody.error.code).json(validateBody.error.message);
//     }
//     const { email } = validatedToken;
//     const result = await postsService.create(validateBody, email);
//     if (result.error) return res.status(result.error.code).json(result.error.message);
//     res.status(201).json(result);
//   },
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
  addPost,
};