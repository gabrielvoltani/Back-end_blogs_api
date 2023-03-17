const { User } = require('../models/index');

const serviceUserLogin = async (email, password) => {
const findUser = await User.findOne({ where: { email, password } });
return findUser;
};

const addUser = async (email, password, displayName, image) => {
  const newUser = await User.create({ email, password, displayName, image });
  return newUser;
};

const getUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

module.exports = {
  serviceUserLogin,
  addUser,
  getUsers,
  getUserById,
};
