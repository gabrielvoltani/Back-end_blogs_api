const { serviceCategory } = require('../services/index');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const addCat = await serviceCategory.addCategory(name);
  return res.status(201).json(addCat);
};

const getAllCats = async (req, res) => {
  const allCats = await serviceCategory.getAllCategories();
  return res.status(200).json(allCats);
};

module.exports = {
  addCategory,
  getAllCats,
};