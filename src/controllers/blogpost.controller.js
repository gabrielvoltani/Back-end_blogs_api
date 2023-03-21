const { serviceBlogPost } = require('../services/index');

const addPost = async (req, res) => {
try {
  const { email } = req.user;
  const { title, content, categoryIds } = req.body;
  const { message } = await serviceBlogPost.createPost(email, title, content, categoryIds);
  return res.status(201).json(message);
} catch (error) {
  return res.status(400).json({ message: 'one or more "categoryIds" not found' });
}
};

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
    return res.status(500).json('Error banco');
  }
};

const searchBlogPost = async (req, res) => {
  try {
    const { q: dataSearch } = req.query;
    const { type, message } = await serviceBlogPost.searchBlogPost(dataSearch);

    return res.status(type).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const newDataPost = req.body;
    console.log('Controller:', newDataPost);
    const { type, message } = await serviceBlogPost.updateBlogPost(newDataPost, id);

    return res.status(type).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await serviceBlogPost.deleteBlogPost(id);
    return res.status(type).json(message);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  addPost,
  searchBlogPost,
  updateBlogPost,
  deleteBlogPost,
};