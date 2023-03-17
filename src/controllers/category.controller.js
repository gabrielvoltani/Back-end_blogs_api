const { serviceCategory } = require('../services/index');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const addCat = await serviceCategory.addCategory(name);
  return res.status(201).json(addCat);
};

module.exports = {
  addCategory,
};