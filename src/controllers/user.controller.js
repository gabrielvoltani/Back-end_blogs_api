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

try {
  const addingUser = await serviceUserLogin.addUser(email, password, displayName, image);
  const token = await creatToken(addingUser);
  return res.status(201).json({ token });
} catch (e) {
  return res.status(409).json({ message: 'User already registered' });
}
};

const controllerGetUsers = async (req, res) => {
  const allUsers = await serviceUserLogin.getUsers();
  res.status(200).json(allUsers);
};

const controllerGetUserById = async (req, res) => {
  const { id } = req.params;
  const user = await serviceUserLogin.getUserById(id);
  
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

    res.status(200).json(user);
};

module.exports = {
  controllerUserLogin,
  controllerAddUser,
  controllerGetUsers,
  controllerGetUserById,
};