const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const { User, Category, BlogPost, PostCategory } = require('../models');

const editPostValidate = require('../middlewares/editPostValidate');

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

const searchBlogPost = async (dataSearch) => {
  const post = await BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${dataSearch}%` } },
        { content: { [Op.like]: `%${dataSearch}%` } },
      ],
    },
    include: [
      { model: User, 
        as: 'user', 
        attributes: { exclude: ['password'] }, 
      },
      { model: Category,
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
      },
    ],
  });
  return { type: 200, message: post };
};

const updateBlogPost = async (newDataPost, id) => {
  const error = editPostValidate(newDataPost);
  if (error) return { type: error.type, message: error.message };

  await BlogPost.update(newDataPost, {
    where: { id },
  });

  const newPost = await getPostById(id);
  return { type: 200, message: newPost.dataValues };
};

const deleteBlogPost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { type: 204, message: '' };
};

module.exports = {
  createPost,
  getAllposts,
  getPostById,
  searchBlogPost,
  updateBlogPost,
  deleteBlogPost,
};