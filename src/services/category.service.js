const { Category } = require('../models');

const addCategory = async (name) => {
  const addCat = await Category.create({ name });
  return addCat;
};

module.exports = {
  addCategory,
};