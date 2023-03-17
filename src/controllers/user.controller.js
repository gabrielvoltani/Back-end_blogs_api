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

module.exports = {
  controllerUserLogin,
};