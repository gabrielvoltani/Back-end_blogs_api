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

router.get('/:id',
verifyToken,
controllerUserLogin.controllerGetUserById);

module.exports = router;