const { creatToken } = require('../auth/authoFunctions');
const { serviceUserLogin } = require('../services/index');

const controllerUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const getUser = await serviceUserLogin.serviceUserLogin(email, password);
  if (!getUser) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  const token = await creatToken(email);

  return res.status(200).json({ token });
};

const controllerAddUser = async (req, res) => {
  const { email, password, displayName, image } = req.body;
//   const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: '"email" must be a valid email' });
// }
// const addingUser = serviceUserLogin.addUser(email, password, displayName, image);
// if (addingUser.message !== 'users.email must be unique') {
//   const token = await creatToken(addingUser);
//   return res.status(201).json({ token });
// }
// return res.status(409).json({ message: 'User already registered' });

try {
  const addingUser = await serviceUserLogin.addUser(email, password, displayName, image);
  const token = await creatToken(addingUser);
  // console.log(addingUser);
  return res.status(201).json({ token });
} catch (e) {
  // console.log(e.message);
  return res.status(409).json({ message: 'User already registered' });
}
};

module.exports = {
  controllerUserLogin,
  controllerAddUser,
};