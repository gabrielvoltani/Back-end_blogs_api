const { User } = require('../models/index');

const serviceUserLogin = async (email, password) => {
const findUser = await User.findOne({ where: { email, password } });
return findUser;
};

const addUser = async (email, password, displayName, image) => {
  const newUser = await User.create({ email, password, displayName, image });
  return newUser;
};

module.exports = {
  serviceUserLogin,
  addUser,
};
