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
  // const post = await loginService.getPostAll();
  // console.log(post);
  // return res.status(200).json(post);
  try {
  const post = await serviceBlogPost.getAllposts();
    return res.status(200).json(post);
} catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getPosts,
  // createPost,
};