const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const { User, Category, BlogPost, PostCategory } = require('../models');

const createPost = async (email, title, content, categoryIds) => {
  const t = await sequelize.transaction();
  const findUser = await User.findOne({ where: { email } });
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
    throw e;
  }
};

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

const getBlogPostBySearch = async (search) => {
  const post = await BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
    ],
  });
  return { type: 200, message: post };
};

module.exports = {
  createPost,
  getAllposts,
  getPostById,
  getBlogPostBySearch,
};