const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const { User, Category, BlogPost, PostCategory } = require('../models');

const createPost = async (emailUser, title, content, categoryIds) => {
  const t = await sequelize.transaction();
  const findUser = await User.findOne({ where: { emailUser } });
  const userId = findUser.dataValues.id;

  try {
    const createBlogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postId = createBlogPost.dataValues.id;

    await Promise.all(categoryIds
      .map((x) => PostCategory.create({ postId, categoryId: x }, { transaction: t })));

    await t.commit();
    return { type: null, message: createBlogPost };
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e;
  }
};

// const createPost = {
//   create: async (body, email) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return { error: { code: 404, message: { message: 'User not found' } } };
//     const { title, content, categoryIds } = body;
//     const categories = await Category.findAll();
//     const validadCategories = categoryIds
//       .every((eId) => categories
//       .some((category) => eId === category.toJSON().id));
//     if (!validadCategories || categoryIds.length === 0) {
//       return { error: { 
//         code: 400, 
//         message: { message: 'one or more "categoryIds" not found' } } };
//     }
//     const post = await BlogPost.create({ title, content, userId: user.id });
//     const { id } = post.toJSON();
//     await PostCategory.bulkCreate(categoryIds.map((eId) => ({ postId: id, categoryId: eId })));
//     return post;
//   },
// };

const getAllposts = async () => {
  const users = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return users;
};

const getPostById = async (id) => {
  const getPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return getPost;
};

module.exports = {
  createPost,
  getAllposts,
  getPostById,
};