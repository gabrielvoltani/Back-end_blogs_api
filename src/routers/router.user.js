const express = require('express');
const { controllerUserLogin } = require('../controllers/index');
const { verifyToken } = require('../auth/authoFunctions');
const { displayNameValidator,
  passwordValidator,
  emailValidator,
} = require('../middlewares/newUserValidation');

const router = express.Router();

router.post('/',
displayNameValidator,
passwordValidator,
emailValidator,
controllerUserLogin.controllerAddUser);

router.get('/',
verifyToken,
controllerUserLogin.controllerGetUsers);

module.exports = router;