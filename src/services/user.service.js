const { User } = require('../models/index');

const serviceUserLogin = async (email, password) => {
const findUser = await User.findOne({ where: { email, password } });
return findUser;
};

module.exports = {
  serviceUserLogin,
};
