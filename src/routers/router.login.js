const express = require('express');
const { controllerUserLogin } = require('../controllers/index');
const { loginValidation } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/',
loginValidation,
controllerUserLogin.controllerUserLogin);

module.exports = router;