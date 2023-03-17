const { Category } = require('../models');

const addCategory = async (name) => {
  const addCat = await Category.create({ name });
  return addCat;
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return getAll;
};

module.exports = {
  addCategory,
  getAllCategories,
};